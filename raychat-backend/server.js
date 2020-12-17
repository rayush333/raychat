require("dotenv").config();
const express=require('express');
const Pusher=require('pusher');
const cors=require("cors");
const app=express();
app.use(cors());
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const mongoose=require('mongoose');
const encrypt = require('mongoose-encryption');
mongoose.connect("mongodb+srv://admin-ayush:"+process.env.DB_PASSWORD+"@raychatcluster.c84vz.mongodb.net/usersDB?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},function(err){
    if(err)
    console.log(err);
    else
    console.log("Connected to remote DB");
});
const pusher = new Pusher({
    appId: "1120678",
    key: "39426f4afe4886d52f52",
    secret: "1abf45d0e49a2477899d",
    cluster: "ap2",
    useTLS: true
  });
const messageSchema=new mongoose.Schema({
    message: String,
    room_id: String,
    sender_name: String,
    sender_id: String,
    time: String
});
const roomSchema=new mongoose.Schema({
    name: String,
    messages: [{type: messageSchema}]
});
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    pic: String,
    rooms: [{type: String}]
});
roomSchema.plugin(encrypt,{secret: process.env.SECRET,encryptedFields: ['messages']});
// const Message=mongoose.model("Message",messageSchema);
const Room=mongoose.model("Room",roomSchema);
const User = mongoose.model("User",userSchema);
// const newroom = new Room({
//     name: "Test Room"
// });
// newroom.save();
const changeStream=Room.watch().on("change",(change)=>{
    console.log("I tracked a change");
    console.log(change.documentKey._id);
    if(change.operationType==='update')
    {
        const id=change.documentKey._id;
        console.log("Pusher triggered");
        pusher.trigger('messages','updated',{
            room_id:id
        });
    }
    // else if(change.operationType==='delete'){
    //     console.log("Pusher triggered for delete");
    //     pusher.trigger('messages','deleted',{
    //         _id:change.documentKey._id
    //     });
    // }
    // else if(change.operationType==='update'){
    //     console.log("Pusher triggered for update");
    //     pusher.trigger('messages','updated',{
    //         _id:change.documentKey._id
    //     });
    // }
    // else
    // console.log("Error trigerring pusher");
});
app.get("/rooms",function(req,res){
    console.log(req);
    Room.find({},function(err,rooms){
        if(err)
        res.send(err);
        else
        res.send(rooms);
    });
});
app.post("/rooms",function(req,res){
    console.log(req.body);
    const newroom = new Room({
        name: req.body.name,
    });
    newroom.save((err)=>
    {
        if(err)
        console.log(err);
    });
    User.findOne({_id: req.body.user}, function(err,user){
        if(err)
        res.send(err);
        else
        {
            user.rooms.push(newroom._id);
            user.save();
            res.send(user);
        }
    });

});
app.get("/rooms/:roomid",function(req,res){
    console.log(req.params.roomid+" par request aaya");
    Room.findOne({_id: req.params.roomid},function(err,room){
        if(err)
        console.log(err);
        else
        res.send(room);
    });
});
app.post("/joinroom/:roomid",function(req,res){
    Room.findOne({_id:req.params.roomid},function(err,room){
        if(err)
        console.log(err);
        else if(!room)
        res.send("No such room");
        else
        {
            User.findOne({_id: req.body.user},function(err,user){
                if(err)
                console.log(err);
                else{
                    user.rooms.push(req.params.roomid);
                    user.save();
                    res.send(user);
                }
            });
        }
    });
});
app.post("/users",function(req,res){
    User.findOne({email: req.body.email},function(err,user){
        if(err)
        console.log(err);
        else if(!user)
        {
            const newuser=new User({
                name: req.body.displayName,
                email: req.body.email,
                pic: req.body.photoURL,
                rooms: []
            });
            newuser.save();
            res.send(newuser);
        }
        else
        res.send(user);
    }
    );
});
app.post("/rooms/:roomid/messages",function(req,res){
    console.log(req.body);
    Room.findOne({_id:req.params.roomid},function(err,room){
        if(err)
        console.log(err);
        else
        {
            room.messages.push({
                ...req.body,
                room_id:req.params.roomid
            });
            room.save();
            res.send(req.body);
        }
    });
});
app.patch("/rooms/:roomid/messages",function(req,res){
    console.log(req.body);
    Room.findOne({_id: req.params.roomid},function(err,room){
        if(err)
        console.log(err);
        else
        {
            room.messages.forEach(function(message){
                if(message.time===req.body.time && message.message === req.body.message)
                {
                    message.message="This message was deleted";
                    message.time=null;
                }
            });
            room.save();
            res.send(room);
        }
    });
});
// app.get("/messages",function(req,res){
//     Message.find({},function(err,messages){
//         if(err)
//         res.send(err);
//         else
//         res.send(messages);
//     });
// });
//     app.post('/messages', function(req,res){
//     const newmessage=new Message(req.body);
//         newmessage.save(function(err)
//         {
//         if(err)
//         res.send(err);
//         else
//         res.redirect('/messages');
        
//         });
// });
// app.delete("/messages",function(req,res){
//     Message.deleteMany({},function(err){
//         if(err)
//         res.send(err);
//         else
//         redirect("/messages");
//     });
// });
// app.delete("/messages/:id",function(req,res){
//     Message.deleteOne({_id:req.params.id},function(err){
//         if(err)
//         console.log(err);
//     });
// });
// app.patch("/messages/:id",function(req,res){
//     Message.updateOne({_id: req.params.id},{message:"This message was deleted",time: ""},function(err){
//         if(err)
//         res.send(err);
        
//     });
// });
app.post("/exit/:roomid",function(req,res){
    User.findOne({_id:req.body.user},function(err,user){
        if(err)
        console.log(err);
        else
        {
            const index = user.rooms.indexOf(req.params.roomid);
            user.rooms.splice(index,1);
            user.save();
            res.send(user);
        }
    });
});
app.get("/",function(req,res){
    res.send("Hello World");
});
app.listen(process.env.PORT || 5000,function(){
    console.log("Server running at port 5000");
}) 


















// Steps

// requiring

// app config

// middleware

// DB config

// ???

// api routes

// listen
// 