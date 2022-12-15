const express = require('express')
const cors = require('cors')


const app = express()
app.use(cors())

const message = { message: "Hello from server!" }

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server and youre cringe!" });
});

app.listen(3002, () => console.log('server started 3002'))