const path = require("path");
const express = require("express");
// const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
// const routes = require("./controllers");
const app = express();

// const hbs = exphbs.create({});
// const model = require("./models");
// app.engine("handlebars", hbs.engine);
// app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3003;

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log('"Now listening on PORT # http://localhost:3003"')
  );
});
