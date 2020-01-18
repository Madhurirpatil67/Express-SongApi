let express =require("express");
let app=express();
app.use(express.json());
let Joi=require("@hapi/joi");
let port=process.env.PORT||4800;

let courses=[
        { id:1,
        name:"madhuri"
        }, {id:2,
        name:"sdgdg"},
        {id:3,
        name:"kukds"
        }, { id:4,
        name:"rtrey"},
        {id:5,
        name:"gfdsfsg" },
        { id:6,
        name:"gfsdsfs"},
];

app.get("/api/courses",(req,res)=>{
    res.send(courses);
});

//display
app.get("/api/course/:id",(req,res)=>{
   let course=courses.find(item=>item.id===parseInt(req.params.id))
   if(!course){
       return res.status(404).send({message:"Invalid Course id"});
   }
   let {id,name}=course;
   res.send(name);
});

//insert
app.post("/api/courses/newCourse",(req,res)=>{
  let {error}=validateError(req.body);
  if(error){
     res.send(error.details[0].message);
  }
  let course={
     id:courses.length+1,
     name:req.body.name
  }
  courses.push(course);
  res.send(courses);
});

//update
app.put("/api/courses/updateCourse/:id",(req,res)=>{
  let course=courses.find(item=>item.id===parseInt(req.params.id))
  if(!course){
    res.status(404).send({message:"Invalid Course id"});
  }
  let {error}=validateError(req.body);
  if(error){
     res.send(error.details[0].message);
  }
  course.name=req.body.name;
  res.send(courses);
});

//remove
app.delete("/api/courses/removeCourse/:id",(req,res)=>{
  let course=courses.find(item=>item.id===parseInt(req.params.id))
  if(!course){
       res.status(404).send({message:"Invalid Course id"});
  }
  let index=courses.indexOf(course);
  courses.splice(index,1);
  res.send({message:"removed the data",c:courses});
});

function validateError(error)
{
  let schema=Joi.object({
    name:Joi.string().min(4).max(10).required().alphanum()
  });
  return schema.validate(error);
}
app.listen(port,()=>{console.log(`port working on ${port}`)});