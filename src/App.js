import logo from "./logo.svg";
import { useState } from "react";

import "./App.css";
import "sanitize.css";

import { FloatingLabelInput, RaisedButton } from "./components";

function App() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleFetch = async () => {
    if (!name) return;

    const data = await fetch(`/.netlify/functions/hello?name=${name}`);
    const { message } = await data.json();
    console.log({ data });
    setMessage(message);
  };

  const handleFetchWeather = async () => {
    const data = await fetch(`/.netlify/functions/weather`);
    const json = await data.json();
    console.log({ json });
  };

  const handleChange = e => setName(e.target.value);

  return (
    <div className="App">
      <div className="section">
        <h3>{message}</h3>
        <FloatingLabelInput
          value={name}
          onChange={handleChange}
          label="Your name here"
        />
        <RaisedButton onClick={handleFetch}>Send</RaisedButton>
      </div>
      <div className="section">
        <RaisedButton onClick={handleFetchWeather}>Send</RaisedButton>
      </div>
    </div>
  );
}

export default App;
