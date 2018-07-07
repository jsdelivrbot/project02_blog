const express = require('express')
const PORT = process.env.PORT || 5000
const groupHelp = require(' /view/groupHelp.ejs')
const { Client } = require('pg')

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/connect'))
  
  .use('/groupHelp', groupHelp)

  .get("/getPerson", getPerson);
  .get("/getComment", getComment);
  .get("/getNewItem", getNewItem);
  .get("/getFinishedItem", getFinishedItem);

  .listen(get("port"), function() {
  console.log("Now listening for connections on port: ", get("port"));
});

