import React from "react";
import data from "./data.json";

class Example2 extends React.Component {
  render() {
    return (
      <div>
        <h2>Example 2: Skills</h2>

        {data.Skills.map((item, index) => (
          <div key={index}>
            <h3>{item.Area}</h3>

            {item.SkillSet.map((skill, i) => (
              <div key={i}>
                {skill.Name} {skill.Hot ? "🔥" : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Example2;
