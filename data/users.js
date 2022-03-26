const bcrypt = require('bcrypt');

const users = [
    {
        username: 'Dildora',
        lastname: 'Kazakova',
        password: bcrypt.hashSync('12345', 5),
        isAdmin: true
    },
    {
        username: 'Sarvar',
        lastname: 'Matyoqubov',
        password: bcrypt.hashSync('12345', 5),
        isAdmin: true
    },
    {
        username: 'John',
        lastname: 'Black',
        password: bcrypt.hashSync('12345', 5),
    },
]

module.exports = users;