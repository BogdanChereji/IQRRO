import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Angajat from '../models/angajatModel.js';
import { isAuth, isAdmin } from '../utils.js';

const angajatRouter = express.Router();

angajatRouter.get('/', async (req, res) => {
  const angajati = await Angajat.find();
  res.send(angajati);
});

angajatRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newAngajat = new Angajat({
      codAngajat: req.body.codAngajat,
      nume: req.body.nume,
      prenume: req.body.prenume,
      telefon: req.body.telefon,
      email: req.body.email,
      adresa: req.body.adresa,
      iban: req.body.iban,
      banca: req.body.banca,
    });
    const angajat = await newAngajat.save();
    res.send({ message: 'Angajatul a fost adăugat', angajat });
  })
);

angajatRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const angajatId = req.params.id;
    const angajat = await Angajat.findById(angajatId);
    if (angajat) {
      (angajat.codAngajat = req.body.codAngajat),
        (angajat.nume = req.body.nume),
        (angajat.prenume = req.body.prenume),
        (angajat.telefon = req.body.telefon),
        (angajat.email = req.body.email),
        (angajat.adresa = req.body.adresa),
        (angajat.iban = req.body.iban),
        (angajat.banca = req.body.banca),
        await angajat.save();
      res.send({ message: 'Înregistrarea a fost actualizată' });
    } else {
      res.status(404).send({ message: 'Angajatul nu a fost găsit' });
    }
  })
);

angajatRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const angajat = await Angajat.findById(req.params.id);
    if (angajat) {
      await angajat.remove();
      res.send({ message: 'Product Deleted' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

angajatRouter.get('/nume/:nume', async (req, res) => {
  const angajat = await Angajat.findOne({ nume: req.params.nume });

  if (angajat) {
    res.send(angajat);
  } else {
    res.status(404).send({ message: 'Angajatul nu a fost gasit' });
  }
});

angajatRouter.get('/:id', async (req, res) => {
  const angajat = await Angajat.findById(req.params.id);
  if (angajat) {
    res.send(angajat);
  } else {
    res.status(404).send({ message: 'Angajatul nu a fost gasit' });
  }
});

export default angajatRouter;
