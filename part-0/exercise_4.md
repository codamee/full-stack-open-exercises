# Exercise 0.4: New note diagram
1. **User Action:**
   - The user writes text into the input field and clicks the **Save** button.

2. **Form Submission (HTTP POST):**
   - **Browser -> Server:** `POST https://studies.cs.helsinki.fi/exampleapp/new_note`

3. **Server Response (Redirect):**
   - **Server -> Browser:** HTTP Status `302` (URL Redirect to `/notes`).
   - The server saves the new note to its database/memory and instructs the browser to reload the page.

4. **HTTP GET Requests:**
   - **Browser -> Server:** `GET https://studies.cs.helsinki.fi/exampleapp/notes`
     - **Server -> Browser:** HTML Document
   - **Browser -> Server:** `GET https://studies.cs.helsinki.fi/exampleapp/main.css`
     - **Server -> Browser:** `main.css` file
   - **Browser -> Server:** `GET https://studies.cs.helsinki.fi/exampleapp/main.js`
     - **Server -> Browser:** `main.js` file

5. **Fetching Data & Rendering:**
   - The browser executes `main.js`, which triggers an request to get the updated notes data.
   - **Browser -> Server:** `GET https://studies.cs.helsinki.fi/exampleapp/data.json`
    - **Server -> Browser:** Updated JSON array containing all notes.
   - The browser executes the JavaScript callback function to render the notes on the screen.