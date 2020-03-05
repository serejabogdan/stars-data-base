/* import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App"; */

/* ReactDOM.render(<App/>, document.getElementById('root')); */

fetch("https://swapi.co/api/people/1")
  .then(res => {
    console.log(res.json());
  })
  .then(body => {
    console.log(body);
  });
