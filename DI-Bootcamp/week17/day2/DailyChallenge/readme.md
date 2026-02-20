
Daily challenge #1 : Data and Server

Last Updated: October 10th, 2025

What You will learn :

    Express Server
    React Form


Instructions :

You will send data to an Express server with React and display it.
Part I

    Create a server folder, containing a server.js file. Create a GET request to the /api/hello route that sends the message “Hello From Express”.

    Create a React App in a client folder. In the App.js file, use the componentDidMount() method and async await to fetch the message from the /api/hello route, and display it as a header.


Part II

    In the App.js file create a form. You will type something in the input field and submit the form. Use async await to POST the input value to the Express server.

    In the server.js file, create a POST request, that will call the /api/world route. This request will retrieve the body and respond with a message “I received your POST request. This is what you sent me: <value of the input field>“

    The message will also be displayed right below the input field:
    gif

    You will also see the message that you sent from the client, using a console.log on the request body in the POST Express route:


Submit your Daily Challenge :

Don’t forget to push to Github

One Last Thing: Good luck!

