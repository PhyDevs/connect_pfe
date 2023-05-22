using Connect.Infrastructure.Persistance;

public static class StartupConfigureMiddelwares
{

    // Configure the HTTP request pipeline.
    public static WebApplication ConfigureMiddelwares(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();

            using (var scope = app.Services.CreateScope())
            {
                var initialiser = scope.ServiceProvider.GetRequiredService<ConnectContextInitialiser>();
                initialiser.Initialise();
                initialiser.Seed();
            }
        }

        app.UseCors(builder => builder.WithOrigins("https://localhost:3000", "http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader());

        app.UseHttpsRedirection();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        return app;
    }
}
