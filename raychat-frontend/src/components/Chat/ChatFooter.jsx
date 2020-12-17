import React,{useEffect, useState} from "react";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import {IconButton, Fab} from "@material-ui/core";
import MicIcon from '@material-ui/icons/Mic';
import axios from "axios";
import {useStateValue} from "../StateProvider";
import Picker from "emoji-picker-react";
function ChatFooter(props){
    const [show,setshow] = useState(0);
    const [{user},dispatch] = useStateValue();
    const [msg,updatemsg] = useState({
        sender_name: "",
        sender_id: "",
        message: "",
        time: ""
    });
    useEffect(()=>{
        update();
    },[]);
        function update(){
            updatemsg({
                sender_name: user.name,
                sender_id: user._id,
            });
        }
        async function handleSubmit(event){
        event.preventDefault();
        console.log(msg);
        if(msg.message){
        await axios.post("http://localhost:5000/rooms/"+props.roomid+"/messages",msg);
        updatemsg({
            sender_name: user.name,
            sender_id: user._id,
            message: "",
            time: ""
        });
    }
    }
    function handleChange(event){
        const {name,value} = event.target;
        updatemsg(function(prev){
            return {
                ...prev,
                [name]: value,
                time: new Date().toLocaleTimeString()
                };
        });
    }
    function handleEmoticonClick(){
        setshow(!show);
    }
    function handleEmojiClick(event,emojiobject){
        const text= msg.message || "";
        updatemsg((prev)=>{
            return {
                ...prev,
                message: text+emojiobject.emoji,
                time: new Date().toLocaleTimeString()
            }
        });
    }
      function inputclick(){
        setshow(0);
    }
    
    return <div class="chat-footer">
    <IconButton><InsertEmoticonIcon onClick={handleEmoticonClick} /></IconButton>
    {show?<div className="picker"><Picker onEmojiClick={handleEmojiClick} /></div>:null}
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Type a message" name="message" value={msg.message} onChange={handleChange} onClick={inputclick} autoComplete="off" spellCheck="false" />
        <Fab color="orange" type="submit" onClick={inputclick} ><SendIcon /></Fab>
    </form>
    <IconButton><MicIcon /></IconButton>
    </div>;
}
export default ChatFooter;