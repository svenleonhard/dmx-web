const { DMXService } = require("./DMXService");

class Controller {
  constructor() {
    this.dmxService = new DMXService();
  }

  put(req, res) {
    const channel = req.body;
    const parameters = this.dmxService.updateParamterList(channel);
    res.send(parameters);
  }

  generateRandomValues(req, res) {
    const device = req.body;
    const returnDevice = this.dmxService.generateRandomValues(device);
    res.send(returnDevice);
  }
}
module.exports.Controller = Controller;
