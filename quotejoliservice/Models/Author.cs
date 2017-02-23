namespace quotejoliservice.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Author")]
    public partial class Author
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Author()
        {
        }

        public int id { get; set; }

        public string firstName { get; set; }

        [Required]
        public string lastName { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SourceAuthor> Sources { get; set; }

        public string fullName
        {
            get
            {
                if (String.IsNullOrEmpty(firstName))
                {
                    return lastName;
                }
                else
                {
                    return String.Format("{0}, {1}", lastName, firstName);
                }
            }
        }
    }
}
