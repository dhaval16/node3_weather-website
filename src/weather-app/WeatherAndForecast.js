const app = require("../weather-app/app.js");
const address = process.argv[2];
//console.log(process.argv);
if(!address)
{
    console.log("Please Provide Address");
}
else
{
    app.geocode(address,(error,{ latitude,longitude,place_name })=>{
        console.log("error = ",error);
        console.log("latitude = ",latitude);
        console.log("longitude = ",longitude);
        console.log("place_name = ",place_name);
    
        app.weathercode(place_name,(error,{temp,rain})=>{
            console.log("error = ",error);
            console.log("temp = ",temp);
            console.log("rain = ",rain);
        });    
    
    });
}