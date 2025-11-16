import React from "react";
import data from "./data.json";

class Example1 extends React.Component {
  render() {
    return (
      <div>
        <h2>Example 1: Social Medias</h2>
        {data.SocialMedias.map((link, index) => (
          <div key={index}>{link}</div>
        ))}
      </div>
    );
  }
}

export default Example1;
