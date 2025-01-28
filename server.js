const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Project = require('./models/project');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
const MONGO_URI = 'mongodb://localhost:27017/portfolio';
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error(err);
    });

// Routes
// GET /projects
app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// POST /projects
app.post('/projects', async (req, res) => {
    const project = new Project(req.body);
    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET /projects/:id
app.get('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        return res.status(500).json({ message: err.message});
    }
});

// PUT /projects/:id
app.put('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        project.set(req.body);
        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// DELETE /projects/:id
app.delete('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(204).send();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});


// Start server
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
