var express = require("express");
var app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("landing");
})

app.listen(3000, () => {
  console.log(`Server started and listening on port ${port}.`);
});
