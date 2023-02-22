import express from 'express';
import s3 from './routes/s3.js';
import api from './routes/api.js';

const app = express();

app.use('/s3', s3);
app.use('/api', api);

app.listen(3000);