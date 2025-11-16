import React, { Fragment } from 'react'

const User = ({ a = 3, name, b, email }) => {
    console.log(b);
    // const {a, name} = props
    if (a === 1) {
        return (
            
                <><h2>
            User {"2" + "1"}{a}{name}{" "}
            <button onClick={() => b("hello")}>Click Me</button>
          </h2><h2>Warp me</h2></>
            
        );
    }

    return null;
};

export default User;