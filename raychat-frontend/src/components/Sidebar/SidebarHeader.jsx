import React from "react";
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';
import {useStateValue} from "../StateProvider";
function SidebarHeader(){
    const [{user}, dispatch] = useStateValue();
    return <div className="sidebar-header">
        <Avatar src={user.pic} alt="face" />
        <h2 className="dname">{user.name}</h2>
       <div class="sidebar-header-right">
         <IconButton className="butt"> <DonutLargeIcon /> </IconButton>
        <IconButton className="butt"> <ChatIcon /> </IconButton>
           <IconButton className="butt"> <MoreVertIcon /> </IconButton> 
        </div>
    </div>;

}
export default SidebarHeader;