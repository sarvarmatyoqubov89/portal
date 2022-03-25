const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const portals = require('./data/portals');
const User = require('./models/userModels');
const Portal = require('./models/portalModels');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Portal.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id
        
        const samplePortals = portals.map((portal) => {
            return { ...portal, user: adminUser }
        })
console.log(samplePortals);
        await Portal.insertMany(samplePortals)

        console.log('Data Imported');
        process.exit()
    } catch (error) {
        console.error(`${error}`);
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Portal.deleteMany()
        await User.deleteMany()
        
        console.log('Data Destroyed');
        process.exit()
    } catch (error) {
        console.error(`${error}`);
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}