const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./Models/db');
const authrout = require('./Routes/authroutes.js');
 const eventRoutes = require('./Routes/eventroutes');
 const bookingRoutes = require('./Routes/bookingroutes');
 const userRoutes = require('./Routes/usersroutes.js');
 const path = require('path');

require('dotenv').config();

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000',  
  credentials: true                 
}));



app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/auth',authrout);
app.use('/events', eventRoutes);
app.use('/bookings', bookingRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
