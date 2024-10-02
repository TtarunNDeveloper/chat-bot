const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const chatbot = require('./chatbot');

app.use(cors());
app.use(express.json());

app.get('/questions', (req, res) => {
    const results = [];

    fs.createReadStream('questions.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        })
        .on('error', (error) => {
            res.status(500).json({ error: 'Error reading the CSV file' });
        });
});

app.get('/', (req, res) => {
    res.send('Chatbot API is running!');
});
app.get('/questions/:serviceId', async (req, res) => {
    const serviceId = req.params.serviceId;

    try {
        const questions = await chatbot.getQuestionsByServiceId(serviceId);
        if (questions.length === 0) {
            return res.status(404).json({ message: 'No questions found for this service ID' });
        }
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching questions' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
