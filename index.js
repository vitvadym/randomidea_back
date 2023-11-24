const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config()

const app = express();
const PORT = process.env.PORT || 8080;
const URI = process.env.MONGO_URI;

const ideaRoute = require('./routes/ideaRoute');


app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(cors());

app.use('/api/ideas', ideaRoute);

const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to DB');
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (error) {
    console.log(error.message);
  }
};

start();