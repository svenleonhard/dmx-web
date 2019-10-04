const dmxus = require("dmxus");
const { Utils } = require('./Utils');

class DMXService {
  constructor() {
    this.fixture = {
      description: "Test device",
      parameters: ["red", "green", "blue"]
    };
    this.dmx = new dmxus("enttec-dmx-usb-pro", "COM5");

    this.dmx.patchFixture(1, this.fixture);
    this.dmx.addFixtureToGroup("group", 1);
    this.parameters = {};

    this.serviceLoop();
  }

  serviceLoop(){
    setInterval(() => {
        this.dmx.updateAllFixtures(this.parameters);
      }, 250);
  }

  updateParamterList(channel) {
    this.parameters[channel.name] = channel.value;
    return this.parameters;
  }

  generateRandomValues() {
    const red = Utils.getRandomInt(256);
    const green = Utils.getRandomInt(256);
    const blue = Utils.getRandomInt(256);

    this.parameters = {
      red: red,
      green: green,
      blue: blue
    };

    const channels = [
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
      { name: "blue", value: blue, id: 3 }
    ];

    return channels;
  }



}
module.exports.DMXService = DMXService;
