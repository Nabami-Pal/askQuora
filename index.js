const express = require("express");
const app = express();
const path= require("path");
const { v4:uuid4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.set("view Engine","ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {
        id: uuid4(),
        username: "ApnaCollege",
        content: "Coding loves me I cant't avoid"
    },
    {
        id: uuid4(),
        username: "HamaraCollege",
        content: "Coding loves me I cant't avoid. Why Cant't avoid?"
    },
    {
        id: uuid4(),
        username: "SabkaCollege",
        content: "Coding loves me I cant't avoid"
    },
    {
        id: uuid4(),
        username: "SabkaApnaCollege",
        content: "Coding loves me I cant't avoid. Why Cant't avoid?"
    }
];

// Route
app.get("/", (req,res)=>{
    res.send("serving working well! You are now at root..............");
});

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})

app.get("/posts/new", (req, res) => {
    res.render("newPost.ejs");
})

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuid4();
    posts.push({ id, username, content });
    res.redirect("/posts");
    console.log("Post done sucessfully ...........");
})

// Route to view in details by id
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
    console.log(post);
})


// Route for patch -> update into the array
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent  = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
    console.log(post);
})

// Route for edit
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
})

// Destroy route -> Delete route
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id)
    res.redirect('/posts');
})


const port= 8000;
app.listen(port,()=>{
    console.log(`Server is running successfully: ${port}`);
})