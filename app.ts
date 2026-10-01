import express from "express"

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post("/", (req, res) => {
    res.status(201).json({
        id: 1
    })
})
app.post("/login", (req, res) => {

    if (!req.body.email) {
        res.status(401).json({
            erro: "Email é obrigatório"
        })
    } else {
        res.status(201).json({
            item: req.body
        })
    }
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})