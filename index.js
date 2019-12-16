const express = require("express")
const app = express()


app.get("/", (req,res) => {
    res.send("These are not the droids you're looking for")
})

const projectRoutes = require('./routes/projectRoutes')
const actionRoutes = require('./routes/actionRoutes')

app.use(express.json())



const port = process.env.PORT || 4003
const host = process.env.HOST || "0.0.0.0"


app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})

app.use('/api/projects', projectRoutes)
app.use('/api/projects/:id/actions', actionRoutes)

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: "A server error occurred." });
  });