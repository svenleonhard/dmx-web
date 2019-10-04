class Utils {

    constructor() {}

    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
}
module.exports.Utils = Utils;