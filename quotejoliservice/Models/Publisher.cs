namespace quotejoliservice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Publisher")]
    public partial class Publisher
    {
        public int id { get; set; }

        [Required]
        public string name { get; set; }

        [Required]
        public string city { get; set; }

        [Required]
        public string state { get; set; }

        public int countryId { get; set; }
    }
}
