using Backend.Repository;
using Backend.Repository.Client;
using Backend.Repository.ClientReview;
using Backend.Service.Client;
using Backend.Service.ClientReview;
using Backend.Util.QueryBuilder.Client;
using Backend.Util.QueryBuilder.ClientReview;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddSingleton(_ => new Database("Server=database;Database=dev;User Id=sa;Password=superADMIN123!@#;"));
builder.Services.AddSingleton<IClientQueryBuilder, ClientQueryBuilderSqlServer>();
builder.Services.AddSingleton<IClientRepository, ClientRepository>();
builder.Services.AddSingleton<IClientService, ClientService>();
builder.Services.AddSingleton<IClientReviewQueryBuilder, ClientReviewQueryBuilderSqlServer>();
builder.Services.AddSingleton<IClientReviewRepository, ClientReviewRepository>();
builder.Services.AddSingleton<IClientReviewService, ClientReviewService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => options.AddPolicy("CorsPolicy", builder =>
{
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
}));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
