namespace quotejoliservice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Source")]
    public partial class Source
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Source()
        {
            SourceAuthors = new HashSet<SourceAuthor>();
        }

        public int id { get; set; }

        [Required]
        [StringLength(4000)]
        public string title { get; set; }

        public int year { get; set; }

        public int? yearOriginal { get; set; }

        public short type { get; set; }

        public int publisherId { get; set; }

        public virtual Publisher Publisher { get; set; }

        [StringLength(10)]
        public string volume { get; set; }

        public short? edition { get; set; }

        public string translator { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SourceAuthor> SourceAuthors { get; set; }
    }
}
