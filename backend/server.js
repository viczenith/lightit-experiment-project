// require('dotenv').config();

// const express  = require('express');
// const mongoose = require('mongoose');
// const cors     =


// require('cors');

// const authRoutes = require('./routes/auth');
// const expRoutes  = require('./routes/experiments');

// const app = express();

// // Body parsers (larger limits for base64 payloads)
// app.use(express.json({ limit: '25mb' }));
// app.use(express.urlencoded({ limit: '25mb', extended: true }));

// app.use(cors());

// // Mount Routes 
// app.use('/api/auth',        authRoutes);
// app.use('/api/experiments', expRoutes);

// // DB Connection & Server Startup 
// const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
// if (!mongoURI) {
// //   console.error('Missing MONGODB_URI in .env');
//   process.exit(1);
// }

// mongoose
//   .connect(mongoURI)
//   .then(() => {
//     // console.log('Connected to MongoDB');
//     const port = process.env.PORT || 5000;
//     app.listen(port, () => console.log(`Server running on port ${port}`));
//   })
//   .catch(err => {
//     // console.error('MongoDB connection error:', err);
//     process.exit(1);
//   });

require('dotenv').config();

const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const authRoutes = require('./routes/auth');
const expRoutes  = require('./routes/experiments');

const app = express();

// Body parsers
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(cors());

// Mount Routes 
app.use('/api/auth', authRoutes);
app.use('/api/experiments', expRoutes);

// DB Connection & Server Startup 
const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
if (!mongoURI) {
  console.error('❌ Missing MONGODB_URI or MONGO_URI in .env');
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
