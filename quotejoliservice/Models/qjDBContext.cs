using quotejoliservice.Models;
using System.Data.Entity;

namespace quotejoliservice.Data
{
    public class quotejoliContext :  DbContext
    {
        public quotejoliContext() : base("name=quotejoli")
        {
            this.Database.Log = s => System.Diagnostics.Debug.WriteLine(s);
        }

        public System.Data.Entity.DbSet<quotejoliservice.Models.Source> Sources { get; set; }

        public System.Data.Entity.DbSet<quotejoliservice.Models.Publisher> Publishers { get; set; }

        public System.Data.Entity.DbSet<quotejoliservice.Models.Quote> Quotes { get; set; }

        public System.Data.Entity.DbSet<quotejoliservice.Models.Author> Authors { get; set; }
    }
}