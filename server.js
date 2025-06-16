const express = require("express");
const quotes = require("./quote");
const cors = require("cors");
const app = express();
const PORT = 3001;

let savedQuote = null;
let savedDate = null;
app.use(cors());

app.get("/quote", (req, res) => {
  const getDate = new Date().toISOString().split("T")[0];
  console.log(getDate);

  if (savedDate === getDate && savedQuote) {
    return res.send(savedQuote);
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex].text;
  const randomQuoteAuthor = quotes[randomIndex].author;
  savedQuote = { pickedQuote: randomQuote, author: randomQuoteAuthor };
  savedDate = getDate;

  res.send(savedQuote);
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
