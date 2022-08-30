import express from "express";
import mongoose from "mongoose";
import Todo from "./models/todos.js";

const app = express();
app.use(express.json());
mongoose
  .connect(
    `mongodb+srv://admin:JqhGmjPMdSbrDVRO@interviewcluster.p1fya.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => res.send("Welcome to TODOS APP"));

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json(todos);
  } catch (error) {
    res.send(error);
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) res.status(404).json({ message: "Todo not found" });

    res.status(200).json(todo);
  } catch (error) {
    res.send(error);
  }
});

app.post("/todos", async (req, res) => {
  try {
    const todo = new Todo({ title: req.body.title });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.send(error);
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const foundTodo = await Todo.findById(req.params.id);
    if (!foundTodo) res.status(404).json({ message: "Todo not found" });
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: { title: req.body.title },
      },
      { new: true }
    );
    res.status(200).json(todo);
  } catch (error) {
    res.send(error);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) res.status(404).json({ message: "Todo not found" });
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Todo Deleted" });
  } catch (error) {
    res.send(error);
  }
});

app.use((err, req, res, nxt) => {
  res.status(500).json({ message: "Server Error", error: err.message });
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log("Server is listening", PORT));
