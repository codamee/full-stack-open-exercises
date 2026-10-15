# Exercise 0.5: Single page app diagram

1. **Opening the page:** 
   -  type the URL into the browser. 
   - The browser sends a `GET` request to the server for `https://studies.cs.helsinki.fi/exampleapp/spa`.
   - The server sends back the main HTML document.

2. **Loading styles and scripts:**
   - The browser reads the HTML and asks the server for the stylesheet and JavaScript files:
     - `GET` request for `main.css` (gets the style file).
     - `GET` request for `spa.js` (gets the JavaScript logic file).

3. **Fetching the actual notes:**
   - The JavaScript code inside `spa.js` immediately sends another request to get the notes data:
     - `GET` request for `data.json`.
   - The server replies with a JSON file containing all the existing notes.

4. **Drawing the notes:**
   - The browser runs the JavaScript code, which takes that JSON data and renders the notes directly onto the screen.

