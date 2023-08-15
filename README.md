# <span style="color: yellow;">***Social Network utilizing Mongoose***</span>
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</br>

## Overview
This simple command-line application allows users to create usernames and then comment and react to comments on a small-scale social network. Users are also able to edit and delete comments, as well as "friend" and "un-friend" each other.
</br>

## Application Set-Up
1) To get started, download this repo and in your terminal, from the root folder run...</br>
• `npm i` (to install the "Node Package Module" itself)</br>
  • `npm i mongoose`</br>
  • `npm i express`</br>

2) Once the dependencies have been installed, use control-C or otherwise terminate operations and close this terminal.

3) Open a new terminal from your root directory and run `node server.js`. You should see the message <span style="color: yellow;">***"App listening on port 3001!"***</span> in your terminal.

## Application Instructions
To interact with the database, open an API client (Insomnia or similar) and enter http://localhost:3001/ followed by the end points detailed in the <span style="color: yellow;">"user-routes.js"</span> and <span style="color: yellow;">"thought-routes.js"</span> files, within the <span style="color: yellow;">"routes/api-routes" folder"</span>.</br>
  • There is no "seed data", so feel free to create new "Users" and "Thoughts" (via "POST" request to the proper endpoints).</br>
  • You may now retrieve data (send a "GET" query on) <span style="color: yellow;">**ALL**</span> "Users" or "Thoughts", via the proper endpoints.</br>
  • "Users" have the ability to "friend" other users, by sending a "POST" to the proper endpoint for such actions. "Friends" are tracked and counted. "Users" may also remove "friends", via a "DELETE" route.</br>
  • "Users" have the ability to "React" to "Thoughts", by sending a "POST" to the proper endpoint for such actions. "Reactions" to a "Thought" are tracked and counted. "Users" may also remove "Thoughts" and "Reactions", via a "DELETE" route.</br>
  <span style="color: red;">***Please note: Deleted data cannot be retrieved.***</span>

</br>

## Static Screen-Captures of the Application
![starting the app, in termial](./assets/example1.png)
##
![screen shot of searching for a specific user](./assets/example2.png)
##
![screen shot of adding a reaction](./assets/example3.png)
##
![screen shot of removing a friend](./assets/example4.png)
</br>

## Application Demo Video


</br>

## Contributors To This Application
Kevin Lewis

</br>

# <span style="color: lightgreen;">***Thank you for using this App!***</span>

</br>

## Questions? Contact the Developer on GitHub... 
KPL33
## ...or via Email
kevinsname2003@yahoo.com