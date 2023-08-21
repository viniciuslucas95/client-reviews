using Backend.Repository;
using Backend.Repository.Client;
using Backend.Service;
using Backend.Util.QueryBuilder;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddSingleton(_ => new Database("Server=localhost;Database=dev;User Id=sa;Password=superADMIN123!@#;"));
builder.Services.AddSingleton<IClientQueryBuilder, ClientQueryBuilderSqlServer>();
builder.Services.AddSingleton<IClientRepository, ClientRepository>();
builder.Services.AddSingleton<IClientService, ClientService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => options.AddPolicy("dev", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("dev");

app.UseAuthorization();

app.MapControllers();

app.Run();
