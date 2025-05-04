console.log('Server is starting...');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // Middleware to parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse JSON request bodies
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { default: EventModel } = require('./models');

dotenv.config();
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URL;

mongoose.connect(mongoURI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log('Server is running on port', port);
    });
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.post("/events", async (req, res) => {
    console.log("POST /events", req.body);
    const { title, description, date } = req.body;
    const newEvent = new EventModel({ title, description, date });
    await newEvent.save();
    res.status(201).json(newEvent);
});

app.get("/events", async (req, res) => {
    console.log("GET /events");
    const EventData = await EventModel.find();
    res.status(200).json(EventData);
});

app.get("/events/:id", async (req, res) => {
    console.log("GET /events/:id", req.params.id);
    const { id } = req.params;
    const EventData = await EventModel.findById(id);
    if (!EventData) { return res.status(404).json({ message: "Event not found" }) }
    res.status(200).json(EventData);
});

app.put("/events/:id", async (req, res) => {
    console.log("PUT /events/:id", req.params.id, req.body);
    const { id } = req.params;
    const { title, description, date } = req.body;
    const EventData = await EventModel.findByIdAndUpdate(id, { title, description, date }, { new: true });
    if (!EventData) { return res.status(404).json({ message: "Event not found" }) }
    res.status(200).json(EventData);
});

app.delete("/events/:id", async (req, res) => {
    console.log("DELETE /events/:id", req.params.id);
    const { id } = req.params;
    const EventData = await EventModel.findByIdAndDelete(id);
    if (!EventData) { return res.status(404).json({ message: "Event not found" }) }
    res.status(200).json({ message: "Event deleted successfully" });
});