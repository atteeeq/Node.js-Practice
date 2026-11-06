import express from "express";

const app = express();
app.use(express.json());

// In-memory data store
let todoArr = ["Go to School", "GO to TDC"];

// ------- /todo route ------- //

// 1. GET handler (CRUD: Read)
app.get("/todo", (req, res) => {
    console.log("GET Request received on /todo route...");
    res.json({ todos: todoArr });
});

// 2. POST handler (CRUD: Create)
app.post("/todo", (req, res) => {
    console.log("POST request received on /todo route...");
    const { newTodo } = req.body;
    
    if (!newTodo) {
        return res.status(400).json({ error: "newTodo field is required" });
    }
    
    todoArr.push(newTodo);
    res.status(201).json({ msg: "New Todo Added Successfully" });
});

// 3. PUT handler (CRUD: Update)
app.put("/todo", (req, res) => {
    console.log("PUT request received on /todo route...");
    const { old_todo, new_todo } = req.body;
    
    const targetElementIndex = todoArr.indexOf(old_todo);
    
    // Fixes the bug where a missing item accidentally deletes/updates the last item
    if (targetElementIndex === -1) {
        return res.status(404).json({ error: "Todo item not found" });
    }
    
    todoArr.splice(targetElementIndex, 1, new_todo);
    res.json({ msg: "Todo updated successfully..." });
});

// 4. DELETE handler (CRUD: Delete)
app.delete("/todo", (req, res) => {
    console.log("DELETE request received on /todo route...");
    const { target_todo } = req.body;
    
    const targetElementIndex = todoArr.indexOf(target_todo);
    
    // Fixes the bug where a missing item accidentally deletes the last item
    if (targetElementIndex === -1) {
        return res.status(404).json({ error: "Todo item not found" });
    }
    
    todoArr.splice(targetElementIndex, 1);
    res.json({ msg: "Todo Deleted Successfully..." });
});

app.listen(8080, () => {
    console.log("Server is Listening on PORT : 8080");
});
