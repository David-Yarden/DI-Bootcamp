import React, { Component } from 'react';
import profileData from '../data/profile.json';

class Example1 extends Component {
  render() {
    return (
      <ul>
        {profileData.SocialMedias.map((url, index) => (
          <li key={index}>{url}</li>
        ))}
      </ul>
    );
  }
}

export default Example1;
