const express = require("express");
const morgan = require('morgan');
const postBank = require('./postBank');
const staticMiddleware = express.static('./public');
const app = express();


app.use(morgan('dev'));

app.use(staticMiddleware);

app.get("/", (req, res) => {
    let posts = postBank.list();
      let html = `<!DOCTYPE html>
      <html>
      <head>
        <title>Wizard News</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div class="news-list">
          <header><img src="/logo.png"/>Wizard News</header>
          ${posts.map(post => `
            <div class='news-item'>
              <p>
                <span class="news-position">${post.id}. ▲</span>${post.title}
                <small>(by ${post.name})</small>
              </p>
              <small class="news-info">
                ${post.upvotes} upvotes | ${post.date}
              </small>
            </div>`
          ).join("")}
        </div>
      </body>
    </html>`;

      res.send(html);
});

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  res.send(
    `<head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <div class = 'news-item'>
      <h1>
        ${post.title} (by ${post.name})
      </h1>

      <p>
        ${post.content}
      </p>
    </div>
    `
  );
});



const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
