
Exercises XP

Last Updated: October 10th, 2025

What we will learn

    React state
    Event handlers
    React Router
    Error Boundary
    JSON


Exercise 1 : React Router Error Boundary

Check the demo here


    In a new Javascript file, create an ErrorBoundary Class Component:
        Create a state with a property named hasError, set by default to false.
        Use a componentDidCatch() method to set the value of the hasError property.

    Install React Router Dom in your app and check out the NavLink documentation

    In the App.js file, add this line:

    import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";


    You can also install React Bootstrap in your app. In the App.js file, add this line:

    import "bootstrap/dist/css/bootstrap.min.css";


    In the App.js file, display a Bootstrap navbar, containing three React Router <NavLink></NavLink>:
        the first one redirects to /
        the second one redirects to /profile
        the third one redirects to /shop

    In the App.js file, create three functional components : HomeScreen, ProfileScreen, and ShopScreen.
        HomeScreen and will display a header tag
        home
        ProfileScreen will display a header tag
        profile
        ShopScreen will throw an error
        shop



7. Add a Route for each of the functional component. Each one has a different path.


8. Wrap each of the functional component with the ErrorBoundary component.


Exercise 2 : Display JSON Data in React JS

    Create a json file, and copy/paste this data.

    Create a component named PostList.js that displays the title and the content of each object from the json file.

    Render the PostList component in your App.js file.

    Expected output (without the grey border):
    image


Exercise 3 : Display JSON Data and parse it

    Create a json file and copy/paste this data. The file contains complex data with inner arrays up-to first and second level.

    In a new Javascript file, create a Class Component named Example1 that displays the SocialMedias array data.

    In a new Javascript file, create a Class Component named Example2 that displays the Skills data.

    In a new Javascript file, create a Class Component named Example3 that displays the Experiences array data. Add a key attribute to every new <div>.

    Import those components to the App.js file.

Expected output


Example1 Component
image


Example2 Component
image


Example3 Component
image


Exercise 4 : Post JSON Data with React JS

    Go to webhook and copy the link of “Your unique URL”.

    Remember to turn on “Enable CORS” on the webhook website.

    In the App.js file, create an async await function to fetch the json data from the URL you copied.
        Use a POST method and some headers.
        Send this hardcoded stringified json data to your body.

        key1: 'myusername',
        email: 'mymail@gmail.com',
        name: 'Isaac',
        lastname: 'Doe',
        age: 27



4. In the App.js file, create a button, that when clicked on, displays the response in the console.


Expected output in the console after the button was clicked:
image



5. Finally, open the webhook site again, and check the output in the API.


Expected output in the URL:
image