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
app.get("/info", (req, res, error) => {
    const requestTime = new Date(Date.now())

    Person.find({})
        .then((persons) => {
            res.send(
                `<p>Phonebook has info for ${persons.length} people</p> <p>${requestTime}</p>`
            )
        })
        .catch((error) => next(error))
})

// GET persons
app.get("/api/persons", (req, res) => {
    Person.find({}).then((persons) => {
        res.json(persons)
    })
})

// GET persons id с ошибкой, если индекс не найден
app.get("/api/persons/:id", (req, res, next) => {
    Person.findById(req.params.id)
        .then((person) => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch((error) => next(error))
})

// DELETE
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

// POST
app.post('/api/persons', (req, res, next) => {
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

    person
        .save()
        .then((savedPerson) => savedPerson.toJSON())
        .then((savedAndFormattedPerson) => res.json(savedAndFormattedPerson))
        .catch((error) => next(error))
});


// PUT

app.put("/api/persons/:id", (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then((updatedPerson) => {
            res.json(updatedPerson)
        })
        .catch((error) => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === "CastError") {
        return res.status(400).send({ error: "malformatted id" })
    } else if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})