# CBC News Scraper

### This is a web app that lets users view, save, leave comments on the latest scraped CBC news.

![CBC News Scraper App](public/images/cbcnews.jpg)

### Technology Stack: Express, Mongoose, Cheerio, Axios, MongoDB, Morgan, HTML, CSS, Bootstrap, Node.js, JavaScript, jQuery, Heroku

---

### How It Works

- Go to the app's home page at https://checkmynewsscraper.herokuapp.com/, initially it will have no scraped articles.
- Whenever a user clicks the 'Scrape New Articles' button, the app will scrape top stories from CBC news and display them on the home page. Each scraped article will be saved to mongoDB.
- Users can view the full story by clicking on the newslink. They can also save the article to his/her favorites.
- Under 'Saved Articles', users can choose to add in comments/notes for a particular news or delete the entire article. The comments will be saved to the database, and associated with their articles. All stored comments will be visible to every user.

---
