const express = require('express');
const mongoose = require('mongoose');

// db config
const password = 'r6eSLrI0fDPbavOZ';
const user = 'admin'

const app = express();
app.use(express.json());

const alienRouter = require('./routes/aliens');

app.use('/alien', alienRouter);

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.xqi8mha.mongodb.net/Telusko?retryWrites=true&w=majority`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(9000, ()=>{
    console.log("Server is running on port 9000");
})