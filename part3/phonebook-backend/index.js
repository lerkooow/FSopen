const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')

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

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

// GET info
const length = persons.length
const date = new Date()

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${length} people</p><p>${date}</p > `)
})

// GET persons
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

// GET persons id с ошибкой, если индекс не найден
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// DELETE
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

// generateId
const generateId = () => {
    const minId = 1;
    const maxId = 1000000;
    return Math.floor(Math.random() * (maxId - minId + 1)) + minId;
};

// POST
app.post('/api/persons', (request, response) => {
    const body = request.body;

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    };

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or number missing'
        });
    } else if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    persons = persons.concat(person);

    response.json(person);
});


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})