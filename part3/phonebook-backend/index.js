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

let persons = [];


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
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => console.log(error))
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


const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
