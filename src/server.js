console.log('Server is starting...');
const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.post('/', (req, res) => {
    console.log('Received a POST request on /');
    console.log('Request body:', req.body);
    res.json({ message: `Hello ${req.username ?? "World!"}` });
});