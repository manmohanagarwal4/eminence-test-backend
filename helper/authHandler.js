const jwt = require("jsonwebtoken");
const { userModel } = require("../modules/user/model/userModel");

const jwtVerify = async (req, res, next) => {
    if (
        req.headers.authkey == "null" ||
        req.headers.authkey == "" ||
        req.headers.authkey == "undefined" ||
        req.headers.authkey == null ||
        req.headers.authkey == undefined
    ) {
        return res.status(401).json({
            meta: { msg: "Unauthorized Access", status: false }
        });
    }
    jwt.verify(req.headers.authkey, 'testSecretKey', async function (err, decoded) {
        if (err) {
            return res.status(401).json({
                meta: { msg: "Unauthorized Access", status: false }
            });
        } else {
            await userModel.findOne({ _id: decoded._id }).then(result => {
                if (!result || result.isLogin == false) {
                    return res.status(401).json({
                        meta: {
                            msg: "Unauthorized Access",
                            status: false,
                            action: "logOut"
                        }
                    });
                }
                req.decoded = decoded;
                req.userData = result;
                next();
            });
        }
    });
};


module.exports = { jwtVerify };