const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let tasks = [];
let works = [];

app.get("/", function (req, res) {
    let day = date.getdate();
    res.render("index", {
        kindOfDay: day,
        newItems: tasks,
        listType: "default"
    });
});

app.post("/", function (req, res) {
    const item = req.body.newItem;

    if (req.body.button === 'Worklist') {
        works.push(item);
        res.redirect("/work");
    } else {
        tasks.push(item);
        res.redirect("/");
    }
});

app.post("/delete", function (req, res) {
    const listType = req.body.listType; // Determine which list to delete from
    const taskIndex = parseInt(req.body.taskIndex); // Get the task index

    if (listType === "Worklist") {
        works.splice(taskIndex, 1); // Delete from works array
        res.redirect("/work");
    } else {
        tasks.splice(taskIndex, 1); // Delete from tasks array
        res.redirect("/");
    }
});

app.get("/work", function (req, res) {
    res.render("index", {
        kindOfDay: "Worklist",
        newItems: works,
        listType: "Worklist"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});