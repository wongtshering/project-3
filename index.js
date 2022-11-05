const express =  require('express')
//const path = require('path')
const app = express()
const port = 3000
const pool = require("./database");

app.use(express.json())

app.get('/todos', async(req,res)=>{
    try{
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch(err){
        console.error(err.message);
    }
});

app.get("/todos/:id", async(req,res)=>{
const {id} = req.params;
try{
    const todo = await pool.query('SELECT * FROM todo',[id]);
    res.json(todo.rows[0]);
} catch(err){
    console.error(err.message);
}
});

app.put('/todos/:id',async(req,res)=>{
    try{
        const{id} =req.params;
        const {description} = req.body;

        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 where todo_id= $2",
            [description,id]
        );
        res.json('Todo was Updated');
    }catch(err){
        console.error(err.message);
    }
});

app.delete('/todos/:id', async(req,res)=>{
    try{
        const {id} =req.params;
        const deleteTodo = await pool.query(
            "DELETE from todo WHERE todo_id = $1",
            [id]
        );
        res.json('Todo was successfully deleted');
    } catch(err){
        console.error(err.message);
    }
});

app.post('/todos', async(req,res)=>{
    try{
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows[0]);
    }catch(err){
    console.error(err.message);
    }
});

//app.use(express.json()) // for parsing application/json
//app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//app.use(express.static('public'))

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
  })