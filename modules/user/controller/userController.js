const { Types } = require("mongoose");
const { userModel } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var axios = require('axios');

const register = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.json({
                meta: { msg: "Field are missing.", status: false }
            });
        }
        const findUser = await userModel.findOne({ userName: userName });
        if (findUser) {
            return res.json({
                meta: { msg: "User already exist.", status: false }
            });
        } else {
            const hashedPassword = await bcryptfun(password);
            console.log(hashedPassword)
            let metaData = {
                'userName': userName,
                'password': hashedPassword
            }
            const userCreated = await userModel.create(metaData);
            if (userCreated) {
                return res.json({
                    meta: { msg: "User Register Successfully.", status: true },
                    data: userCreated
                });
            } else {
                return res.json({
                    meta: { msg: "Something went wrong.", status: false }
                });
            }
        }
    } catch (error) {
        return res.json({
            meta: { msg: error.message, status: false },
        });
    }
}

const userLogin = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.json({
                meta: { msg: "Parameter missing.", status: false }
            });
        }
        const findUser = await userModel.findOne({ userName: userName });
        if (!findUser) {
            return res.json({
                meta: { msg: "User does not exist with this user name. please register", status: false },
            });
        } else {
            let comparePass = await bcrypt.compare(password, findUser.password);
            if (!comparePass) {
                return res.json({
                    meta: { msg: "Incorrect user name or password", status: false },
                    isPasswordCorrect: false
                });
            }
            else {
                await findUser.updateOne({ $set: { 'isLogin': true } });
                const token = await jwtToken({ _id: findUser._id });
                return res.json({
                    meta: { msg: "Login successfull.", status: true },
                    data: findUser,
                    token
                });
            }
        }
    } catch (error) {
        return res.json({
            meta: { msg: error.message, status: false },
        });
    }
};

const logoutUser = async function (req, res) {
    try {
        const { _id } = req.decoded;
        const logOutUser = await userModel.findOneAndUpdate(
            { _id: _id },
            { $set: { isLogin: false } }
        );
        if (logOutUser) {
            return res.json({
                meta: { msg: "User logout successfully", status: true },
            });
        } else {
            return res.json({
                meta: { msg: "Something went wrong.", status: false },
            });
        }
    } catch (error) {
        return res.json({
            meta: { msg: error.message, status: false },
        });
    }
};

const productList = async function (req, res) {
    try {
        var axiosConfig = {
            method: 'get',
            url: 'https://dummyjson.com/products',
            headers: {}
        };

        return axios(axiosConfig)
            .then(function (response) {
                return res.json({
                    meta: { msg: "Product List Found.", status: true },
                    data: response.data
                });
            })
            .catch(function (error) {
                return res.json({
                    meta: { msg: error, status: false },
                });
            });
    } catch (error) {
        return res.json({
            meta: { msg: error.message, status: false },
        });
    }
};

const bcryptfun = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const jwtToken = async function (body) {
    const token = jwt.sign(body, 'testSecretKey', { expiresIn: "1y" });
    return token;
};

module.exports = {
    register,
    userLogin,
    logoutUser,
    productList
};