namespace quotejoliservice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("SourceTag")]
    public partial class SourceTag
    {
        public int id { get; set; }

        public int quoteId { get; set; }

        public int tagId { get; set; }
    }
}
