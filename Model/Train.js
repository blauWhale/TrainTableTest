const PublicTransport = require("./PublicTransport");

class Train extends PublicTransport{
    constructor(platform) {
        super();
        this.platform = platform;
    }
}

module.exports = Train