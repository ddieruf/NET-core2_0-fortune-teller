using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Microsoft.EntityFrameworkCore;

//For Logging
using Microsoft.Extensions.Logging;

namespace FortuneTeller.Services
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();
						services.AddDbContext<FortuneTellerContext>(opt => opt.UseInMemoryDatabase("Fortunes"));

            services.AddMvc().AddJsonOptions(options => ConfigureSerializer(options.SerializerSettings));
            services.AddCors();
						services.AddScoped<IFortuneTeller, FortuneTeller>();

            JsonConvert.DefaultSettings = () => ConfigureSerializer(new JsonSerializerSettings());
        }



        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

						loggerFactory.AddConsole(Configuration.GetSection("Logging"));
						loggerFactory.AddDebug();

						app.UseCors(builder => {
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            });
            app.UseMvc();
        }



        private JsonSerializerSettings ConfigureSerializer(JsonSerializerSettings serializer)
        {
            serializer.Formatting = Formatting.Indented;
//            serializer.NullValueHandling = NullValueHandling.Ignore;
//            serializer.DefaultValueHandling = DefaultValueHandling.Ignore;
            serializer.MissingMemberHandling = MissingMemberHandling.Ignore;
            serializer.Converters = new List<JsonConverter> {new StringEnumConverter()};
            return serializer;

        }
    }
}
