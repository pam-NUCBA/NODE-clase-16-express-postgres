const express = require("express");
const router = express.Router();
const pool = require("../db");

//get all
router.get("/", async(req, res) => {
    try {
        const getTasks = await pool.query("SELECT * FROM tasks");
        res.json(getTasks.rows);
    } catch (error) {
        console.log(error);
    }
});

//get one
router.get("/:id", async(req, res) => {
    const { id } = req.params;
    try {
        const getOneTask = await pool.query(
            "SELECT * FROM tasks WHERE task_id = $1", [id]
        );
        res.json(getOneTask.rows);
    } catch (error) {
        console.log(error);
    }
});

//post one
router.post("/", async(req, res) => {
    try {
        //console.log(req.body);
        //*podemos pasar estos datos en postman para comprobar que llegan:
        //{  task: 'levantarse a las 8am',
        //description: 'sí, ya sé que es inhumano'
        //}

        const { task, description } = req.body;
        const newTask = await pool.query(
            "INSERT INTO tasks (task, description) VALUES ($1, $2) RETURNING *", [task, description]
        );

        //*puedo ver que grabó entrando a postgres y poniendo esto:
        //SELECT * FROM tasks;
        //*si ponemos res.json(newTask) va a traer un montón de datos. Con el rows[0] podemos ver lo que se grabó nada más.

        res.json(newTask.rows[0]);
    } catch (error) {
        console.log(error);
    }
});

//update one
router.put("/:id", async(req, res) => {
    const { id } = req.params;
    const { task, description } = req.body;

    try {
        const editOneTask = await pool.query(
            "UPDATE tasks SET (task, description) = ($1, $2) WHERE task_id = ($3)", [task, description, id]
        );
        //*si quisieramos hacer newTask.rows[0] va a venir vacío
        res.json("updated");
    } catch (error) {
        console.log(error);
    }
});

//delete one
router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteOneTask = await pool.query(
            "DELETE FROM tasks WHERE task_id = $1", [id]
        );
        res.json("deleted!");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;