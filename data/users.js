const bcrypt = require('bcrypt');

const users = [
    {
        name: 'Dildora',
        lastName: 'Kazakova',
        password: bcrypt.hashSync('12345', 5),
        isAdmin: true
    },
    {
        name: 'Sarvar',
        lastName: 'Matyoqubov',
        password: bcrypt.hashSync('12345', 5)
    },
    {
        name: 'John',
        lastName: 'Black',
        password: bcrypt.hashSync('12345', 5),
    },
]

module.exports = users;