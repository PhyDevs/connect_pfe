# Connect App

Description
------------
connect_pfe is a web application built with .Net Core(C#) and ReactJS, helps to facilitate communication between students and their teachers.

Prerequisites
------------
Before running the web app, ensure that you have the following prerequisites installed:

* [.NET Core SDK 6](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
* [Node.js](https://nodejs.org/en)
* [SQL Server 2019](https://www.microsoft.com/en-us/sql-server/sql-server-2019)

or [Docker](https://www.docker.com/).


Getting Started
------------
Follow the steps below to get the web app up and running on your local machine:

1. Clone this repository to your local machine using: `git clone https://github.com/PhyDevs/connect_pfe.git`.
2. Install the backend dependencies by running `dotnet restore src/Connect.WebAPI`.
3. Build the project by running `dotnet build src/Connect.WebAPI`.
4. Start the development server by running `dotnet run --project src/Connect.WebAPI`.
5. Navigate to the client project directory: `cd client`.
6. Install the frontend dependencies by running `npm install` or `yarn install`.
7. Start the development server by running `npm start`.
7. Open your browser and visit http://localhost:3000 to view the web app.

<!-- or just run docker compose up -->

Project Structure
------------
The project follows a standard clean architecture structure:

<pre>
├── /client
│   ├── /src               # React.js source code
│   └── package.json       # npm package configuration file
|
├── /src                      # the backend source code
│   ├── /Application          # Contains application-specific logic and use cases
│   ├── /Domain               # Defines the core domain models
│   ├── /Infrastructure       # Implements infrastructure-related components and services
│   └── /WebAPI               # Contains the application Web API project
│       ├── /Controllers                      # Controller classes
│       ├── StartupConfigureMiddelwares.cs    # Configure the HTTP request pipeline.
│       ├── StartupConfigureServices.cs       # Configures and add services to the container.
│       └── appsettings.json                  # Configuration file for the application
|
└── Connect.sln     # Solution file for the project
</pre>

Configuration  
------------
You can update the connection strings on `src/Connect.WebAPI/appsettings.json`.

Screenshots 
------------
<p align="center">
    <img src="https://i.postimg.cc/4xwsP9Kz/signin.jpg" />
    <br>
    <img src="https://i.postimg.cc/fL1wXQVp/signup.jpg" />
    <br>
    <img src="https://i.postimg.cc/SR0hRL5p/main.jpg" />
</p>

Enjoy!
