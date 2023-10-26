import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dataItem from './WebsiteScrapper/DataRouter.js'


const app = express()

dotenv.config()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', dataItem)

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})