const cors = require("cors");
const { Controller } = require('./Controller');

class Server {

  constructor(app, express) {
    const controller = new Controller();
    app.use(cors());
    app.use(express.json());
    app.put("/", (req,res) => controller.put(req,res));
    app.get("/", (req,res) => controller.get(req,res));

    app.listen(3000, function() {
      console.log("Example app listening on port 3000!");
    });
  }
}
module.exports.Server = Server;