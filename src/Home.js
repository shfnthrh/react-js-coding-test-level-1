import "./App.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {
  const [text, setText] = useState("");
  const [isReady, setIsReady] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value)
  }

  const handleSubmit = () => {
    if (text == 'Ready!') {
      setIsReady(true)
    }
  }



  return (
    <div className="App">
      <header className="App-header">
          <Link to="/pokedex">
            <img
              hidden={!isReady}
              src="https://www.freeiconspng.com/uploads/file-pokeball-png-0.png"
              className="App-logo"
              alt="logo"
              style={{ padding: "10px" }}
            />
          </Link>
          {!isReady &&
            <b>
              Requirement: Try to show the hidden image and make it clickable that
              goes to /pokedex when the input below is "Ready!" remember to hide the
              red text away when "Ready!" is in the textbox.
            </b>
          }
          <p style={{ color: "yellow" }}>Are you ready to be a pokemon master?</p>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={text.name} onChange={event => handleTextChange(event)} placeholder="Type 'Ready!' if you are.."/>
            <button type="submit">Submit</button>
            <br/>
            { !isReady && <span style={{ color: "red" }}>I am not ready yet!</span> }
          </form>        
      </header>
    </div>
  );
}

export default Home;
