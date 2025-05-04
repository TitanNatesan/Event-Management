console.log('Server is starting...');
const express = require('express');
const app = express();
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
    const { title, description, date } = req.body;
    const newEvent = new EventModel({ title, description, date });
    await newEvent.save();
    res.status(201).json(newEvent);
});

app.get("/events", async (req, res) => {
    const EventData = await EventModel.find();
    res.status(200).json(EventData);
});

app.get("/events/:id", async (req, res) => {
    const { id } = req.params;
    const EventData = await EventModel.findById(id);
    if (!EventData) { return res.status(404).json({ message: "Event not found" }) }
    res.status(200).json(EventData);
});

app.put("/events/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, date } = req.body;
    const EventData = await EventModel.findByIdAndUpdate(id, { title, description, date }, { new: true });
    if (!EventData) { return res.status(404).json({ message: "Event not found" }) }
    res.status(200).json(EventData);
});

app.delete("/events/:id", async (req, res) => {
    const { id } = req.params;
    const EventData = await EventModel.findByIdAndDelete(id);
    if (!EventData) { return res.status(404).json({ message: "Event not found" }) }
    res.status(200).json({ message: "Event deleted successfully" });
});