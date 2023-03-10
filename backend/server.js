import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import angajatRouter from './routes/angajatRoutes.js';
import userRouter from './routes/userRoutes.js';
import clientRouter from './routes/clientRoutes.js';
import serviciRouter from './routes/serviciRoutes.js';
import echipamentRouter from './routes/echipamentRoutes.js';
import pontajRouter from './routes/pontajRoutes.js';
import infoRouter from './routes/infoRoutes.js';

dotenv.config();

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('baza de date este conectata');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/angajati', angajatRouter);
app.use('/api/clienti', clientRouter);
app.use('/api/servici', serviciRouter);
app.use('/api/echipamente', echipamentRouter);
app.use('/api/users', userRouter);
app.use('/api/pontaje', pontajRouter);
app.use('/api/infos', infoRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
