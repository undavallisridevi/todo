const fs=require('fs')
// const schedule = require('node-schedule');
const express=require('express');
const app=express();
const ejs=require('ejs');
app.set("view engine","ejs");

app.use(express.static('drag'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.listen(3020,(req,res)=>
{

})
var users;
var userspecifictasks;
// app.get('/getdata',(req,res)=>{
 
//     fs.readFile("./tasks.json", "utf8", (err, jsonString) => {
//       if (err) {
//         console.log("File read failed:", err);
//         return;
//       }
//       temp = JSON.parse(jsonString);
//       // console.log(temp);
//       res.send(temp);
//     });

// }
// )
app.get('/getupdateddata',(req,res)=>
{
  fs.readFile("./tasks.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    temp = JSON.parse(jsonString);
    // console.log(temp);
    //console.log(temp);
    res.send(temp);
  });
})
app.post('/api',(req,res)=>
{
  
 
  var updateddata=JSON.stringify(req.body);
 
  fs.writeFile("./tasks.json", updateddata, (err) => {
    
    if (err) throw err;
    
  });
  
  res.send("ok");
 });

  

app.post('/postdata',(req,res)=>
{

console.log(req.body.data);

fs.readFile("./tasks.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
   
    temp = JSON.parse(jsonString); //now it an object
    if(Array.isArray(req.body.data))
    {
   for(var i in req.body.data)
   {
    temp.tasks.push(req.body.data[i]);
   }}
   else{
    
    temp.tasks.push(req.body.data);
   }
    var newData = JSON.stringify(temp); //convert it back to json
    fs.writeFile("./tasks.json", newData, (err) => {
      // write it back
      // error checking
      if (err) throw err;
      console.log("New data added");
    });
    res.send("received")
 });
 
})

// var j = schedule.scheduleJob({hour: 17, minute: 48}, function(){
//  console.log("hai");
// });

app.use('/admin',express.static('./admin'));

//verify admin
app.post('/admindata',(req,res)=>
{


  // console.log(req.body.data);
  
    fs.readFile("./admin.json", "utf8", (err, admindetails) => {
      if (err) {
        console.log("File read failed:", err);
        return;
      }
      temp = JSON.parse(admindetails);
      const admin = temp.admins.find(admin => admin.name === req.body.data.username);
  
      // If the user is not found, display an error message
      if (!admin) {
  
        res.send('Admin not found');
        return;
      }
  
      // If the password is incorrect, display an error message
      if (admin.password !== req.body.data.password) {
  
        res.send("incorrect password")
        return;
      }
    
       
      res.redirect('http://localhost:3020/assigntasks');
  
  
    });
  
  });
  
//admit tasks assignment
app.get("/alltasks",(req,res)=>{
  let tlist = JSON.parse(fs.readFileSync(__dirname+"/tasks.json"))
  var arr={};
 var obj=[];
  tlist["tasks"].forEach(task=>
    {
      if(task.assigned==="true")
    obj.push(task)
  })
  arr["tasks"]=obj;
 

  res.send(arr);
})





app.use('/assigntasks',express.static('./adminassignment'));


//user login
app.use('/userlogin',express.static('./user'));


//verify user


app.post('/userauthenticate',(req,res)=>
{



  
    fs.readFile("./users.json", "utf8", (err, userdetails) => {
      if (err) {
        console.log("File read failed:", err);
        return;
      }
      temp = JSON.parse(userdetails);
      users=req.body.data.uname;
     
      const user = temp.users.find(user => user.name === req.body.data.uname);
  
      // If the user is not found, display an error message
      if (!user) {
  
        res.send('incorrect username');
        return;
      }
  
      // If the password is incorrect, display an error message
      if (user.password !== req.body.data.psw) {
  
        res.send("incorrect password")
        return;
      }
     
      fs.readFile("./tasks.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        temp = JSON.parse(jsonString);
      username=req.body.data.uname;
      userspecifictasks=[];
        const  usertasks=temp["tasks"];
      
        usertasks.forEach(u => {if(u.username.trim()===req.body.data.uname.trim())
          userspecifictasks.push(u);
        });
      //  console.log(userspecifictasks);
       
      res.redirect('http://localhost:3020/todo');
  
  
    });
  
  });
});
app.get('/script.js',(req,res)=>{
  res.sendFile(__dirname+'/views/script.js')
})
app.get('/style.css',(req,res)=>{
  res.sendFile(__dirname+'/views/style.css')
})
app.get('/todo',(req,res)=>
{

  res.render("index",{dat:userspecifictasks,username:users

  })
})