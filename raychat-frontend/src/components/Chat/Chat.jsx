import React,{useState,useEffect} from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import {useParams} from "react-router-dom";
import Pusher from "pusher-js";
import axios from "axios";
function Chat(){
    const {roomid} = useParams();
    const [room,updateroom] = useState({
        id: "",
        name: "",
        messages: []
    });
    
    useEffect(()=>
    {
        if(roomid)
        {
            axios.get("http://localhost:5000/rooms/"+roomid)
            .then((res)=> {
                updateroom({
                    id: roomid,
                    name: res.data.name,
                    messages: res.data.messages
                });
            });
            const pusher = new Pusher('39426f4afe4886d52f52', {
                cluster: 'ap2'
              });
          
              const channel = pusher.subscribe('messages');
              channel.bind('updated',function(data){
                  console.log(roomid);
                if(data.room_id === roomid)
                {
                    axios.get("http://localhost:5000/rooms/"+roomid)
                    .then((res)=> {
                        
                        updateroom({
                            id:res.data._id,
                            name: res.data.name,
                            messages: res.data.messages
                        });
                    });
                }
                else
                {
                    updateroom((prev)=>{
                        return prev;
                    })
                }
                    });
        }
},[roomid]);
    return <div className="chat">
        <ChatHeader name={room.name} id={room.id} msg={room.messages}/>
        <ChatBody array={room.messages} />
        <ChatFooter roomid={room.id} />
    </div>;
}
export default Chat;