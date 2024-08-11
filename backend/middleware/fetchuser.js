const jwt = require('jsonwebtoken');
const JWT_TOKEN = "thisisjwttokenusedtoidentifytheuser";
const fetchuser = (req, res, next) => {
    try {
        //the authentication token generated in login/signup is used in auth-token of req-header
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).send({ Error: "Please enter a valid token " })
        }
        const data = jwt.verify(token, JWT_TOKEN);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ Error: "Please enter a valid token " })
    }

}
module.exports = fetchuser; 