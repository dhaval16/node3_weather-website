const path = require('path');
const express = require("express");
const app =express();
const riya = require("./weather-app/app.js");
const hbs = require('hbs');

//paths for express
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

// setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);

//setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:"Home Page",
        name:"Dhaval Parmar"
    });
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
       return res.send({
            error:"You must provide search"
        })
    }
    
    console.log(req.query.search);
    res.send({
        products:[]
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:'Parmar Dhaval'
    }); 
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Contact Us",
        ContactNo:9999999999,
        Email:'abc@gmail.com'
    }); 
})
app.get('/weather',(req,res)=>{
     res.render("weather",{
        address:req.query.address,
        forecast:'It is Running',
        location:'surat'
    });
});
app.get('/weatherForecast',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:"You must provide Address"
        })
    }

    riya.geocode(req.query.address,(error,{ latitude,longitude,place_name } = {})=>{
        
        if(error)
        {
            return res.send({
                error:"error in geocode"
            });
        }
        // console.log("error = ",error);
        // console.log("latitude = ",latitude);
        // console.log("longitude = ",longitude);
        // console.log("place_name = ",place_name);
    
        riya.weathercode(place_name,(error,{temp,rain} = {})=>{
            if(error)
            {
                return res.send({
                    error:"error in weather"
                });
            }
            res.send([{
                forecast:{longitude,latitude}
            },
            {
                weathercode:{temp,rain}
            },{
                address:req.query.address
            }])
            // console.log("error = ",error);
            // console.log("temp = ",temp);
            // console.log("rain = ",rain);
        });    
    
    });

    // res.send({
    //     address:req.query.address,
    //     forecast:'It is Running',
    //     location:'surat'
    // });
    // res.render('weather',{
    //     title:"Weather App",
    //     forecast:'It is Running',
    //     location:'surat'
    // }); 
})

app.get('/help/*',(req,res)=>{
    res.render("404",{
        title:"404",
        name:'Parmar Dhaval',
        ErrorMessage:'help Protocol Not Found'
    });
})

app.get('/weather/*',(req,res)=>{
    res.render("404",{
        title:"404",
        name:'Parmar Dhaval',
        ErrorMessage:'weather Protocol Not Found'
    });
})

app.get('/about/*',(req,res)=>{
    res.render("404",{
        title:"404",
        name:'Parmar Dhaval',
        ErrorMessage:'About Protocol Not Found'
    });
})

app.get('*',(req,res)=>{
    res.render("404",{
        title:"404",
        name:'Parmar Dhaval',
        ErrorMessage:'Page Not Found'
    });
})

app.listen(8002,()=>
{ 
    console.log("server is running at 8002") 
});



// app.get('/Help/',(req,res)=>{
//     //res.send("id = "+req.params.id);
//     res.send({
//         name:"dhaval",
//         age:21
//     });
// })

// app.get('/about',(req,res)=>{
//     res.send("<title>About</title><h1>About</h1>");
// })


// app.get('/',(req,res)=>{
//     res.send("<h1><center>Hello</center></h1>");
// })
//const hbs = require('hbs');


// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));
//app.use(express.static(publicDirectoryPath));