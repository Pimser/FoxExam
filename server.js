const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const foxRoutes = require('./routes/foxRoutes');
const path = require('path');

dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', foxRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server running on port', process.env.PORT || 3000);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
