let express = require("express");
const dmxus = require("dmxus");
let app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
const dmx = new dmxus("enttec-dmx-usb-pro", "COM5");

const fixture = {
  description: "Test device",
  parameters: ["red", "green", "blue"]
};

dmx.patchFixture(1, fixture);
dmx.addFixtureToGroup("group", 1);

let parameters = {};
let i = 0;
setInterval(() => {
  //console.log('Infinite Loop Test interval n:', i++);
  //console.log(parameters)
  dmx.updateAllFixtures(parameters);
}, 250);

console.log("app started");

app.get("/", function(req, res) {

  const red = getRandomInt(256);
  const green = getRandomInt(256);
  const blue = getRandomInt(256);

  parameters = {
    red: red,
    green: green,
    blue: blue
  };

  channels = [
    {
      name: "red",
      value: red,
      id: 1
    },
    {
      name: "green",
      value: green,
      id: 2
    },
    { name: "blue", 
      value: blue, 
      id: 3 }
  ];

  console.log("generated random value");

  res.send(channels);
});

app.put("/", function(req, res) {
  channel = req.body;
  updateParamterList(channel);
  console.log(parameters);
  res.send(parameters);
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

function updateParamterList(channel) {
  parameters[channel.name] = channel.value;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
