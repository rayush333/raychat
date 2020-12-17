import React from "react";
import {Avatar} from "@material-ui/core";
import Axios from "axios";
// import {useHistory} from "react-router-dom";
import {useStateValue} from "../StateProvider";
import { actionTypes } from "../reducer";
function JoinRoom(){
    const [{user}, dispatch] = useStateValue();
    // let history=useHistory();
    async function handleClick(){
        const id=prompt("Enter room id");
        if(id)
        {
            const res=await Axios.post("http://localhost:5000/joinroom/"+id,{user: user._id});
            if(res.data === "No such room")
            {
                alert(res.data);
            }
            else
            {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: res.data
                });
            }
        }
    }
    return <div onClick={handleClick} className="list-item">
    <Avatar src="https://cdn0.iconfinder.com/data/icons/simply-orange-1/128/Speech_bubblesvg-512.png" />
    <div className="chat-info">
        <h1 className="cr-room">Join Room</h1>
        
    </div>
</div>;
}
export default JoinRoom;