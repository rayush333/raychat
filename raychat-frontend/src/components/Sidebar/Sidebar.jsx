import React,{useEffect, useState} from "react";
import SidebarHeader from "./SidebarHeader";
import Search from "./Search";
import List from "./List";
import axios from "axios";
function Sidebar(){
    // const [rooms,setRooms] = useState([]);
    // useEffect(()=>
    // {
    //     getRooms();
    // },[]);
    // async function getRooms(){
    //     const res=await axios.get("http://localhost:5000/rooms");
    //     console.log(res);
    //     setRooms(res.data);
    // }
    return <div className="sidebar">
        <SidebarHeader />
    <Search />
    <List />
    </div>;
}
export default Sidebar;