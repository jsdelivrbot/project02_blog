// const express = require('express')
// const PORT = process.env.PORT || 5000

// const { Client } = require('pg')

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
  
//   .use('/groupHelp', groupHelp.app)
  
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))
//   .get('/handle_get_getPerson', (req, res) => handle_get_getPerson(req, res))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))

// function handle_get_getPerson(req, res)
// {
// 	console.log('We wuz here')

//   const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: true
//   })

//   client.connect()

//   client.query('SELECT first_name, last_name FROM member WHERE id = $1', [req.query.id], (dberr, dbres) => {
//     if (dberr) throw dberr
//     for (let row of dbres.rows) {
//       res.json(row)
//       console.log(JSON.stringify(row))
//     }
//     client.end()
//   })
// }

