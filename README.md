# Breadcrumb client-server file-browser

The screening task is to write a breadcrumb client-server file-browser component in react. Write a set of react components and backend api that together, do all of the following:
- *There should be a breadcrumb showing the current location in the directory structure*
- *Each part in the breadcrumb should be separated and clickable. Clicking on a folder in the breadcrumb will take you to that folder.*
- *The main portion of the page should display the contents of the current directory, or "THIS IS FILE: {filename}" if the path is a file. Clicking on any of the files or folders in this portion of the page should take you to that file.* 
- *There should be a simple http server with a single endpoint: GET /path/{mypath} should return the data about the given path. For directories, it should only include direct children, not the full recursive subtree (otherwise it would not work on a real filesystem with millions of files).*



### Directory Structure Sample: (mypaths.txt)
- *The directory structure is below. This should only be available to the server, and not the client. The client may only access this structure via the /path call on your server. You may do any automated transformations you wish on this data structure to make it easier to work with, but the transformations should be automated (i.e.we should easily be able to replace it with another structure to test).*

`
let root = {
type: "dir",
children: {
home: {
type: "dir",
children: {
myname: {
type: "dir",
children: {
"filea.txt": {
type: "file",
},
"fileb.txt": {
type: "file",
},
"projects": {
type: "dir",
children: {
mysupersecretproject: {
type: "dir",
children: {
mysupersecretfile: {
type: "file",
},
},
}
},
},
}
},
},
}
},
};
`


## **Tools used to create this project**

This project built on top of [Create React App](https://github.com/facebook/create-react-app).

External libraries include:
- [React Router](https://www.npmjs.com/package/react-router)
- [Concurrently](https://www.npmjs.com/package/concurrently)

## **Setup**
1. git clone this repo
2. run "`npm install`" on the terminal

## **Available Script**
run "`npm run dev`" on the terminal

Starts the NodeJS HTTP server and launches the React app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

