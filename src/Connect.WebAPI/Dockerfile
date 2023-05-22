# Build Stage
from mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build
WORKDIR /src

COPY ["Connect.WebAPI.csproj", "Connect.WebAPI/."]
RUN dotnet restore "./Connect.WebAPI/Connect.WebAPI.csproj" --disable-parallel

COPY ../. .
RUN dotnet publsih "./Connect.WebAPI/Connect.WebAPI.csproj" -c release -o /app --no-restore


# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine AS final
WORKDIR /app

COPY --from=build /app ./

EXPOSE 5001

ENTRYPOINT ["dotnet", "Connect.WebAPI.dll"]
