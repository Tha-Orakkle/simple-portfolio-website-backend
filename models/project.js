const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Project Schema
const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    technologies: {
        type: [String],
        default: []
    },
    githublink: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', projectSchema);