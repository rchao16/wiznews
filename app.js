const express = require("express");
const morgan = require('morgan');
const postBank = require('./postBank')
const app = express();


app.use(morgan('dev'));

app.get("/", (req, res) => {
    let posts = postBank.list();
      let html = `<html>
        <ul>
      ${posts.map(post => `<li>${post.title} by ${post.name}</li>`).join('')}
        </ul>
      </html>`;

      res.send(html);
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
