const cityRoutes = require("./city");
const path = require('path');

const constructorMethod = (app) => {
    app.use("/city", cityRoutes);

    app.use("*", (req, res) => {
        let route = path.resolve(`static/about.html`);
        res.sendFile(route);
        // res.sendStatus(404);
    });
};

module.exports = constructorMethod;