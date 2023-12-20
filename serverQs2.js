const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.get('/posts', async (req, res) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    const recentPosts = data.slice(0, 100); // Get the first 100 posts

    // Write fetched posts to a JSON file on the server
    const fileName = 'recentPosts.json';
    fs.writeFile(fileName, JSON.stringify(recentPosts), err => {
      if (err) {
        console.error('Error writing file:', err);
        res.status(500).send('Internal Server Error');
      } else {
        // Serve the JSON file as a static resource
        res.sendFile(fileName, { root: __dirname });
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


