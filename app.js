const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Metric = require('./models/metric');

const app = express();
require('dotenv').config();

//DB CONNECTION
mongoose.connect(
  process.env.MONGO_DB_CONNECTOR,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected!!')
);

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

//ROUTES
app.post('/metrics', async (req, res) => {
  const { body } = req;
  const data = req.body;
  const metric = new Metric(data);

  console.log(data);
  try {
    const save = await metric.save();
    res.status(201);
    res.json({
      message: 'Successful',
      status: 201,
      ok: true,
      body: save,
    });
  } catch (e) {
    res.status(500);
    res.json({
      message: 'Opps!',
      status: 500,
      ok: false,
      errors: e,
    });
  }
});

app.get('/metrics', (req, res) => {
  const MinDate = (date) => (!date ? new Date() : date);
  const MaxDate = (date) =>
    !date ? new Date(new Date().getTime() - 0.5 * 60 * 60 * 1000) : date;
  Metric.find({
    generated_at: {
      $lte: MinDate(req.query.min),
      $gte: MaxDate(req.query.max),
    },
  }).then((filteredMetrics) => {
    res.json({
      message: 'Successful',
      status: 201,
      ok: true,
      body: filteredMetrics,
    });
  });
});

app.listen(process.env.PORT || 9090);
