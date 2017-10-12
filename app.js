var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/gallery", (req, res) => {
  res.render("gallery");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contact", (req, res) => {
  // res.send("Email sending goes here.");
  if (req.body.company) {
    res.render("contact");
    return;
  }

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: 'archbetaapts@gmail.com',
      pass: 'Archbeta!1'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let HelperOptions = {
    from: req.body.email,
    to: 'david.a.neal@hotmail.com, archbeta@outlook.com',
    subject: 'Contact Form Request from ' + req.body.email,
    text: req.body.comment
  };

  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("The message was sent!");
    console.log(req.body);
    console.log(info);
    res.render("sent");
  });
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log(`Server started and listening on port ${port}.`);
});
