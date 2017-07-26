<h1>MyReads: A Book Tracking App</h1>

<p>This is a bookshelf app that allows you to select and organize books you have read, are currently reading, or want to read. The project is written in React to build this application.</p>

<h3>Dependencies</h3>

<p>Please refer to package.json file.</p>

<h3>To run it locally</h3>
<ol>
<li>Clone or download this repository</li>
<li>Make sure node.js is installed on your terminal.</li>
<li>run npm install.</li>
<li>run npm start.</li>
<li>Access it at http://localhost:3000/search to view the app.</li>
</ol>

<h3>App Functionality</h3>
<p>In this application, the main page displays a list of "shelves" (i.e. categories), each of which contains a number of books. The three shelves are:</p>
<ul>
 <li>Currently Reading</li>
 <li>Want to Read.</li>
 <li>Read.</li>
</ul>

<p>Each book has a control that lets you select the shelf for that book. When you select a different shelf, the book moves there. Note that the default value for the control should always be the current shelf the book is in.

The main page also has a link to /search, a search page that allows you to find books to add to your library.</p>
