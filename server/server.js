const express = require('express');
const config = require('config');
const cors = require('cors');
const mongoose = require('mongoose');


const corsOptions = {
  origin: 'http://localhost:3000',
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200
};

const app = express();
const PORT = config.get('port');

app.use(express.json({ extended: true }));

app.use('/api', cors(corsOptions), /*require(routes)*/ (res) => {
  res.json({ message: 'This is CORS-enabled for only localhost:3000.' })
});

const connect = async () => {
  try {
    await mongoose.connect(config.get('mongoURL'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(PORT, () => {
      console.log(`Server was started on port ${PORT}`);
    });
  } catch (e) {
    console.error('Server error...');
    process.env.exit(1);
  }
};

connect();