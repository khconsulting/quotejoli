using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using quotejoliservice.Data;
using quotejoliservice.Models;

namespace quotejoliservice.Controllers
{
    public class SourcesController : ApiController
    {
        private quotejoliContext db = new quotejoliContext();

        // GET: api/Sources
        public IQueryable<Source> GetSources()
        {
            return db.Sources;
        }

        // GET: api/Sources/5
        [ResponseType(typeof(Source))]
        public IHttpActionResult GetSource(int id)
        {
            Source source = db.Sources.Find(id);
            if (source == null)
            {
                return NotFound();
            }

            return Ok(source);
        }

        // PUT: api/Sources/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSource(int id, Source source)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != source.id)
            {
                return BadRequest();
            }

            db.Entry(source).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SourceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Sources
        [ResponseType(typeof(Source))]
        public IHttpActionResult PostSource(Source source)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Sources.Add(source);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = source.id }, source);
        }

        // DELETE: api/Sources/5
        [ResponseType(typeof(Source))]
        public IHttpActionResult DeleteSource(int id)
        {
            Source source = db.Sources.Find(id);
            if (source == null)
            {
                return NotFound();
            }

            db.Sources.Remove(source);
            db.SaveChanges();

            return Ok(source);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SourceExists(int id)
        {
            return db.Sources.Count(e => e.id == id) > 0;
        }
    }
}