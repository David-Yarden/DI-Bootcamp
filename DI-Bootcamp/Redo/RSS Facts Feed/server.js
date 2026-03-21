const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Parser = require('rss-parser');
const path = require('path');

const app = express();
const parser = new Parser();

const RSS_URL = 'https://thefactfile.org/feed/';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/pages'));

async function getFeed() {
  const feed = await parser.parseURL(RSS_URL);
  return feed.items;
}

function getUniqueCategories(items) {
  const cats = new Set();
  items.forEach(item => {
    if (item.categories) {
      item.categories.forEach(c => cats.add(c));
    }
  });
  return [...cats].sort();
}

// GET / - Home: all posts
app.get('/', async (req, res) => {
  try {
    const posts = await getFeed();
    res.render('index', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching RSS feed.');
  }
});

// GET /search - Search page (no results yet)
app.get('/search', async (req, res) => {
  try {
    const items = await getFeed();
    const categories = getUniqueCategories(items);
    res.render('search', { posts: null, categories, searchType: null, query: null });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching RSS feed.');
  }
});

// POST /search/title - Filter posts by title keyword
app.post('/search/title', async (req, res) => {
  try {
    const { title } = req.body;
    const items = await getFeed();
    const categories = getUniqueCategories(items);
    const posts = items.filter(item =>
      item.title && item.title.toLowerCase().includes(title.toLowerCase())
    );
    res.render('search', { posts, categories, searchType: 'title', query: title });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching RSS feed.');
  }
});

// POST /search/category - Filter posts by category
app.post('/search/category', async (req, res) => {
  try {
    const { category } = req.body;
    const items = await getFeed();
    const categories = getUniqueCategories(items);
    const posts = items.filter(item =>
      item.categories && item.categories.some(c =>
        c.toLowerCase() === category.toLowerCase()
      )
    );
    res.render('search', { posts, categories, searchType: 'category', query: category });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching RSS feed.');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`RSS Facts Feed server running at http://localhost:${PORT}`);
});
