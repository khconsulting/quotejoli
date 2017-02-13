namespace quotejoliservice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("SourceAuthor")]
    public partial class SourceAuthor
    {
        public int id { get; set; }

        public int sourceId { get; set; }

        public int authorId { get; set; }

        public virtual Author Author { get; set; }

        public virtual Source Source { get; set; }
    }
}
