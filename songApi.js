let PORT=4800||process.env.PORT;
let express=require("express");
let app=express();
app.use(express.json());
let Joi=require("@hapi/joi");

let songs=[{id:1,name:"Hamari Adhuri Kahani",singer:"Arijit Singh",duration:"6:38",price:"1089"},
           {id:2,name:"Yeh Dil Deewana",singer:"Sonu Nigam",duration:"7:06",price:"1000"},
           {id:3,name:"Mile Ho Tum",singer:"Neha Kakkar",duration:"4:24",price:"2000"},
           {id:4,name:"Diwani Mastani",singer:"Shreya Ghoshal",duration:"5:40",price:"3000"},
           {id:5,name:"Kamli",singer:"Sunidhi Chauhan",duration:"3:54",price:"2500"},
           {id:6,name:"Tere Bina Zindagi Se",singer:"Lata Mangeshkar ",duration:"5:54",price:"1500"}];

//Display All Songs
app.get("/api/allsongs",(req,res)=>{
    res.send(songs);
});

//Particular Song
app.get("/api/allsongs/:id",(req,res)=>{
    let song=songs.find(data=>data.id===parseInt(req.params.id))
    if(!song){
       res.status(404).send({message:"Invalid Song Id"});
    }
    res.send(song.name);
});

//create song
app.post("/api/allsongs/newsong",(req,res)=>{
    let {error}=validateError(req.body);
    if(error){
        res.send(error.details[0].message);
    }
    let song={
                id:songs.length+1,
                name:req.body.name,
                singer:req.body.singer,
                duration:req.body.duration,
                price:req.body.price
            }
    songs.push(song);
    res.send(songs);
});

//update song
app.put("/api/allsongs/updatesong/:id",(req,res)=>{
    let song=songs.find(data=>data.id===parseInt(req.params.id))
    if(!song){
        res.status(404).send({message:"Invalid Song Id"});
    }
    let {error}=validateError(req.body);
    if(error){
       res.send(error.details[0].message);
    }
      song.name=req.body.name,
      song.singer=req.body.singer,
      song.duration=req.body.duration,
      song.price=req.body.price

      res.send(songs);
});

//remove song
app.delete("/api/allsongs/removesong/:id",(req,res)=>{
    let song=songs.find(data=>data.id===parseInt(req.params.id))
    if(!song){
        res.status(404).send({message:"Invalid Song Id"});
    }
    let index=songs.indexOf(song);
    songs.splice(index,1);
    res.send({message:"Delete Song",s:songs});
})

function validateError(error){
    let Schema=Joi.object({
       name: Joi.string().min(4).max(25).required(),
       singer:Joi.string().min(4).max(25).required(),
       duration:Joi.string().min(2).max(6).required(),
       price:Joi.number().min(100).max(5000).required(),
    });
   return Schema.validate(error);
}

app.listen(PORT,()=>{console.log(`Port Working On : ${PORT}`)});