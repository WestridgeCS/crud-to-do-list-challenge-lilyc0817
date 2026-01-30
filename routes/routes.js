import express from 'express';
import Todo from '../models/Todo.js';

const router = express.Router();

// Read All ToDos
router.get("/", async (req, res, next) => {
  try{
    const todos = await Todo.find()
    res.render("index", {todos})
  }
  catch(err){
    next(err)
  }
})

// Create a ToDo
router.post("/create", async (req, res, next) => {
  try{
    const todo = new Todo({
      text: req.body.text,
      done: false
    })
    await todo.save();
    res.redirect("/");
  }
  catch(err){
    next(err)
  }
});

// Toggle Done
router.post('/:id/toggle', async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.redirect('/');

    todo.done = !todo.done;
    await todo.save();

    res.redirect('/');
  } catch (err) {
    next(err)
  }
});

// Edit
router.post("/:id/edit", async (req, res, next) => {
  try{
    const todo = await Todo.findById(req.params.id);

    if(!todo) return res.redirect("/");

    todo.text = req.body.text;
    todo.done = false;

    await todo.save();

    res.redirect("/");
  }
  catch(err){
    next(err)
  }
});

// Delete
router.post("/:id/delete", async (req, res, next) => {
  try{
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect("/");
  }
  catch(err){
    next(err)
  }
})
export default router;