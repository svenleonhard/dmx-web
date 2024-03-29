const dmxus = require("dmxus");
const { Utils } = require("./Utils");

class DMXService {
  constructor() {
    this.fixture = {
      name: "LED Flood Panel",
      manufactor: "Stairville",
      numberOfChannels: 3,
      id: 0,
      parameters: ["red", "green", "blue"]
    };

    this.devices = [
      {
        fixture: this.fixture,
        name: "LED Flood Panel 1",
        startAddress: 1,
        id: 0,
        channels: [
          {
            name: "red",
            value: 0,
            id: 0
          },
          {
            name: "green",
            value: 0,
            id: 1
          },
          {
            name: "blue",
            value: 0,
            id: 2
          }
        ]
      },
      {
        fixture: this.fixture,
        name: "LED Flood Panel 2",
        startAddress: 4,
        id: 1,
        channels: [
          {
            name: "red",
            value: 0,
            id: 3
          },
          {
            name: "green",
            value: 0,
            id: 4
          },
          {
            name: "blue",
            value: 0,
            id: 5
          }
        ]
      }
    ];

    this.dmx = new dmxus("enttec-dmx-usb-pro", "COM5");

    this.dmx.patchFixture(this.devices[0].startAddress, Utils.makeParameterList(this.devices[0]));
    this.dmx.patchFixture(this.devices[1].startAddress, Utils.makeParameterList(this.devices[1]));
    this.dmx.addFixtureToGroup("group", this.devices[0].startAddress);
    this.dmx.addFixtureToGroup("group", this.devices[1].startAddress);
    this.parameters = {};

    this.serviceLoop();
  }

  serviceLoop() {
    setInterval(() => {
      this.dmx.updateAllFixtures(this.parameters);
    }, 250);
  }

  updateParamterList(channel) {
    this.parameters[channel.id] = channel.value;
    console.log(this.parameters);
    return this.parameters;
  }

  generateRandomValues(device) {

    console.log('BEFORE');
    console.log(device.channels);

    device.channels.forEach(channel => {
      channel.value = Utils.getRandomInt(256);
      this.updateParamterList(channel);
    });

    console.log('AFTER');
    console.log(device.channels);
    return device.channels;
  }
}
module.exports.DMXService = DMXService;
