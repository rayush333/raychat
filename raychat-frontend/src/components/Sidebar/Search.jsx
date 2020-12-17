import React from "react";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
function Search(){
    return<div className="search"><div className="search-container"> 
    <SearchOutlinedIcon />
    <input className="search-box" type="text" placeholder="Search or start a new chat" />
    </div></div>;
}
export default Search;