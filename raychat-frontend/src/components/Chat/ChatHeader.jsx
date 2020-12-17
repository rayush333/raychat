import React from "react";
import {Avatar, IconButton} from "@material-ui/core";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
function ChatHeader(props){
    const len=props.msg.length;
    const msg=props.msg[len-1];
    function addmenu(){
        alert("Your room id is: "+props.id+"\nShare this id with your friends to add them to your private room!\nAttention: Do not share your room id with third parties.");
    }
    return <div className="chat-header">
        <Avatar className="contact-photo" src= {"https://avatars.dicebear.com/api/human/"+props.id+".svg"} />
        <div className="chat-header-info">
            <h3>{props.name}</h3>
            <p>last seen at {msg?.time}</p>
        </div>
        <div class="chat-header-right">
        <IconButton><SearchOutlinedIcon /></IconButton>
        <IconButton><AttachFileIcon /></IconButton>
        <IconButton><AddIcon onClick = {addmenu} /></IconButton>
        </div>
    </div>;
}
export default ChatHeader;