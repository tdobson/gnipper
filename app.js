const express = require('express');
const uuid = require('uuid');
const fs = require('fs');
const app = express();

app.use(express.json());

// Load sample data from JSON files
let villas = require('./data/villas.json');
let bookings = require('./data/bookings.json.json');

// Save data to JSON files
const saveData = (filename, data) => {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
};

// Endpoints
app.get('/villas', (req, res) => {
    res.json(villas);
});

app.get('/villas/:villaId', (req, res) => {
    const villa = villas.find(v => v.uuid === req.params.villaId);
    if (villa) {
        res.json(villa);
    } else {
        res.status(404).json({ error: "Villa not found" });
    }
});

app.post('/villas', (req, res) => {
    const newVilla = { ...req.body, uuid: uuid.v4(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    villas.push(newVilla);
    saveData('./data/villas.json', villas);
    res.status(201).json(newVilla);
});

app.put('/villas/:villaId', (req, res) => {
    const villaIndex = villas.findIndex(v => v.uuid === req.params.villaId);
    if (villaIndex !== -1) {
        villas[villaIndex] = { ...villas[villaIndex], ...req.body, updated_at: new Date().toISOString() };
        saveData('./data/villas.json', villas);
        res.json(villas[villaIndex]);
    } else {
        res.status(404).json({ error: "Villa not found" });
    }
});

app.delete('/villas/:villaId', (req, res) => {
    const villaIndex = villas.findIndex(v => v.uuid === req.params.villaId);
    if (villaIndex !== -1) {
        const deletedVilla = villas.splice(villaIndex, 1);
        saveData('./data/villas.json', villas);
        res.json(deletedVilla);
    } else {
        res.status(404).json({ error: "Villa not found" });
    }
});

app.get('/bookings', (req, res) => {
    res.json(bookings);
});

app.get('/bookings/:bookingId', (req, res) => {
    const booking = bookings.find(b => b.id == req.params.bookingId);
    if (booking) {
        res.json(booking);
    } else {
        res.status(404).json({ error: "Booking not found" });
    }
});

app.post('/bookings', (req, res) => {
    const newBooking = { ...req.body, id: bookings.length + 1, uuid: uuid.v4(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    bookings.push(newBooking);
    saveData('./data/bookings.json.json', bookings);
    res.status(201).json(newBooking);
});

app.put('/bookings/:bookingId', (req, res) => {
    const bookingIndex = bookings.findIndex(b => b.id == req.params.bookingId);
    if (bookingIndex !== -1) {
        bookings[bookingIndex] = { ...bookings[bookingIndex], ...req.body, updated_at: new Date().toISOString() };
        saveData('./data/bookings.json.json', bookings);
        res.json(bookings[bookingIndex]);
    } else {
        res.status(404).json({ error: "Booking not found" });
    }
});

app.delete('/bookings/:bookingId', (req, res) => {
    const bookingIndex = bookings.findIndex(b => b.id == req.params.bookingId);
    if (bookingIndex !== -1) {
        const deletedBooking = bookings.splice(bookingIndex, 1);
        saveData('./data/bookings.json.json', bookings);
        res.json(deletedBooking);
    } else {
        res.status(404).json({ error: "Booking not found" });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
