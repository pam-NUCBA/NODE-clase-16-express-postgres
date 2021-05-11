const express = require("express");

const app = express();
const PORT = 8000;
const tasksRouter = require('./routes/tasks')

app.use(express.json());

//routes
app.get("/", (req, res) => {
    res.send("home");
});

//routes middleware:
app.use('/tasks', tasksRouter)

app.listen(PORT, () =>
    console.log(`server running on http://localhost:${PORT}`)
);