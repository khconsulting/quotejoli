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

        public virtual ICollection<SourceAuthor> Authors { get; set; }

        public string AuthorNames {
            get
            {
                string s = "";
                string startFormat = "{1}, {2}";
                string listFormat = "{0}; {1}, {2}";
                string format = startFormat;

                foreach(var a in Authors)
                {
                    format = (s.Length == 0) ? startFormat : listFormat;
                    s = String.Format(format, s, a.Author.lastName, a.Author.firstName);
                }
                return s;
            }
        }
    }
}
