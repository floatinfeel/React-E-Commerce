const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

require('dotenv').config({
    patch: './config/index.env'
})

const port = 3001 || process.env.PORT
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(cors())

app.get('/', (req, res) => {
    res.send('test route home page')
})

app.use((req, res)=>{
    res.status(404).json({
        msg: 'Page Not Found'
    })
})

app.listen(port, ()=>{
    console.log(`Port running on ${port}`);
})