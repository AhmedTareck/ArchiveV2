using Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using Vue.Models;
using Web.Services;
using static Web.Services.Helper;

namespace Management.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {
        private Helper help;

        private readonly ArchiveV2Context db;

        public UserController(ArchiveV2Context context)
        {
            this.db = context;
            help = new Helper();
        }

        public partial class BodyObject
        {
            public long? Id { get; set; }
            public string Name { get; set; }
            public string LoginName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public long? BranchId { get; set; }
            public string Photo { get; set; }
            public string Phone { get; set; }
            public short UserType { get; set; }
            public short Status { get; set; }
        }


        [HttpGet("Get")]
        public IActionResult Get(int pageNo, int pageSize,int UserType)
        {
            try
            {
                var userId = this.help.GetCurrentUser(HttpContext);
                if (userId <= 0)
                    return StatusCode(BackMessages.StatusCode, BackMessages.NotAuthorized);

                if(UserType>0)
                {
                    int Count = db.Users.Where(x => x.Status != 9 && x.UserType==UserType).Count();
                    var Info = db.Users.Where(x => x.Status != 9 && x.UserType == UserType).Select(x => new
                    {
                        x.Id,
                        x.Name,
                        x.LoginName,
                        x.Phone,
                        x.UserType,
                        x.HospitalId,
                        //BranchName = db.Hospitals.Where(y => y.Id == x.HospitalId).SingleOrDefault().Name,
                        //MunicipalitieId = db.Hospitals.Where(k => k.Id == x.HospitalId).SingleOrDefault().MunicipalitieId,
                        x.Status,
                        x.Email,
                        x.CreatedOn,
                        CreatedBy = db.Users.Where(k => k.Id == x.CreatedBy).SingleOrDefault().Name,
                    }).OrderByDescending(x => x.CreatedOn).Skip((pageNo - 1) * pageSize).Take(pageSize).ToList();


                    return Ok(new { info = Info, count = Count });
                }
                else
                {
                    int Count = db.Users.Where(x => x.Status != 9).Count();
                    var Info = db.Users.Where(x => x.Status != 9).Select(x => new
                    {
                        x.Id,
                        x.Name,
                        x.LoginName,
                        x.Phone,
                        x.UserType,
                        x.HospitalId,
                        //BranchName = db.Hospitals.Where(y => y.Id == x.HospitalId).SingleOrDefault().Name,
                        //MunicipalitieId = db.Hospitals.Where(k => k.Id == x.HospitalId).SingleOrDefault().MunicipalitieId,
                        x.Status,
                        x.Email,
                        x.CreatedOn,
                        CreatedBy = db.Users.Where(k => k.Id == x.CreatedBy).SingleOrDefault().Name,
                    }).OrderByDescending(x => x.CreatedOn).Skip((pageNo - 1) * pageSize).Take(pageSize).ToList();


                    return Ok(new { info = Info, count = Count });
                }

                
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            try
            {
                var userId = this.help.GetCurrentUser(HttpContext);
                if (userId <= 0)
                    return StatusCode(BackMessages.StatusCode, BackMessages.NotAuthorized);

                int Count = db.Users.Where(x => x.Status != 9).Count();
                var Info = db.Users.Where(x => x.Status != 9).Select(x => new
                {
                    x.Id,
                    x.Name,
                    x.LoginName,
                    x.UserType,
                    x.Phone,
                    x.HospitalId,
                    //Branch = x.Hospital.Name,
                    x.Email,
                    x.Status,
                    x.CreatedOn,
                    CreatedBy = db.Users.Where(k => k.Id == x.CreatedBy).SingleOrDefault().Name,

                }).OrderByDescending(x=>x.Name).ToList();

                return Ok(new { info = Info, count = Count });
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost("{Id}/Delete")]
        public IActionResult Delete(long id)
        {
            try
            {
                if (id <= 0)
                    return StatusCode(BackMessages.StatusCode, BackMessages.EmptyBodyObject);

                var userId = this.help.GetCurrentUser(HttpContext);
                if (userId <= 0)
                    return StatusCode(BackMessages.StatusCode, BackMessages.NotAuthorized);


                var Info = db.Users.Where(x => x.Id == id && x.Status != 9).SingleOrDefault();

                if (Info == null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.NotFound);

                Info.Status = 9;
                db.SaveChanges();
                return Ok(BackMessages.SucessDeleteOperations);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost("{Id}/Active")]
        public IActionResult Activate(long id)
        {
            try
            {
                if (id <= 0)
                    return StatusCode(BackMessages.StatusCode, BackMessages.EmptyBodyObject);

                var userId = this.help.GetCurrentUser(HttpContext);
                if (userId <= 0)
                    return StatusCode(BackMessages.StatusCode, BackMessages.NotAuthorized);

                var Info = db.Users.Where(x => x.Id == id && x.Status != 9).SingleOrDefault();
                if (Info == null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.NotFound);

                Info.Status = 1;
                db.SaveChanges();
                return Ok(BackMessages.SucessActiveOperations);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost("{Id}/Deactivate")]
        public IActionResult Deactivate(long id)
        {
            try
            {
                if (id <= 0)
                    return StatusCode(BackMessages.StatusCode, BackMessages.EmptyBodyObject);

                var userId = this.help.GetCurrentUser(HttpContext);
                if (userId <= 0)
                    return StatusCode(BackMessages.StatusCode, BackMessages.NotAuthorized);

                var Info = db.Users.Where(x => x.Id == id && x.Status != 9).SingleOrDefault();

                if (Info == null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.NotFound);

                Info.Status = 2;
                db.SaveChanges();
                return Ok(BackMessages.SucessBlockOperations);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost("Add")]
        public IActionResult Add([FromBody] BodyObject bodyObject)
        {
            try
            {
                if (bodyObject == null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.EmptyBodyObject);

                var userId = this.help.GetCurrentUser(HttpContext);
                if (userId <= 0)
                    return StatusCode(BackMessages.StatusCode, BackMessages.NotAuthorized);

                if (string.IsNullOrWhiteSpace(bodyObject.LoginName))
                    return StatusCode(BackMessages.StatusCode, BackMessages.NameEmpty);

                if (string.IsNullOrWhiteSpace(bodyObject.Phone))
                    return StatusCode(BackMessages.StatusCode, BackMessages.PhoneEmpty);

                if (string.IsNullOrWhiteSpace(bodyObject.Email))
                    return StatusCode(BackMessages.StatusCode, BackMessages.EmailEmpty);

                if (!this.help.IsValidEmail(bodyObject.Email))
                    return StatusCode(BackMessages.StatusCode, BackMessages.EmailNotValid);

                var isExist = db.Users.Where(x => x.LoginName == bodyObject.LoginName && x.Status != 9).SingleOrDefault();
                if (isExist != null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.LoginNameExist);

                isExist = db.Users.Where(x => x.Phone == bodyObject.Phone && x.Status != 9).SingleOrDefault();
                if (isExist != null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.PhoneExist);

                isExist = db.Users.Where(x => x.Email == bodyObject.Email && x.Status != 9).SingleOrDefault();
                if (isExist != null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.EmailExist);

                Users row = new Users();
                if (bodyObject.UserType == 2)
                    row.HospitalId = bodyObject.BranchId;
                row.Phone = bodyObject.Phone;
                row.LoginName = bodyObject.LoginName;
                row.Name = bodyObject.Name;
                row.Email = bodyObject.Email;
                row.UserType = bodyObject.UserType;
                row.LoginTryAttempts = 0;
                row.Image = Convert.FromBase64String(this.help.GetDefaultImage());
                row.Password = Security.ComputeHash(bodyObject.Password, HashAlgorithms.SHA512, null);
                row.CreatedOn = DateTime.Now;
                row.CreatedBy = userId;
                row.Status = bodyObject.Status;
                db.Users.Add(row);
                db.SaveChanges();
                return Ok(BackMessages.SucessAddOperations);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost("UploadImage")]
        public IActionResult UploadImage([FromBody] BodyObject bodyObject)
        {
            try
            {
                if (bodyObject == null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.EmptyBodyObject);

                var userId = this.help.GetCurrentUser(HttpContext);
                if (userId <= 0)
                    return StatusCode(BackMessages.StatusCode, BackMessages.NotAuthorized);

                var Info = db.Users.Where(x => x.Id == bodyObject.Id && (x.Status == 1 || x.Status == 2)).SingleOrDefault();
                if (Info == null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.NotFound);

                Info.Image = Convert.FromBase64String(bodyObject.Photo.Substring(bodyObject.Photo.IndexOf(",") + 1));
                Info.ModifiedBy = userId;
                Info.ModifiedOn = DateTime.Now;
                db.SaveChanges();

                return Ok(BackMessages.SucessEditOperations);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }

        }

        [HttpPost("Edit")]
        public IActionResult EditUser([FromBody] BodyObject bodyObject)
        {
            try
            {
                if (bodyObject == null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.EmptyBodyObject);

                var userId = this.help.GetCurrentUser(HttpContext);
                if (userId <= 0)
                    return StatusCode(BackMessages.StatusCode, BackMessages.NotAuthorized);

                if (string.IsNullOrWhiteSpace(bodyObject.LoginName))
                    return StatusCode(BackMessages.StatusCode, BackMessages.NameEmpty);

                if (string.IsNullOrWhiteSpace(bodyObject.Phone))
                    return StatusCode(BackMessages.StatusCode, BackMessages.PhoneEmpty);

                var row = db.Users.Where(x => x.Id == bodyObject.Id && (x.Status == 1 || x.Status == 2)).SingleOrDefault();
                if (row == null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.NotFound);

                var isExist = db.Users.Where(x => x.Phone == bodyObject.Phone && x.Status != 9 && x.Id != bodyObject.Id).SingleOrDefault();
                if (isExist != null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.PhoneExist);

                //isExist = db.Users.Where(x => x.Email == bodyObject.Email && x.Status != 9 && x.Id != bodyObject.Id).SingleOrDefault();
                //if (isExist != null)
                //    return StatusCode(BackMessages.StatusCode, BackMessages.EmailExist);

                row.UserType = bodyObject.UserType;
                if (bodyObject.UserType == 2)
                    row.HospitalId = bodyObject.BranchId;
                row.LoginName = bodyObject.LoginName;
                row.Name = bodyObject.Name;
                row.Phone = bodyObject.Phone;
                //row.Email = bodyObject.Email;
                row.ModifiedBy = userId;
                row.ModifiedOn = DateTime.Now;
                db.SaveChanges();

                return Ok(BackMessages.SucessEditOperations);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost("EditProfile")]
        public IActionResult EditUsersProfile([FromBody] BodyObject bodyObject)
        {
            try
            {
                if (bodyObject == null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.EmptyBodyObject);

                var userId = this.help.GetCurrentUser(HttpContext);
                if (userId <= 0)
                    return StatusCode(BackMessages.StatusCode, BackMessages.NotAuthorized);

                var Users = db.Users.Where(x => x.Id == userId && x.Status != 9).SingleOrDefault();

                if (Users == null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.NotFound);

                var IsExist = db.Users.Where(x => x.Phone == bodyObject.Phone && x.Status != 9 && x.Id != userId).SingleOrDefault();
                if (IsExist != null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.PhoneExist);

                IsExist = db.Users.Where(x => x.Email == bodyObject.Email && x.Status != 9 && x.Id != userId).SingleOrDefault();
                if (IsExist != null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.EmailExist);


                Users.Email = bodyObject.Email;
                Users.Name = bodyObject.Name;
                Users.LoginName = bodyObject.LoginName;
                Users.Phone = bodyObject.Phone;
                Users.ModifiedBy = userId;
                Users.ModifiedOn = DateTime.Now;

                db.SaveChanges();
                return Ok(BackMessages.SucessEditOperations);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet("{Id}/Image")]
        public IActionResult GetUserImage(long Id)
        {
            try
            {
                if (Id <= 0)
                    return StatusCode(BackMessages.StatusCode, BackMessages.EmptyBodyObject);

                var userId = this.help.GetCurrentUser(HttpContext);
                if (userId <= 0)
                    return StatusCode(BackMessages.StatusCode, BackMessages.NotAuthorized);

                var UserImage = db.Users.Where(x => x.Id == Id && x.Status != 9).SingleOrDefault().Image;

                if (UserImage == null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.NotFound);

                return File(UserImage, "image/jpeg");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        public class UserInfo
        {
            public string Password { set; get; }
            public string NewPassword { set; get; }
        }

        [HttpPost("ChangePassword")]
        public IActionResult ChangePassword([FromBody] UserInfo bodyObject)
        {
            try
            {
                if (bodyObject == null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.EmptyBodyObject);

                var userId = this.help.GetCurrentUser(HttpContext);
                if (userId <= 0)
                    return StatusCode(BackMessages.StatusCode, BackMessages.NotAuthorized);

                var user = db.Users.Where(x => x.Id == userId).SingleOrDefault();

                if (user == null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.NotFound);

                if (bodyObject.Password == null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.EnterCurrentPass);

                var areMatched = Security.VerifyHash(bodyObject.Password, user.Password, HashAlgorithms.SHA512);

                if (!areMatched)
                    return StatusCode(BackMessages.StatusCode, BackMessages.PassNotMatched);

                if (bodyObject.Password == null)
                    return StatusCode(BackMessages.StatusCode, BackMessages.EnterPassword);

                if (bodyObject.Password.Length < 4)
                    return StatusCode(BackMessages.StatusCode, BackMessages.PasswordLenght);


                user.Password = Security.ComputeHash(bodyObject.NewPassword, HashAlgorithms.SHA512, null);

                db.Users.Update(user);
                db.SaveChanges();

                return Ok(BackMessages.SucessEditOperations);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }



    }
}