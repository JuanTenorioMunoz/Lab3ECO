const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json()); // utility to process JSON in requests
app.use(cors()); // utility to allow clients to make requests from other hosts or ips

const db = {
  players: [],
};

app.get("/users", (request, response) => {
  response.send(db);
});

app.get("/user", (request, response) => {
  const userName = request.query.name; 
  const user = db.players.find(player => player.name === userName);

  if (user) {
    response.status(200).json(user);
  } else {
    response.status(404).send("User not found"); 
  }
});

app.post("/user", (request, response) => {
  const { body } = request;
  db.players.push(body);
  response.status(201).send(body); 
});

app.patch("/user", (req, res) => {
  const userName = req.query.name; 
  const user = db.players.find(player => player.name === userName); 

  if (user) {

    Object.assign(user, req.body); 
    res.status(200).json(user); 
  } else {
    res.status(404).send("User not found");
  }
});

app.listen(5050, () => {
  console.log(`Server is running on http://localhost:5050`);
});
