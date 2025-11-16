import React from "react";
import data from "./data.json";

class Example3 extends React.Component {
  render() {
    return (
      <div>
        <h2>Example 3: Experiences</h2>

        {data.Experiences.map((exp, index) => (
          <div key={index}>
            <h3>{exp.companyName}</h3>
            <img src={exp.logo} alt="logo" width="80" />
            <p>
              <a href={exp.url} target="_blank" rel="noreferrer">
                Company Website
              </a>
            </p>

            {exp.roles.map((role, i) => (
              <div key={i}>
                <h4>{role.title}</h4>
                <p>{role.description}</p>
                <p>{role.startDate} → {role.endDate}</p>
                <p>{role.location}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Example3;
