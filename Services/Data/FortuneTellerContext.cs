using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FortuneTeller.Services {
	public class FortuneTellerContext : DbContext {
		public FortuneTellerContext(DbContextOptions<FortuneTellerContext> options) : base(options) {

		}

		public DbSet<Fortune> Fortunes { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder) {
		}
	}
}