import { v4 as uuidv4 } from "uuid";

let todos = [];
let users = [];

export const newLog = (req, res) => {
    const todoId = uuidv4();
    const{username, password} = req.body;
    createUser(username, password, todoId, res);
    
    const{todoName, status, category} = req.body;
    createnewTodo(todoName, status, category, todoId);
    
    res.send(`Todo with the username ${todoName} added to the database!`)
}

function createUser(username, password, todoId, res) {
    const foundUserpas = users.find((user) => user.username == username && user.password == password);

    if(foundUserpas) {
        foundUserpas.ids.push(todoId);
    } else {
        let ids = [todoId];
        let newUser = {username: username, password: password, ids: ids};
        users.push(newUser);
        res.send(`User with the username ${username} added to the database!`)
    }
}

function createnewTodo(todoName, status, category, todoId) {
    let todo = {
        "todoName" : todoName,
        "status" : status,
        "category" : category,
        "id" : todoId
    }
    todos.push(todo);
}

export const getTodo = (req, res) => {
    const {id} = req.params;

    const foundTodo = todos.find((todo) => todo.id == id);

    res.send(foundTodo);
}

export const deleteTodo = (req,res) => {
    const {id} = req.params;
    const {todoName, status, category, password, username} = req.body;
    const foundUser = users.find((user) => user.username == username);
    if (foundUser && foundUser.ids.includes(id)) {
        if (foundUser.password == password) {
            filterUsersAndTodos(foundUser, id);
            res.send(`Succesfully deleted Todo with ${id}`)
        } else {
            res.send(`Etered password is incorrect!`)
        }
    } else {
            res.send(`You do not own todo with id ${id}, entered username was not associated with entered ID!`)
    }
}

function filterUsersAndTodos(foundUser, id) {
    todos = todos.filter((todo) => todo.id != id);
    foundUser.ids = foundUser.ids.filter((id) => id != id);
}

export const updateTodo = (req,res) => {
    const {id} = req.params;
    const todo = todo.find((todo) => todo.id == id);
    const {todoName, status, category, password, username} = req.body;
    const foundUser = users.find((user) => user.username == username);
    if (foundUser && foundUser.ids.includes(id)) {
        if (foundUser.password == password) {
            changeTodo(todo,todoName,status,category);
            res.send(`Todo with id ${id} has been updated!`)
        } else {
            res.send(`Entered password is incorrect!`)
        }
    } else {
            res.send(`You do not own todo with id ${id}, entered username was not found to be associated with todo id!`)
    }
}

function changeTodo(todo, todoName, status, category) {
    if (todoName) todo.todoName = todoName;
    if (status) todo.status = status;
    if (category) todo.category = category;
}

export const getTodos = (req, res) => {
    const {username, password} = req.body;
    const foundUser = users.find((user) => user.username == username);
    if (foundUser) {
        if (foundUser.password == password) {
            const {filterCat, filterStat} = req.body;
            filterSend(res, filterCat, filterStat);
        } else {
            res.send("Invalid Password")
        }
    } else {
        res.send("Invalid Username")
    }

}

function filterSend(res, filterCat, filterStat) {
    let push = todos;
    filterCategory(filterCat, push);
    filterCategory(filterStat, push);
    res.send(push);
}

function filterList(toBefilter, push) {
    if (toBefilter) {
        toBefilter.replaceAll(" ", "");
        toBefilter.replaceAll(",", "");
        if (!(toBefilter.length == 0)) {
            push = push.filter(function(todo) {
                if (todo.category) {
                    let todoCat = todo.category;
                    todoCat.replaceAll(" ", "");
                    todoCat.replaceAll(",", "");
                    let todoContains = todoCat.includes(toBefilter);
                    let toBefilterContains = toBefilter.includes(todoCat);
                    return todoContains || toBefilterContains;
                } else {
                    return true;
                }
            });
        }
    }
}