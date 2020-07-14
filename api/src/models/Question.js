const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    answerID: String
});

module.exports = mongoose.model('Question', QuestionSchema);