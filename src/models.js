import mongoose from 'mongoose';
import eventSchema from './schema.js';

const EventModel = mongoose.model("events", eventSchema);

export default EventModel;
