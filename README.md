# The Auth API

Simple Authentication and CRUD API

## 🔥 Showcase

- [Web Client Repository](https://documenter.getpostman.com/view/25042327/2s93Y3vLw1)
- [Postman Docs](https://documenter.getpostman.com/view/25042327/2s93Y3vLw1)

## ⚡ Features

- Authentication
- CRUD for Products

## 💻 Built with

- [NodeJS](https://github.com/nodejs/node) for the server side scripting
- [Express JS](https://github.com/exprjs/express) for handling HTTP requests and responses
- [JWT](https://github.com/auth0/node-jsonwebtoken) for authentication and authorization
- [Postgres](https://github.com/postgres/postgres) for DBMS
- [Sequilize CLI](https://github.com/sequelize/cli) for migration and seeding

## 🛠️ Installation Steps

1. Clone this project

```bash
git clone https://github.com/rfauzi44/theauth-api.git
```

2. Create .env file (copy and set from .env-example)

```bash
# APP
APP_PORT=3000
BASE_URL=http://localhost

# DATABASE
USER=user
HOST=localhost
DATABASE=database
PASSWORD=password
PORT=5432

# MISC
JWT_SECRETS=secret
```

3. Install dependencies

```bash
npm install
```

4. [ OPTIONAL ] Create postgres database with Sequilize

```bash
npx sequelize-cli db:create
```

5. Running Migrations

```bash
npx sequelize-cli db:migrate
```

6. Running Seeds

```bash
npx sequelize-cli db:seed:all
```

7. Start the server

```bash
npm start
```

🌟 You are all set!
<br>
🔥 Make sure also install [Web Client](https://documenter.getpostman.com/view/25042327/2s93Y3vLw1) for full stack experince
