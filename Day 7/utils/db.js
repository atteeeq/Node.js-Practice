import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
})

const: TodoSchema = new Schema({
    userId: ObjectId,
    todo_name: String,
    isDone: Boolean,
})

export const UserModel1 = mongoose.model("user", UserSchema);
export const TodoModel1 = mongoose.model("todo", TodoSchema);