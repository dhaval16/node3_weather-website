// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     });
// });
console.log('client side js');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const lbl = document.querySelector('#label');
lbl.innerHTML = "";
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    fetch('http://localhost:8002/weatherForecast?address='+location).then((response)=>{
        response.json().then((data) =>{
            if(data.error)
            {
                lbl.innerHTML = "</br>"+data.error;    
                console.log(data.error);
            }
            else
            {
                // const dataTbl ={
                //     dfc:data.forecast,
                //     dl:data.longitude,
                //     dw:data.weathercode,
                //     dr:data.rain,
                //     da:data.address
                // }; 
                lbl.innerHTML = "<b>Forecast :</b> </br> latitude : "+data[0].forecast.latitude+"° N, longitude : "+data[0].forecast.longitude+"° E "+" </br> <b>Weather :</b>  </br> Tempreture : "+(data[1].weathercode.temp)+" °C | °F " +" Rain :"+((data[1].weathercode.rain * 10) - 4)+"% Location : "+data[2].address;
               // lbl.innerHTML = "Forecast </br> latitude : "+data.forecast[0][0]+" longitude : "+data.forecast[0][1]+" "+" </br> Weather  </br> Tempreture : "+data.weathercode[1][0]+" Rain :"+data.weathercode[1][1]+" Location : "+data.address[2][1];
                //console.log(data.forecast+" "+data.longitude+" "+data.weathercode+" "+data.rain+" "+data.address);
                console.log(data[0].forecast.longitude+" "+" "+data.weathercode);
                console.log(data);
            }
        })
    })
    
    //console.log(location);
    search.value = "";
})

