# 0.1: HTML
Review the basics of HTML by reading this tutorial from Mozilla: HTML tutorial.

This exercise is not submitted to GitHub, it's enough to just read the tutorial


# 0.2: CSS
Review the basics of CSS by reading this tutorial from Mozilla: CSS tutorial.

This exercise is not submitted to GitHub, it's enough to just read the tutorial


# 0.3: HTML forms
Learn about the basics of HTML forms by reading Mozilla's tutorial Your first form.

This exercise is not submitted to GitHub, it's enough to just read the tutorial

# 0.4: New note diagram

```mermaid

sequenceDiagram
    participant browser
    participant server

    Note left of browser: User enters text in the text field
    Note left of browser: User clicks the Save button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: 302 Found
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{content: "a",date: "2023-08-16T06:30:27.067Z"} ... ]
    deactivate server

```

# 0.5: Single page app diagram
```mermaid

sequenceDiagram
     participant browser
     participant server

     browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
     activate server
     server-->>browser: HTML document
     deactivate server

     browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
     activate server
     server-->>browser: the css file
     deactivate server

     browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
     activate server
     server-->>browser: the JavaScript file
     deactivate server

     browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
     activate server
     server-->>browser: [{content: "a",date: "2023-08-16T06:30:27.067Z"} ... ]
     deactivate server

```
# 0.6: New note in Single page app diagram
```mermaid

sequenceDiagram
    participant browser
    participant server

    Note left of browser: User enters text in the text field
    Note left of browser: User clicks the Save button

   browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
   activate server
   server-->>browser: 201 Created
   deactivate server

```
