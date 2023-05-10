
public static class StartupConfigureMiddelwares
{

    // Configure the HTTP request pipeline.
    public static WebApplication ConfigureMiddelwares(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors(builder => builder.WithOrigins("https://localhost:3000", "http://localhost:3001", "https://localhost:3002")
                        .AllowAnyMethod()
                        .AllowAnyHeader());

        app.UseHttpsRedirection();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        return app;
    }
}
