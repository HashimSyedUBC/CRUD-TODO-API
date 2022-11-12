# CRUD API 

## - TODO APPLICATION USING NODE.JS

This api is for users to  create, read, update and delete todo 
items
<br>

To view the todo items, one must be registered or have their own
todo item logged in. Todo items are available for view to every user 
in the database.
<br>

Todo items can only be updated and deleted by users who own them.
<br>
<br>

## User Stories: <br>
- As a user, I want to add my todo items <br>
- As a user, I want to view all to do items after logging in my own. <br>
- As a user, I want to change my own todo items. <br>
- As a user, I want to ensure that my items are safe, and only I can change them. <br>
- As a user, I want to delete my own todo items. <br>
#

## How to use: <br>
- The server can be launched using '%npm start' into your terminal.
- ------
![Screenshot 2022-11-12 at 12 49 44 PM](https://user-images.githubusercontent.com/112725957/201495429-de1016ef-fe75-432e-93bf-654518f6afa3.png)
-------
- Using postman, we acces the api by using the http link.
- You can then post items onto the server using the post function.
- Plase note that the fields such as username, password etc.. are case sensitive and
must be entered correctly for them to show them.
- ------
![Screenshot 2022-11-12 at 12 55 01 PM](https://user-images.githubusercontent.com/112725957/201495549-84cc8a5e-9d11-4553-b9e0-4d1607e221a8.png)
- ------
- A get request only needs the fields, username and password and
upon correctly entering those fields, the api should return all todos.
- ------
![Screenshot 2022-11-12 at 12 57 18 PM](https://user-images.githubusercontent.com/112725957/201495604-846c82a8-5101-4efe-aa14-54b9d4b16cd4.png)
- ------
- You can also enter fields for filterCat and filterStat {case sensitive},
that will perform filtering.
- ------
![Screenshot 2022-11-12 at 1 00 11 PM](https://user-images.githubusercontent.com/112725957/201495647-87ca3adf-69de-4c2f-b5c1-b2f1fdd4cade.png)
------
![Screenshot 2022-11-12 at 12 59 52 PM](https://user-images.githubusercontent.com/112725957/201495659-4893d339-8f5b-49ae-a6c2-222dcd8fe8ce.png)
- ------
- To delete a todo, copy the id of the desired todo
and paste with a forward slash at the beginning onto the search bar
in postman. Then select delete as the option and enter, the username
and password associated with the todo.
- ------
![Screenshot 2022-11-12 at 1 03 49 PM](https://user-images.githubusercontent.com/112725957/201495764-0f62fefe-00be-4301-ac9b-71102e45b04c.png)
- ------
- To update todos, once more paste the id of the todo onto the search bar
and enter in the correct username and password and the fields that you want to update.
Then select the patch option from postman.
- ------
- Before update:
-------
![Screenshot 2022-11-12 at 1 18 00 PM](https://user-images.githubusercontent.com/112725957/201495783-84df7358-2565-462d-978d-0c399d1baf03.png)
-------
- After update:
-------
![Screenshot 2022-11-12 at 1 19 00 PM](https://user-images.githubusercontent.com/112725957/201495807-54bf95aa-0631-4211-8fae-a8624bcafd1e.png)

#
