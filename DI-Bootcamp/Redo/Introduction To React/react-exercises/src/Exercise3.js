import React, { Component } from 'react';
import './Exercise.css';

const style_header = {
  color: "white",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial"
};

class Exercise extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        {/* Part I: red text, lightblue background — then overridden by Part II style_header */}
        <h1 style={style_header}>This is a Header</h1>

        {/* Part III: paragraph with .para class from Exercise.css */}
        <p className="para">This is a Paragraph</p>

        <a href="https://www.example.com">This is a Link</a>

        <div>
          <h2>This is a Form:</h2>
          <form>
            <label>Enter your name: </label>
            <input type="text" />
            <button type="submit">Submit</button>
          </form>
        </div>

        <div>
          <h2>Here is an Image:</h2>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
            alt="React logo"
            width="400"
          />
        </div>

        <div>
          <h2>This is a List:</h2>
          <ul style={{ listStyle: 'disc', display: 'inline-block', textAlign: 'left' }}>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Exercise;
