import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Servici from '../models/ServiciModel.js';
import { isAuth, isAdmin } from '../utils.js';

const serviciRouter = express.Router();

serviciRouter.get('/', async (req, res) => {
  const servicii = await Servici.find();
  res.send(servicii);
});

serviciRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newServici = new Servici({
      numeServici: req.body.numeServici,
      descriereServici: req.body.descriereServici,
    });
    const servici = await newServici.save();
    res.send({ message: 'Serviciul a fost adăugat', servici });
  })
);

serviciRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const serviciId = req.params.id;
    const servici = await Servici.findById(serviciId);
    if (servici) {
      (servici.numeServici = req.body.numeServici),
        (servici.descriereServici = req.body.descriereServici),
        await servici.save();
      res.send({ message: 'Înregistrarea a fost actualizată' });
    } else {
      res.status(404).send({ message: 'Serviciul nu a fost găsit' });
    }
  })
);

serviciRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const servici = await Servici.findById(req.params.id);
    if (servici) {
      await servici.remove();
      res.send({ message: 'Serviciul a fost șters' });
    } else {
      res.status(404).send({ message: 'Serviciul nu a fost găsit' });
    }
  })
);

serviciRouter.get('/nume/:numeServici', async (req, res) => {
  const servici = await Servici.findOne({
    numeServici: req.params.numeServici,
  });

  if (servici) {
    res.send(servici);
  } else {
    res.status(404).send({ message: 'Serviciul nu a fost gasit' });
  }
});

serviciRouter.get('/:id', async (req, res) => {
  const servici = await Servici.findById(req.params.id);
  if (servici) {
    res.send(servici);
  } else {
    res.status(404).send({ message: 'Serviciul nu a fost gasit' });
  }
});

export default serviciRouter;
