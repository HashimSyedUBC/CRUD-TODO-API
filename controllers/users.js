//Impot
import { v4 as uuidv4 } from "uuid";

//Implementation of all controllers/Helpers for the api

//todos and users are initialized as lists to serve as pseudo databases
let todos = [];
let users = [];

//REQUIRES: Request and response objects from the server
//MODIFIES: todos and users
//EFFECTS: Takes the the necessary information from the body of the request and updates the user database and todo database as required,
//         uploads the message of todo being added successfully
export const newLog = (req, res) => {
    const todoId = uuidv4();
    const{username, password} = req.body;
    createUser(username, password, todoId, res);
    
    const{todoName, status, category} = req.body;
    createnewTodo(todoName, status, category, todoId);
    
    res.send(`Todo with the name ${todoName} added to the database!`)
}


//REQUIRES: A username, password, todoId, res
//MODIFIES: users
//EFFECTS: Checks whether if a user with the username already exists, if so, then adds the todo id to belong to them, 
//         otherwise creates a new user and adds it to users database, outputs message if new user was added.
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

//REQUIRES: A todo name, status, category and todo id
//MODIFIES: todos
//EFFECTS: Creates a new todo with the given parameters and adds to todos database
function createnewTodo(todoName, status, category, todoId) {
    let todo = {
        "todoName" : todoName,
        "status" : status,
        "category" : category,
        "id" : todoId
    }
    todos.push(todo);
}

//REQUIRES: Request and response objects from the server
//MODIFIES: none
//EFFECTS: outputs the correct todo given the todo id
//ASSUME: User has already been logged in and therefore, no need for authentication
export const getTodo = (req, res) => {
    const {id} = req.params;

    const foundTodo = todos.find((todo) => todo.id == id);

    res.send(foundTodo);
}

//REQUIRES: Request and response objects from the server
//MODIFIES: todos, user, users
//EFFECTS: Takes the username and password from the body of request, if the user owns the todo then executes filterUsersAndTodos
//         Otherwise outputs respective error messages
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


//REQUIRES: user who owns the todo item, id of the todo item
//MODIFIES: todos, user
//EFFECTS: Deletes the todo and deletes the todo id from the owners list of todos.
function filterUsersAndTodos(foundUser, id) {
    todos = todos.filter((todo) => todo.id != id);
    foundUser.ids = foundUser.ids.filter((id) => id != id);
}

//REQUIRES: Request and response objects from the server
//MODIFIES: A specific todo
//EFFECTS: Finds the todo with the given id and modifies as required if the user owns the todo, otherwise outputs respective error messages
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

//REQUIRES: todo, todoName, status and category
//MODIFIES: todo
//EFFECTS: Changes the todo based on parameters
function changeTodo(todo, todoName, status, category) {
    if (todoName) todo.todoName = todoName;
    if (status) todo.status = status;
    if (category) todo.category = category;
}

//REQUIRES: Request and response objects from the server
//MODIFIES: None
//EFFECTS: Uploads all the todos, if the user is part of the user database, otherwise denies access and outputs respective errors
//         Uses helper functions to filter out todos, if filter categroy and filter status parameters are passed in the request body
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

//REQUIRES: Response object from the server, category filters, status filters
//MODIFIES: none
//EFFECTS: filters the todos respective to filter parameters passed in, then outputs it to api
function filterSend(res, filterCat, filterStat) {
    let push = todos;
    push = filterList(filterCat, push);
    push = filterList(filterStat, push);
    res.send(push);
}

//REQUIRES: toBefilter => parameter that determines premises of what needs to be filtered
//MODIFIES: push
//EFFECTS: returns the list to be pushed after it filters it based on the toBeFilter parameter
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
    return push;
}