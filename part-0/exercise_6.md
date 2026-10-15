# Exercise 0.6: New note in Single page app diagram

When clicked on the **Save** button,the control goes like,

1. **Typing and clicking save:**
   -  write note in the text box and click the **Save** button.

2. **JavaScript takes control:**
   - The JavaScript code running in the browser intercepts our click. It creates a new note object,and adds it to the list , and immediately displays it on the screen so we see it instantly without any page refresh.

3. **Sending the note to the server in the background:**
   - At the exact same time, the browser sends your new note to the server 
     - `POST` request to `https://studies.cs.helsinki.fi/exampleapp/new_note_spa` with the note data in JSON format.

4. **Server response:**
   - The server receives the data, saves the new note, and responds with a status code (like `201 Created`). 
   - Because it's an SPA, the server doesn't need to send a redirect or a new page—everything is already updated on your screen.