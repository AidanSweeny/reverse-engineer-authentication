# reverse-engineer-authentication
In this program there is a lot of moving parts that connect one file to another. As most programs run through javascript and node.js, this program begins in the server.js file. In this file the necessary packages are required, such as express, and session. These packages are necessary to creating a user authentication. Express helps with the API calls, and the server management, while session will help us to remember if a user is logged in or not. After these we require the passport.js file, which is essential in figuring out the users authentication. This passport.js file creates a new local strategy, which means that it prepares for the user to input a username/email and a password. The passport searches the user database for a user that matches the username or email that was entered. If there is not an email or a password that matches the database, then it will call the callback function with an error message. If there is a user that matches, then it invokes the callback with the users data. 

After the passport is required, the database models are required. Next it configures the middleware for use. It then grabs the folders from the public folder for use. Next session is initialized so that we can save whether the user is logged in or not. It then initializes the passport as well as the session with the passport. Finally our routes are requried, and the databases are synced so that the SQL tables get initialized. The port is then opened at the designated local port. 
When the models get initialized, fs, path, and sequelize are all required. It also grabs the basename of the file, and the correct directory to use in the config.json file. Next the file initializes a new Sequelize constructor with the information that was created in the config.json. Next the file goes through the different files in the directory, and runs them, but not if the file starts with a ., or has the name of this file. For every file in the directory that don't meet these requirements, it saves them to an object with their name, and the imported files. Next it creates associations between databases where necessary. lastly it exports the database with the sequelize objects. 

The user.js file that gets initialized in the index.js file creates the SQL table. It first requires a password hashing technology called bcrypt, and then it creates the table using sequelize. The email column must not be null, it must be unique, and these are validated. The password must just not be null. These are initizalied as shown below:
```
email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
password: {
      type: DataTypes.STRING,
      allowNull: false
    }
```
We then create a method for the user model that will check if the password can be hashed. Lastly we create an automatic method that hashes the password before it is created. 

Next up are the html routes that control where the page moves. On the base route, if there is no user logged in, it will redirect them to the signup page, but if they are logged in, then it will send them to the memebers page.  On the login page, if there is not user logged in, then it will send them to the login page. If not then they will go to the members page. The members call is shown below:
```
app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
```
The isAutheticated middleware is used to autenticate the user before sending them to the members page. In this middleware, it will check if there is a user logged in, and if not it will redirect them back to the base route, or send them to the next url. 

For the api-routes, there are post methods for the login and sign up api requests. For the login one, it simply uses a res.json to send the data as the response. For the sign up, though, it has to create a new entry in the SQL  table.  If there are no errors, then it sends the new user to the login page. There is a logout method that uses a built in method to log the user out, and then redirect to the base page.  The last request is for information on the user. If there is no user logged in, then an empty object will be returned, but if there is a user, then an object with the email and id will be returned. 

The client side requests for this project are in three files for teh login, signup, and members pages. The login and signup pages are very similar. They both take the information from the form, and if there is anything the inputs, then it creates a post request to the correct location. It then redirects to the members page after the post has been made. The only difference is that there is an error throw for the signup page that will display error messages is there are issues with the redirect. The only thing that the members client side page does is, to use a get request the member name to the email tag from the SQL table. 

This is basically all of the javascript files, and as an end result this program will be able to save users to a table, and authenticate them. Once they log in they can go to a members page. If they are not logged in it will redirect them appropriately. The final product is demonstrated below: 
![](auth.gif)