import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Echipament from '../models/echipamentModel.js';
import { isAuth, isAdmin } from '../utils.js';

const echipamentRouter = express.Router();

echipamentRouter.get('/', async (req, res) => {
  const echipamente = await Echipament.find();
  res.send(echipamente);
});

echipamentRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newEchipament = new Echipament({
      numeEchipament: req.body.numeEchipament,
      descriereEchipament: req.body.descriereEchipament,
    });
    const echipament = await newEchipament.save();
    res.send({ message: 'Echipamentul a fost adăugat', echipament });
  })
);

echipamentRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const echipamentId = req.params.id;
    const echipament = await Echipament.findById(echipamentId);
    if (echipament) {
      (echipament.numeEchipament = req.body.numeEchipament),
        (echipament.descriereEchipament = req.body.descriereEchipament),
        await echipament.save();
      res.send({ message: 'Înregistrarea a fost actualizată' });
    } else {
      res.status(404).send({ message: 'Echipamentul nu a fost găsit' });
    }
  })
);

echipamentRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const echipament = await Echipament.findById(req.params.id);
    if (echipament) {
      await echipament.remove();
      res.send({ message: 'Echipamentul a fost șters' });
    } else {
      res.status(404).send({ message: 'Echipamentul nu a fost găsit' });
    }
  })
);

echipamentRouter.get('/nume/:numeEchipament', async (req, res) => {
  const echipament = await Echipament.findOne({
    numeEchipament: req.params.numeEchipament,
  });

  if (echipament) {
    res.send(echipament);
  } else {
    res.status(404).send({ message: 'Echipamentul nu a fost gasit' });
  }
});

echipamentRouter.get('/:id', async (req, res) => {
  const echipament = await Echipament.findById(req.params.id);
  if (echipament) {
    res.send(echipament);
  } else {
    res.status(404).send({ message: 'Echipamentul nu a fost gasit' });
  }
});

export default echipamentRouter;
