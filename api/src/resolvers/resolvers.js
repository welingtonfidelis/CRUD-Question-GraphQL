const Question = require('../models/Question');

module.exports = {
    Query: {
        questions: async () => {
            const query = await Question.find();
                        
            return query;
        },
        question: (_, { id }) => {
            return Question.findById(id);
        },
    },

    Mutation: {
        createQuestion: async (_, args) => {
            const { question, options, answerID } = args; 
            
            return Question.create({ question, options, answerID });
        },
        updateQuestion: async (_, args) => {
            const { id, question, options, answerID } = args;

            await Question.updateOne({ _id: id }, { $set: { question, options, answerID } });

            return Question.findById(id);
        },
        deleteQuestion: async (_, { id }) => {
            await Question.deleteOne({ _id: id });

            return Question.findById(id);
        },
    }
};