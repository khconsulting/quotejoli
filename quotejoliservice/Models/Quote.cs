namespace quotejoliservice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Quote")]
    public partial class Quote
    {
        public int id { get; set; }

        public int sourceId { get; set; }

        [Required]
        public string text { get; set; }

        public int page { get; set; }

        public int para { get; set; }

        public virtual Source Source { get; set; }
    }
}
