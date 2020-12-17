import React from "react";
import axios from "axios";
import DeleteIcon from '@material-ui/icons/Delete';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import {Fab} from "@material-ui/core";
import {useStateValue} from "../StateProvider";
function Message(props){
    const [{user},dispatch] = useStateValue();
const ec=(props.body.sender_id===user._id)?"message-sent":null;
    async function handleClick(){
        await axios.patch("http://localhost:5000/rooms/"+props.body.room_id+"/messages",props.body);
    }
            function read(pitch,rate){
            let sender="";
            let utterance = "";
            const voices = window.speechSynthesis.getVoices();
            console.log(voices);
            if(props.body.sender_id === user._id)
            sender="You";
            else
            sender = props.body.sender_name;
            let text = props.body.message;
            if(!props.body.time)
            utterance = new SpeechSynthesisUtterance(sender+" deleted this message");
            else
            utterance = new SpeechSynthesisUtterance(sender+" sent "+text);
            utterance.voice = voices[1];
            utterance.rate = rate;
            utterance.pitch = pitch;
            window.speechSynthesis.speak(utterance);
        }
return <p className={"message "+ec} >
        <span className="sender">{(props.body.sender_id===user._id)?null:props.body.sender_name}</span>
        {props.body.message}
            <span className="time">{props.body.time}</span>
            <Fab className = "sound" onClick={()=>{read(2,1)}}><VolumeUpRoundedIcon /></Fab>
        {props.body.sender_id === user._id && props.body.time && <Fab onClick={handleClick}><DeleteIcon /></Fab>}

    </p>;
}
export default Message;