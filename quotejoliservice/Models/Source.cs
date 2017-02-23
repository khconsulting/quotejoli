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

        [StringLength(20)]
        public string isbn { get; set; }

        [Required(ErrorMessage = "Please select a list of authors for this source")]
        public virtual ICollection<SourceAuthor> Authors { get; set; }

        public string AuthorNames {
            get
            {
                if (Authors == null)
                {
                    return "";
                }

                const string START_FORMAT = "{1}";
                const string LIST_FORMAT = "{0}; {1}";


                string format = START_FORMAT;
                string s = "";
                string fullName = "init";

                foreach (var a in Authors)
                {
                    // Get full name, handling null Author object 
                    fullName = (a.Author == null) ? "missing" : a.Author.fullName;

                    // Add full name to list, handling first element differently
                    format = (s.Length == 0) ? START_FORMAT : LIST_FORMAT;
                    s = String.Format(format, s, fullName);
                }
                return s;
            }
        }
    }
}
