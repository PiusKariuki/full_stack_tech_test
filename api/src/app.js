"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const express_1 = __importDefault(require("express"));
const fs = require("fs")
const path = require("path")
const cors = require("cors")
const  bodyParser = require('body-parser')
const app = (0, express_1.default)();
const PORT = 3001;

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', (req, res, next) => {
    next()
});


/**
 * Get all users
 */
app.get('/users', (req, res, next) => {
    try {
        /**
         * get all json files in the users directory
         */
        const jsonFiles = fs.readdirSync(__dirname + '/../data/users')
        const parsedArray = []

        /**
         * Json parse each file in the array
         */
        jsonFiles.forEach(file => {
            const data = fs.readFileSync(path.join(__dirname + '/../data/users', file))
            const parsedObject = JSON.parse(data.toString())
            parsedArray.push(parsedObject)
        })

        res.status(200).json(parsedArray)
    } catch (e) {
        res.status(400).json(e.message)
    }


    next()
})

/**
 * Get user by id
 */
app.get('/users/:id', async (req, res, next) => {
    try {
        /**
         * get all json files in the users directory
         */
        const jsonFiles = fs.readdirSync(__dirname + '/../data/users')
        const parsedArray = []

        /**
         * Json parse each file in the array
         */
        await jsonFiles.forEach(file => {
            const data = fs.readFileSync(path.join(__dirname + '/../data/users', file))
            const parsedObject = JSON.parse(data.toString())
            parsedArray.push(parsedObject)
        })

        const files = parsedArray.filter(item => item.id == req.params.id)
        res.status(200).json(files[0])
    } catch (e) {
        res.status(400).json(e.message)
    }
    next()
})

/**
 * Create user
 */
app.post('/users', async (req, res, next) => {
    try {
        /**
         * get all json files in the users directory
         */
        const jsonFiles = fs.readdirSync(__dirname + '/../data/users')
        const newId = jsonFiles.length + 1

        const data = JSON.stringify(req.body)

        fs.writeFileSync(__dirname + `/../data/users/${newId}.json`, data)

        res.status(200).json("successful")
    } catch (e) {
        res.status(400).json(e.message)
    }
    next()
})


app.listen(PORT, () => {
    console.log('SERVER IS UP ON PORT:', PORT);
});
