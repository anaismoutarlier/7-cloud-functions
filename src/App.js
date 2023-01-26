import logo from "./logo.svg";
import { useState } from "react";

import "./App.css";
import "sanitize.css";

import { FloatingLabelInput, RaisedButton } from "./components";

  /**
   * 
   * @param {String} url Endpoint to call
   * @param {Function} callback Function to call with body as argument
   * @param {Object} options Fetch options (method, body, etc)
   */
  const handleFetch = async (endpoint, callback = () => {}, options = { method: "GET" }) => {
    const data = await fetch(`/.netlify/functions/${endpoint}`, options);
    const json = await data.json();
    callback(json)
  }

function App() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const onFetch = data => data.message && setErrorMessage(data.message);

  const handleWelcome = () => handleFetch(`hello`, json => setMessage(json.message));

  const handleWeather = () => handleFetch(`weather`, json => console.log(json))

  const addUser = async () => handleFetch(`mailchimp`, onFetch, { method: "POST", body: JSON.stringify({ email }) });

  const handleChange = e => setName(e.target.value);
  const handleChangeEmail = e => setEmail(e.target.value);


  return (
    <div className="App">
      <div className="section">
        <h2>Hello</h2>
        <h3>{message}</h3>
        <FloatingLabelInput
          value={name}
          onChange={handleChange}
          label="Your name here"
        />
        <RaisedButton onClick={handleWelcome}>Send</RaisedButton>
      </div>
      <div className="section">
        <h2>Weather</h2>
        <RaisedButton onClick={handleWeather}>Send</RaisedButton>
      </div>
      <div className="section">
        <h2>MailChimp</h2>
        {errorMessage}
        <FloatingLabelInput
          value={email}
          onChange={handleChangeEmail}
          label="Your name here"
        />
        <RaisedButton onClick={addUser}>Submit</RaisedButton>
      </div>
    </div>
  );
}

export default App;
