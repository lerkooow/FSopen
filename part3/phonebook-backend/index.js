require("dotenv").config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require("./models/person")

app.use(express.json())

// CORS
app.use(cors())

// Morgan
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

morgan.token('ms', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
});

// let persons = [
//     {
//         name: "Arto Hellas",
//         number: "040-123456",
//         id: 1,
//     },
//     {
//         name: "Ada Lovelace",
//         number: "39-44-5323523",
//         id: 2,
//     },
//     {
//         name: "Dan Abramov",
//         number: "12-43-234345",
//         id: 3,
//     },
//     {
//         name: "Mary Poppendieck",
//         number: "39-23-6423122",
//         id: 4,
//     },
//     {
//         name: "Edward Tivruski",
//         number: "021-2142142142",
//         id: 5,
//     },
// ]


// GET info
app.get('/info', (req, res) => {
    res.json(newPerson)
})

// GET persons
app.get("/api/persons", (req, res) => {
    Person.find({}).then((persons) => {
        res.json(persons)
    })
})

// GET persons id с ошибкой, если индекс не найден
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// DELETE
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})



// POST
app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'Name or number missing'
        });
    } else if (persons.some(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then((savedPerson) => {
        res.json(savedPerson)
    })
});


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
