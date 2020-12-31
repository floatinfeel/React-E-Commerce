const express = require('express')
const cors = require('cors')
// const router = require('./routes/index')
const authRoute = require('./routes/authRoute')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const morgan = require('morgan')
require('dotenv').config({
    path: './config/index.env'
})

//mongodb
const connectDB = require('./config/db')
connectDB()



app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(cors())

// routes
app.use('/user/', authRoute)

app.get('/', (req, res) => {
  res.send('test route => home page')
});

// Page Not founded
app.use((req, res) => {
  res.status(404).json({
    msg: 'Page not founded',
  })
})


const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`Port running on ${port}`);
})