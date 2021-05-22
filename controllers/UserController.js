const generateToken = require('../middlewares/generateToken');
const User = require('../model/User');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if(user && await user.matchPassword(password)) {
            return res.status(200).json({
                fullname: user.fullname,
                username: user.username,
                phone: user.phone,
                token: generateToken(user._id),
            })
        } 
        return res.status(400).json({
            code: 400,
            message: "Invalid Credentials"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Server Error"
        })
    }
}
const register = async (req, res) => {
    try {
        const { fullname, username, password, phone } = req.body;
        const user = await User.findOne({ username });

        if(user) {
            return res.status(400).json({
                code: 400,
                message: "Username already exist."
            })
        }

        let newUser = new User({
            fullname,
            username,
            password,
            phone
        })

        const created = await newUser.save();
        if(created) {
            return res.status(200).json({
                fullname: created.fullname,
                username: created.username,
                phone: created.phone,
                token: generateToken(created._id)
            })
        }

        return res.status(400).json({
            code: 400,
            message: 'Invalid Credentials'
        })
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Server Error"
        })
    }
}


module.exports = {
    login,
    register
}