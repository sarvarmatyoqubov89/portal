const Router = require('express');
const { authSchema, loginSchema }  = require('./schema');
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

const authUser = asyncHandler(async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);
    try {
        const { username, password } = value;
        const user = await User.findOne({username});
        if (user && (await user.matchPassword(password))) {
            return res.status(200).json({ token: generateToken(user._id) })
        } else {
            return res.status(401).send({msg: 'Login yoki parol xato!'})
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const { error, value } = authSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            user.username = value.username,
            user.lastname = value.lastname,
            user.password = value.password,
            user.isAdmin = value.isAdmin

            const updateUser = await user.save()
            return res.status(200).json({
                _id: updateUser._id,
                username: updateUser.username,
                lastname: updateUser.lastname,
                password: updateUser.password,
                isAdmin: updateUser.isAdmin
            })
        } else {
            return res.status(404).send({msg: 'Bunday foydalanuvchi topilmadi!'})
        }
    } catch (error) {
        return res.status(500).send(error.message);
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

const deleteUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.remove()
        return res.status(200).json({msg: "Foydalanuvchi o'chirildi!"})
    } else {
        return res.status(404).send({msg: 'Bunday foydalanuvchi topilmadi!'})
    }
});


router.post('/', registration);
router.post('/login', authUser);
router.put('/:id', updateUser);
router.get('/', getUsers);
router.delete('/:id', deleteUser);

module.exports = router;