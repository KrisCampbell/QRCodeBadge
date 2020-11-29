import React, { useState } from "react";
import './App.css';

function App() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    twitter: "",
    gitHub: ""
  });

  const handleInput = event => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [event]: value }));
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    console.log(values.name);
    console.log(values.email);
    console.log(values.twitter);
    console.log(values.gitHub);
  }

  const onCancel = () => {
    setValues({
      name: "", email: "", twitter: "", gitHub: ""
    });
  }

  return (
    <div className="App">
      <h2>QRCode Badge Generator: Kris Campbell</h2>
      <div className="InputField">
        <form onSubmit={onSubmit}>
          <input type="text" onChange={handleInput('name')} placeholder="*Name (First and Last)" value={values.name} pattern="^[a-zA-Z,.'-]+ [a-zA-Z,.'-]+$" required />
          <input type="email" onChange={handleInput('email')} placeholder="*Email" value={values.email} required />
          <input type="text" onChange={handleInput('twitter')} placeholder="Twitter (@twitterHandle)" pattern="^@[a-zA-Z0-9]+$" value={values.twitter} />
          <input type="text" onChange={handleInput('gitHub')} placeholder="GitHub" value={values.gitHub} /><br></br>
          <button className="button button1" type="submit">Create</button>
          <button className="button button2" type="button" onClick={onCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default App;
