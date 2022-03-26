const Router = require('express');
const { authSchema }  = require('./schema');
const User = require('../../models/userModels');
const asyncHandler = require('express-async-handler');
const generateToken = require('../../utils/generateToken');
const bcrypt = require('bcrypt');
const router = new Router();

const registration = asyncHandler(async (req, res) => {
    
    const { error, value } = authSchema.validate(req.body);    
    if (error) return res.status(400).send(error.message);

    try {
        let {username, lastname, password, isAdmin} = value
        const userExists = await User.findOne({username});
        if (userExists) return res.status(400).send({msg:'Bunday foydalanuvchi mavjud!'});
        password = bcrypt.hashSync(password, 5);        
        const user = await User.create({ username, lastname, password, isAdmin });        
        return res.status(200).json({
                _id: user._id,
                username: user.username,
                lastname: user.lastname,
                isAdmin: user.isAdmin,
                token: generateToken(user._id, user.isAdmin)
        });
        
    } catch (err) {
        res.status(500).send(err.message);
    }
});



const getUsers = asyncHandler (async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users)
    } catch (err) {
        return res.status(500).send({msg: 'Internal Server Error'});
    }
});



router.post('/', registration);
router.get('/', getUsers);

module.exports = router;