const jwt = require('jsonwebtoken');


//<-------------------------------------< Authentication >------------------------------------->//
const authentication = function (req, res, next) {
    try {
        let bearerHeader = req.headers.authorization;

        if (typeof bearerHeader == "undefined") return res.status(400).send({ status: false, message: "Token is missing, please enter a token" });

        let bearerToken = bearerHeader.split(' ');

        let token = bearerToken[1];

        jwt.verify(token, "project-5-Products_Management", function (err, data) {
            if (err) {
                return res.status(401).send({ status: false, message: "Unauthenticate User or Token is invalid" })
            }
           else {
                req.decodedToken = data;
                next()
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

//<------------------------------< Exports : router >----------------------------------------->//
module.exports = { authentication }