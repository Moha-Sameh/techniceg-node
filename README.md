--> First commit

Packages used: "bcryptjs", "cookie-parser", "cors", "dotenv", "express", "express-session", "jsonwebtoken"
"passport", "passport-local", "pg", "pg-hstore", "sequelize", "sequelize-cli".

1- I used passport Authentication because it is Extremely flexible and modular.
Also it has acomprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.

2- Using sequelize nowadays is the default option for most of us "programmers" as it makes it easy to manage SQL databases.
Thus, all the code will be written in javascript (typescript).

3- jsonwebtoken used to have access to the token and limit the token time and revalidate it for every request.

4- After fnishing the setup, I have decided to remove the router.param and get the Task ID from the req.body instead of getting it in the http link.

5- I have tested all my routers with Postman now I will move on to devlope the client side then will go back to create the refresh token.

<<<<<<<<<<<<>>>>>>>>>>>>

I have proceeded to do refresh token but there is a bug, the request is made but it return undefined. that I will probably not be able to find before deadline
