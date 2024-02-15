const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.get("/", (req, res)=>{
    // res.send("This is Home Page.");
    res.render("home.ejs");
})
app.get("/rollDice", (req, res)=>{
    let diceValue = Math.floor(Math.random() * 6) + 1;
    res.render("rollDice", { diceValue });
})
app.get("/ig/:username", (req, res)=>{
    let {username} = req.params;
    let followers = ["adam", "steve", "jhon", "shardha"];
    console.log(username);
    const instaData = require("./data.json")
    const data = instaData[username];
    if(data){
        res.render("instagram.ejs", {username, followers, data})
    }else{
        res.render("error")
    }
    console.log(data)
})
app.listen(port, ()=>{
    console.log(`Listening on port ${port}...`)
})

// Learn EJS :
// https://ejs.co

// <% 'Scriptlet' tag, for control-flow, no output
// <%_ ‘Whitespace Slurping’ Scriptlet tag, strips all whitespace before it
// <%= Outputs the value into the template (HTML escaped)
// <%- Outputs the unescaped value into the template
// <%# Comment tag, no execution, no output
// <%% Outputs a literal '<%'
// %> Plain ending tag
// -%> Trim-mode ('newline slurp') tag, trims following newline
// _%> ‘Whitespace Slurping’ ending tag, removes all whitespace after it