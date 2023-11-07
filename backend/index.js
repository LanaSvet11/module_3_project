const express = require("express");

const mongoose = require("mongoose");
const booksRoute = require("./routes/booksRoute.js");
const path = require("path");
const cors = require("cors");

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );
app.use((req, res, next) => {
  if (req.path.startsWith("/server")) {
    req.url = req.url.replace("/server", ""); // strip /server = the path
  }
  next();
});
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To MERN Stack Tutorial");
});

app.use("/books", booksRoute);

mongoose
  .connect(
    "mongodb+srv://svgolovatenko:efX2dsE8YSK2REyf@cluster0.kblhcwc.mongodb.net/books-collection?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("App connected to database");
    app.listen(5555, () => {
      console.log(`App is listening to port: 5555`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
