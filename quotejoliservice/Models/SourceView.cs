namespace quotejoliservice.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class SourceView : DbContext
    {
        public SourceView()
            : base("name=SourceView")
        {
        }

        public virtual DbSet<Author> Authors { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<Publisher> Publishers { get; set; }
        public virtual DbSet<Source> Sources { get; set; }
        public virtual DbSet<SourceAuthor> SourceAuthors { get; set; }
        public virtual DbSet<SourceTag> SourceTags { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Author>()
                .Property(e => e.firstName)
                .IsUnicode(false);

            modelBuilder.Entity<Author>()
                .Property(e => e.lastName)
                .IsUnicode(false);

            modelBuilder.Entity<Author>()
                .HasMany(e => e.SourceAuthors)
                .WithRequired(e => e.Author)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.ISO2)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.CountryName)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.LongCountryName)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.ISO3)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.NumCode)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.UNMemberState)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.CallingCode)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.CCTLD)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .HasMany(e => e.Publishers)
                .WithRequired(e => e.Country)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Publisher>()
                .Property(e => e.name)
                .IsUnicode(false);

            modelBuilder.Entity<Publisher>()
                .Property(e => e.city)
                .IsUnicode(false);

            modelBuilder.Entity<Publisher>()
                .Property(e => e.state)
                .IsUnicode(false);

            modelBuilder.Entity<Source>()
                .Property(e => e.title)
                .IsUnicode(false);

            modelBuilder.Entity<Source>()
                .Property(e => e.volume)
                .IsUnicode(false);

            modelBuilder.Entity<Source>()
                .Property(e => e.translator)
                .IsUnicode(false);

            modelBuilder.Entity<Source>()
                .HasMany(e => e.SourceAuthors)
                .WithRequired(e => e.Source)
                .WillCascadeOnDelete(false);
        }
    }
}
