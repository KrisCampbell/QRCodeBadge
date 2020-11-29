import React, { useState } from "react";
import './App.css';
import qrcode from "qrcode-generator";

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

    var typeNumber = 6;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    var fullString = "Name: " + values.name + "\nEmail: " + values.email;

    // Update badge display, add twitter and github if they exist.
    var badgeDisplay = '<div class="column"><h2>Name: ' + values.name + '</h2><h2>Email: ' + values.email + '</h2>';

    if (values.twitter !== "") { 
      badgeDisplay+= '<h2>Twitter: ' + values.twitter + '</h2>';
      fullString += "\nTwitter: " + values.twitter;
    }
    if (values.gitHub !== "") { 
      badgeDisplay+= '<h2>GitHub: ' + values.gitHub + '</h2>';
      fullString += "\nGitHub: " + values.gitHub;
    }

    badgeDisplay += '</div>';

    qr.addData(fullString);
    qr.make();

    document.getElementById('BadgeContainer_placeHolder').innerHTML = badgeDisplay + '<div class="column">' + qr.createImgTag(5) + '</div>';
  }

  const onCancel = () => {
    setValues({
      name: "", email: "", twitter: "", gitHub: ""
    });

    document.getElementById('BadgeContainer_placeHolder').innerHTML = null;
  }

  return (
    <div className="App">
      <h1>QRCode Badge Generator: Kris Campbell</h1>
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
      <div className="BadgeContainer row" id="BadgeContainer_placeHolder"></div>
    </div>
  );
}

export default App;
