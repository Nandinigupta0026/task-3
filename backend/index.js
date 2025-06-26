const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./Models/db');
const authrout = require('./Routes/authroutes.js');
 const eventRoutes = require('./Routes/eventroutes');
 const bookingRoutes = require('./Routes/bookingroutes');

require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());



app.get('/', (req, res) => {
  res.send('Server is running');
});


app.use('/auth',authrout);
app.use('/events', eventRoutes);
app.use('/bookings', bookingRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
