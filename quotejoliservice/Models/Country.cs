namespace quotejoliservice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Country")]
    public partial class Country
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id { get; set; }

        [StringLength(2)]
        public string ISO2 { get; set; }

        [Required]
        [StringLength(80)]
        public string CountryName { get; set; }

        [Required]
        [StringLength(80)]
        public string LongCountryName { get; set; }

        [StringLength(3)]
        public string ISO3 { get; set; }

        [StringLength(6)]
        public string NumCode { get; set; }

        [StringLength(12)]
        public string UNMemberState { get; set; }

        [StringLength(8)]
        public string CallingCode { get; set; }

        [StringLength(5)]
        public string CCTLD { get; set; }
    }
}
