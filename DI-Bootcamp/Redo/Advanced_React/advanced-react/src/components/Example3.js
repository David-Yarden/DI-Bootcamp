import React, { Component } from 'react';
import profileData from '../data/profile.json';
import './Example3.css';

class Example3 extends Component {
  render() {
    return (
      <div>
        {profileData.Experiences.map((exp) => (
          <div key={exp.id} className="experience-card">
            <div className="exp-image">
              {exp.image ? (
                <img src={exp.image} alt={exp.company} />
              ) : (
                <div className="no-image">NO IMAGE<br />AVAILABLE</div>
              )}
            </div>
            <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer">
              {exp.company}
            </a>
            <p><strong>{exp.title}</strong></p>
            <p>{exp.startDate}{exp.location}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Example3;
