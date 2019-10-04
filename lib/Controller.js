const { DMXService } = require("./DMXService");

class Controller {
  constructor() {
    this.dmxService = new DMXService();
  }

  get(req, res) {
    const channels = this.dmxService.generateRandomValues();
    console.log("generated random value");
    res.send(channels);
  }

  put(req, res) {
    const channel = req.body;
    const parameters = this.dmxService.updateParamterList(channel);
    console.log(parameters);
    res.send(parameters);
  }
}
module.exports.Controller = Controller;
