const express = require('express');
const uuid = require('uuid');
const app = express();

app.use(express.json());

// Sample Data
const villas = [
    {
        uuid: uuid.v4(),
        website_id: 506,
        legacy_id: 31394,
        name: "Aduen 3 WiFi Part Air-con VILLA PLUS",
        description: "A beautiful villa with partial air conditioning and WiFi",
        resort: "PLAYA BLANCA",
        capacity_adults: 6,
        capacity_children: 0,
        price: 450.00,
        owner: uuid.v4(),
        created_by: uuid.v4(),
        amended_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    // Add more villa entries as needed
];

const bookings = [
    {
        id: 1,
        uuid: uuid.v4(),
        customer_uuid: uuid.v4(),
        villa_uuid: villas[0].uuid,
        start_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        end_date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        adults: 2,
        children: 2,
        recorded_cost: 1200.00,
        booked_by: uuid.v4(),
        amended_by: null,
        status: "confirmed",
        booking_type: "regular",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    // Add more booking entries as needed
];

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
    res.status(201).json(newVilla);
});

app.put('/villas/:villaId', (req, res) => {
    const villaIndex = villas.findIndex(v => v.uuid === req.params.villaId);
    if (villaIndex !== -1) {
        villas[villaIndex] = { ...villas[villaIndex], ...req.body, updated_at: new Date().toISOString() };
        res.json(villas[villaIndex]);
    } else {
        res.status(404).json({ error: "Villa not found" });
    }
});

app.delete('/villas/:villaId', (req, res) => {
    const villaIndex = villas.findIndex(v => v.uuid === req.params.villaId);
    if (villaIndex !== -1) {
        const deletedVilla = villas.splice(villaIndex, 1);
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
    res.status(201).json(newBooking);
});

app.put('/bookings/:bookingId', (req, res) => {
    const bookingIndex = bookings.findIndex(b => b.id == req.params.bookingId);
    if (bookingIndex !== -1) {
        bookings[bookingIndex] = { ...bookings[bookingIndex], ...req.body, updated_at: new Date().toISOString() };
        res.json(bookings[bookingIndex]);
    } else {
        res.status(404).json({ error: "Booking not found" });
    }
});

app.delete('/bookings/:bookingId', (req, res) => {
    const bookingIndex = bookings.findIndex(b => b.id == req.params.bookingId);
    if (bookingIndex !== -1) {
        const deletedBooking = bookings.splice(bookingIndex, 1);
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

