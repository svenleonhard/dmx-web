class Utils {

    constructor() {}

    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

    static makeParameterList(device) {
      const parameters = [];
      device.channels.forEach(channel => {
        parameters.push(channel.id)
      });

      const parameterList = {
        parameters
      }

      return parameterList;
    }
}
module.exports.Utils = Utils;