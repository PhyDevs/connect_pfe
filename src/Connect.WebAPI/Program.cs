
WebApplication.CreateBuilder(args)
    .ConfigureServices()
    .Build()
    .ConfigureMiddelwares()
    .Run();
