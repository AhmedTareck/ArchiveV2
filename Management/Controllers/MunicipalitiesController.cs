//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.Linq;
//using Vue.Models;
//using Web.Services;
//using static Web.Services.Helper;

//namespace Management.Controllers
//{
//    [Produces("application/json")]
//    [Route("api/admin/Municipalities")]
//    public class MunicipalitiesController : Controller
//    {
//        private Helper help;

//        private readonly DiseasesMonitoringContext db;

//        public MunicipalitiesController(DiseasesMonitoringContext context)
//        {
//            this.db = context;
//            help = new Helper();
//        }

//        [HttpGet("GetAll")]
//        public IActionResult GetAllHospitalsNames()
//        {
//            try
//            {
//                var userId = this.help.GetCurrentUser(HttpContext);
//                if (userId <= 0)
//                    return StatusCode(BackMessages.StatusCode, BackMessages.NotAuthorized);


//                var Info = db.Municipalities.Where(x => x.Status != 9).Select(x => new
//                {
//                    x.Id,
//                    x.Name,
//                }).OrderBy(x => x.Name).ToList();

//                return Ok(new { info = Info });

//            }
//            catch (Exception e)
//            {
//                return StatusCode(500, e.Message);
//            }
//        }

//        [HttpGet("Get")]
//        public IActionResult Get(int pageNo, int pageSize)
//        {
//            try
//            {
//                var userId = this.help.GetCurrentUser(HttpContext);
//                if (userId <= 0)
//                    return StatusCode(BackMessages.StatusCode, BackMessages.NotAuthorized);


//                int Count = db.Municipalities.Where(x => x.Status != 9).Count();
//                var Info = db.Municipalities.Where(x => x.Status != 9).Select(x => new
//                {
//                    x.Id,
//                    x.Name,
//                    EngilshName=x.EnglishName,
//                    HospitalCount=x.Hospitals.Where(k=>k.Status!=9).Count(),
//                    x.CreatedOn,
//                    x.Status,
//                }).OrderByDescending(x=>x.CreatedOn).Skip((pageNo - 1) * pageSize).Take(pageSize).ToList();

//                return Ok(new { info = Info, count = Count });

//            }
//            catch (Exception e)
//            {
//                return StatusCode(500, e.Message);
//            }
//        }

//        public class BodyObject
//        {
//            public long? Id { get; set; }
//            public string Name { get; set; }
//            public string EngilshName { get; set; }
//        }

//        [HttpPost("Add")]
//        public IActionResult Add([FromBody] BodyObject bodyObject)
//        {
//            try
//            {
//                if (bodyObject == null)
//                    return StatusCode(BackMessages.StatusCode, BackMessages.EmptyBodyObject);

//                var userId = this.help.GetCurrentUser(HttpContext);
//                if (userId <= 0)
//                    return StatusCode(BackMessages.StatusCode, BackMessages.NotAuthorized);

//                if (string.IsNullOrEmpty(bodyObject.Name))
//                    return StatusCode(BackMessages.StatusCode, BackMessages.NameEmpty);


//                var IsExist = db.Municipalities.Where(x => x.Name == bodyObject.Name && x.Status != 9).SingleOrDefault();

//                if (IsExist != null)
//                    return StatusCode(BackMessages.StatusCode, BackMessages.NameExist);

//                Municipalities row = new Municipalities();
//                row.Name = bodyObject.Name;
//                row.EnglishName = bodyObject.EngilshName;
//                row.CreatedBy = userId;
//                row.CreatedOn = DateTime.Now;
//                row.Status = 1;
//                db.Municipalities.Add(row);
//                db.SaveChanges();
//                return Ok(BackMessages.SucessAddOperations);
//            }
//            catch (Exception e)
//            {
//                return StatusCode(500, e.Message);
//            }
//        }

//        [HttpPost("Edit")]
//        public IActionResult Edit([FromBody] BodyObject bodyObject)
//        {
//            try
//            {
//                if (bodyObject == null)
//                    return StatusCode(BackMessages.StatusCode, BackMessages.EmptyBodyObject);

//                var userId = this.help.GetCurrentUser(HttpContext);
//                if (userId <= 0)
//                    return StatusCode(BackMessages.StatusCode, BackMessages.NotAuthorized);

//                if (string.IsNullOrEmpty(bodyObject.Name))
//                    return StatusCode(BackMessages.StatusCode, BackMessages.NameEmpty);


//                var IsExist = db.Municipalities.Where(x => x.Name == bodyObject.Name && x.Id != bodyObject.Id && x.Status != 9).SingleOrDefault();

//                if (IsExist != null)
//                    return StatusCode(BackMessages.StatusCode, BackMessages.NameExist);

//                IsExist = db.Municipalities.Where(x => x.Id == bodyObject.Id && x.Status != 9).SingleOrDefault();

//                if (IsExist == null)
//                    return StatusCode(BackMessages.StatusCode, BackMessages.NotFound);

//                IsExist.Name = bodyObject.Name;
//                IsExist.EnglishName = bodyObject.EngilshName;
//                db.SaveChanges();
//                return Ok(BackMessages.SucessEditOperations);
//            }
//            catch (Exception e)
//            {
//                return StatusCode(500, e.Message);
//            }
//        }

//        [HttpPost("{id}/delete")]
//        public IActionResult delete(long id)
//        {
//            try
//            {
//                if (id <= 0)
//                    return StatusCode(BackMessages.StatusCode, BackMessages.EmptyBodyObject);

//                var userId = this.help.GetCurrentUser(HttpContext);
//                if (userId <= 0)
//                    return StatusCode(BackMessages.StatusCode, BackMessages.NotAuthorized);

//                int hasCheldrin = db.Hospitals.Where(x => x.MunicipalitieId == id && x.Status != 9).Count();

//                if (hasCheldrin > 0)
//                    return StatusCode(BackMessages.StatusCode, BackMessages.HasChild);

//                var Info = db.Municipalities.Where(x => x.Id == id && x.Status != 9).SingleOrDefault();

//                if (Info == null)
//                    return StatusCode(BackMessages.StatusCode, BackMessages.NotFound);

//                Info.Status = 9;
//                db.SaveChanges();
//                return Ok(BackMessages.SucessDeleteOperations);
//            }
//            catch (Exception e)
//            {
//                return StatusCode(500, e.Message);
//            }
//        }


//    }
//}