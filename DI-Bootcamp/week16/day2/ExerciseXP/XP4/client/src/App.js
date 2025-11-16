import React from "react";

function App() {
  const webhookUrl = "https://webhook.site/14c46e55-9caa-4ae1-9999-9f3191e2b7e9";

  const sendData = async () => {
    const body = {
      key1: "myusername",
      email: "mymail@gmail.com",
      name: "Isaac",
      lastname: "Doe",
      age: 27
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const result = await response.text();
    console.log(result);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Exercise 4</h1>
      <button onClick={sendData}>Send Data</button>
    </div>
  );
}

export default App;
