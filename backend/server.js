const express = require('express')
const bodyParser = require('body-parser')


const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/api', (req, res) => {
  res.json({
    name: 'Bill',
    age: 99
  })
})

app.listen(3001, () => console.log('server started'))