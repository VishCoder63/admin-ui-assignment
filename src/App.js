import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "./components/Search";
import { ListDisplay } from "./components/ListDisplay";
import { BottomTray } from "./components/BottomTray";
import { getAPIData } from "./Redux/Actions";
import { url } from "./constants";
import { useDispatch, useSelector } from "react-redux";


function App() {

const dispatch=useDispatch()
const data=useSelector(state=>state)
  useEffect(() => {
    dispatch(getAPIData(url));
  }, []);
  return (
    <div className="App">
      <Search />
      <ListDisplay />
      <BottomTray />
    </div>
  );
}

export default App;
