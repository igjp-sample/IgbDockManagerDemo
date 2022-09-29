using Blazored.LocalStorage;
using IgbDockManagerDemo;
using IgbDockManagerDemo.Services;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddIgniteUIBlazor();
builder.Services.AddBlazoredLocalStorage();
builder.Services.AddScoped<DockManagerHelper>();

await builder.Build().RunAsync();
