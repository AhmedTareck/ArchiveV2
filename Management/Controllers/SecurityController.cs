using Common;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Vue.Models;
using static Web.Services.Helper;

namespace Vue.Controllers
{
    [Produces("application/json")]
    [Route("Security")]
    public class SecurityController : Controller
    {
        private readonly ArchiveV2Context db;
        private IConfiguration _configuration;
        public Validation valid;
        public SecurityController(ArchiveV2Context context, IConfiguration configuration)
        {
            _configuration = configuration;
            valid = new Validation();
            this.db = context;
        }


        [AllowAnonymous]
        [HttpGet("IsLoggedin")]
        public async Task<IActionResult> IsLogin(string returnUrl = null)
        {
            bool isAuthenticated = User.Identity.IsAuthenticated;
            if (isAuthenticated)
            {
                return Ok(true);
            }
            else
            {
                await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                return Ok(false);
            }
        }

        public class BodyObject
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        [HttpPost("loginUser")]
        [AllowAnonymous]
        public async Task<IActionResult> loginUser([FromBody] BodyObject bodyObject)
        {
            try
            {
                if (bodyObject == null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.EmptyBodyObject);

                if (string.IsNullOrWhiteSpace(bodyObject.Email))
                    return StatusCode(BackMessages.StatusCode, BackMessages.EnterUserNameOrloginName);

                if (string.IsNullOrWhiteSpace(bodyObject.Password))
                    return StatusCode(BackMessages.StatusCode, BackMessages.EnterPassword);

                var Info = db.Users
                    .Where(x => (x.Email == bodyObject.Email || x.LoginName == bodyObject.Email) && x.Status != 9).SingleOrDefault();


                if (Info == null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.RongCradentail);

                if (Info.UserType != 1 && Info.UserType != 2 && Info.UserType != 3)
                    return StatusCode(BackMessages.StatusCode, BackMessages.Permissions);

                if (Info.Status == 0)
                    return StatusCode(BackMessages.StatusCode, BackMessages.NotActive);

                if (Info.Status == 2)
                {
                    if (Info.LoginTryAttemptDate != null)
                    {
                        DateTime dt = Info.LoginTryAttemptDate.Value;
                        double minuts = 30;
                        dt = dt.AddMinutes(minuts);
                        if (dt >= DateTime.Now)
                        {
                            return StatusCode(BackMessages.StatusCode, BackMessages.Stopped);
                        }
                        else
                        {
                            Info.Status = 1;

                            db.SaveChanges();
                        }
                    }
                    else { return StatusCode(BackMessages.StatusCode, BackMessages.Stopped); }
                }

                if (!Security.VerifyHash(bodyObject.Password, Info.Password, HashAlgorithms.SHA512))
                {

                    Info.LoginTryAttempts++;
                    if (Info.LoginTryAttempts >= 5 && Info.Status == 1)
                    {
                        Info.LoginTryAttemptDate = DateTime.Now;
                        Info.Status = 2;
                    }
                    db.SaveChanges();
                    return StatusCode(BackMessages.StatusCode, BackMessages.RongCradentail);
                }

                Info.LoginTryAttempts = 0;
                Info.LastLoginOn = DateTime.Now;

                db.SaveChanges();

                var userInfo = new
                {
                    id = Info.Id,
                    HospitalId=Info.HospitalId,
                    //HospitalName=Info.Hospital.Name,
                    name = Info.Name,
                    userType = Info.UserType,
                    LoginName = Info.LoginName,
                    Email = Info.Email,
                    Status = Info.Status,
                    Phone = Info.Phone,
                };

                const string Issuer = "http://www.hnec.ly";
                var claims = new List<Claim>();
                claims.Add(new Claim("http://schemas.xmlsoap.org/ws/2022/10/identity/claims/Id", Info.Id.ToString(), ClaimValueTypes.Integer64, Issuer));

                claims.Add(new Claim("http://schemas.xmlsoap.org/ws/2022/10/identity/claims/userType", Info.UserType.ToString(), ClaimValueTypes.Integer32, Issuer));
                var userIdentity = new ClaimsIdentity("thisisasecreteforauth");
                userIdentity.AddClaims(claims);
                var userPrincipal = new ClaimsPrincipal(userIdentity);


                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    userPrincipal,
                    new AuthenticationProperties
                    {
                        ExpiresUtc = DateTime.UtcNow.AddHours(10),
                        IsPersistent = true,
                        AllowRefresh = true
                    });

                return Ok(userInfo);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                foreach (var cookie in Request.Cookies.Keys)
                {
                    Response.Cookies.Delete(cookie);
                }

                await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "error while logout");
            }
        }
    }
}
