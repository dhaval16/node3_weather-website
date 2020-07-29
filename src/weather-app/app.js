const http = require('http');
const request = require('request');

// const url = "http://api.weatherstack.com/current?access_key=eafcdee90a3c4d86ccd6e627cde81ddf&query=India";

// request({url:url,json:true},(error,response)=>{
//    // console.log(response);
//     // const jsondata = JSON.parse(response.body);
//     // console.log(jsondata.current);
//     //console.log(response.body);
//     if(error)
//         console.log(error);
//     else if(response.body.error)
//         console.log('Unable To Find Location');
//     else
//         console.log("it is currently "+response.body.current.temperature+" And "+response.body.current.precip+"% chance of rain");
    
// })

// const url1="https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZGhhdmFsMTYiLCJhIjoiY2tkNW1yd2V6MWhkcjJ0bndtbnYzenRpZSJ9.vbR5AMhSHzYye3LBDwiTog&limit=1";

// request({url:url1,json:true},(error,response)=>{
//     if(error)
//         console.log(error);
//     else if(response.body.error)
//         console.log('Unable To Find Location Try Another');    
//     else
//     {
//         console.log("long :-  "+response.body.features[0].center[1]);
//         console.log("lat :-  "+response.body.features[0].center[0]);
//     }
// })


const weathercode = (address,callback) =>{
    var add = encodeURIComponent(address);
    const url = "http://api.weatherstack.com/current?access_key=eafcdee90a3c4d86ccd6e627cde81ddf&query="+add;
    request({url,json:true},(error,response)=>{
        if(error)
        {
            callback("unable to connect",undefined);
        }
        else if(response.body.current.temperature == 0)
        {
            callback("unable to find location try another",undefined);
        }    
        else
        {
            //callback(undefined,response);
            callback(undefined,{
               temp: response.body.current.temperature,
               rain: response.body.current.precip
            });
        }
    })
}

// weathercode("India",(error,data)=>{
//     console.log("error = ",error);
//     console.log("data = ",data);
// });

const geocode = (address,callback) =>{
    var add = encodeURIComponent(address);
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+add+".json?access_token=pk.eyJ1IjoiZGhhdmFsMTYiLCJhIjoiY2tkNW1yd2V6MWhkcjJ0bndtbnYzenRpZSJ9.vbR5AMhSHzYye3LBDwiTog&limit=1";
    request({url,json:true},(error,response)=>{
        if(error)
        {
            callback("unable to connect",undefined);
        }
        else if(response.body.features.center == 0)
        {
            callback("unable to find location try another",undefined);
        }    
        else
        {
            //callback(undefined,response);
            callback(undefined,{
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                place_name: response.body.features[0].place_name
            });
        }
    })
}

// geocode("Surat Gujarat",(error,data)=>{
//     console.log("error = ",error);
//     console.log("data = ",data);
//     // console.log("lat :-  "+data.body.features[0].center[0]);
//     // console.log("long :-  "+data.body.features[0].center[1]);
//     // console.log("Place Name :-  "+data.body.features[0].place_name);
// })

module.exports =
{ 
    geocode:geocode,
    weathercode : weathercode
};








//console.log("Starting");
// setTimeout(()=>{
//     console.log("Inside TimeOut 1");
// },1000)

// setTimeout(()=>{
//     console.log("Inside TimeOut 2");
// },0)

// console.log("Stoping");
//http://api.weatherstack.com/forecast?access_key=eafcdee90a3c4d86ccd6e627cde81ddf&query=India
//http://api.weatherstack.com/historical?access_key=YOUR_ACCESS_KEY&query=India&historical_date_start=2015-10-21&historical_date_end=2015-10-25

//http://api.weatherstack.com/historical?access_key=YOUR_ACCESS_KEY&query=India&historical_date=2015-21-01

//http://api.weatherstack.com/current?access_key=eafcdee90a3c4d86ccd6e627cde81ddf&query=India