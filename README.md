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

6- Refresh token: I have modified the refreshToken code a little bit and now it is working as required, changed the token to be fetched from the request headers, tested it with postman and all is working find.

<<<<<<<<>>>>>>>>

## my .env data

PORT=8000
DB_USER=postgres
DB_NAME=technicdb
DB_PASS=12345moha

#JWT Key
JWT_SECRET=my-32-character-ultra-secure-and-ultra-long-secret
JWT_EXPIRATION_MS=300000

#RefreshToken Key
JWT_REFRESH_SECRET=my-32-refresh-ultra-secure-and-ultra-long-secret
JWT_REFRESH_EXPIRATION_MS=86400000

##
