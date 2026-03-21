import React, { Component } from 'react';
import profileData from '../data/profile.json';

class Example2 extends Component {
  render() {
    return (
      <div>
        {profileData.Skills.map((skill, index) => (
          <div key={index}>
            <strong>{skill.name}</strong>
            <ul>
              {skill.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default Example2;
