const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


const { Pool } = require("pg");
const pool = new Pool({connectionString: connectionString});



express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
   .get('/view/groupHelp', groupHelp)

  .get("/getPerson", getPerson);
  .get("/getComment", getComment);
  .get("/getNewItem", getNewItem);
  .get("/getFinishedItem", getFinishedItem);

  .get('/groupHelp', function (req, res) {
  res.render('pages/groupHelp', {

  })
})
  