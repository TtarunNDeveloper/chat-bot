const fs = require('fs');
const csv = require('csv-parser');

const loadQuestions = () => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream('questions.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};

const getQuestionsByServiceId = async (serviceId) => {
    const questions = await loadQuestions();
    return questions.filter(q => q['Service ID'] === serviceId.toString());
};

module.exports = { getQuestionsByServiceId };
