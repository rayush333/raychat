import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Chat from "./Chat/Chat";
import Login from "./Login";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import {useStateValue} from "./StateProvider";
function App(){
  const [{user},dispatch] = useStateValue();
    return <div className="app">
       
       {user?
        <div className="app-body">
        <Router>
        <Sidebar />
        <Switch>
          <Route path="/:roomid">
          <Chat />
          </Route>
        </Switch>
        </Router></div>:<Login />}
        
    </div>;
    
}
export default App;