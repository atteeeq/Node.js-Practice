import fs from "fs";
import path from "path";
import { program } from "commander";

program

  .name("TodoCLI")
  .description("CLI to add, print, edit, delete todos or tasks")
  .version("1.0.0");

// Program Description

const currrentDir = import.meta.dirname;

const filePath = path.join(currrentDir, "data", "todo.json");

const data = fs.readFileSync(filePath, "utf8");

const todoArr = JSON.parse(data);

// Print Command

program

  .command("print")
  .description("This Command is used to print available todos")
  .action(() => {
    todoArr.forEach((element, index) => {
      console.log(`This are your Current Todos ${index + 1} : ${element}`);
    });
  });

// Add Command

program

  .command("add")
  .argument("<newTodo>", "This argument holds a new todo")
  .action((newTodo) => {
    todoArr.push(newTodo);

    fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf8");
    console.log("Todo Added");
  });

// Edit Command

program

  .command("edit")
  .description("This Command is used to edit the existing Todos")
  .argument("<existingTodo>", "This argument contains the existing todo")
  .argument("<newTodo>", "This argument contains the new todo")
  .action((existingTodo, newTodo) => {
    const indexofOLDTodo = todoArr.indexOf(existingTodo);

    todoArr.splice(indexofOLDTodo, 1, newTodo);

    fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf8");

    console.log("Todo has been updated :", existingTodo, "→", newTodo);
  });

// Delete Command

program

  .command("delete")
  .description("This Command is used to delete existing todos ")
  .argument("<existingTodo>", "This argument contains the existing Todo")
  .action((existingTodo) => {
    const indexofOLDTodo = todoArr.indexOf(existingTodo);

    todoArr.splice(indexofOLDTodo, 1)

    fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf8");

    console.log("Todo has been successfully deleted :", existingTodo);
  });

program.parse();
