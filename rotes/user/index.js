const Router = require('express');
const { authSchema }  = require('./schema');

const router = new Router();

const registration = async (req, res) => {
    const { error, value } = authSchema.validate(req.body);    
    try {
        if (error) return res.status(400).send(error.message);
        console.log(value);
    } catch (err) {
        res.status(500).send(err.message);
    }
}






const getUsers = async (req, res) => {
    try {
        const data = await Users.getUsers();
        res.status(200).send(data)
    } catch (err) {
        return res.status(500).send({msg: 'Internal Server Error'});
    }
}



router.post('/', registration);
router.get('/', getUsers);

module.exports = router;