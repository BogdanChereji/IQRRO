import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Pontaj from '../models/pontajModel.js';
import { isAuth, isAdmin } from '../utils.js';

const pontajRouter = express.Router();

pontajRouter.get('/', async (req, res) => {
  const pontaje = await Pontaj.find();
  res.send(pontaje);
});

pontajRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newPontaj = new Pontaj({
      numeAngajat: req.body.numeAngajat,
      data: req.body.data,
      ziua: req.body.ziua,
      denumireClient: req.body.denumireClient,
      denumireServiciu: req.body.denumireServiciu,
      timp: req.body.timp,
      distanta: req.body.distanta,
      comentariu: req.body.comentariu,
      user: req.user._id,
    });
    const pontaj = await newPontaj.save();
    res.status(201).send({ message: 'Pontajul a fost creat', pontaj });
  })
);

pontajRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const pontajId = req.params.id;
    const pontaj = await Pontaj.findById(pontajId);
    if (pontaj) {
      (pontaj.numeAngajat = req.body.numeAngajat),
        (pontaj.data = req.body.data),
        (pontaj.ziua = req.body.ziua),
        (pontaj.denumireClient = req.body.denumireClient),
        (pontaj.denumireServiciu = req.body.denumireServiciu),
        (pontaj.timp = req.body.timp),
        (pontaj.distanta = req.body.distanta),
        (pontaj.comentariu = req.body.comentariu),
        await pontaj.save();
      res.send({ message: 'Înregistrarea a fost actualizată' });
    } else {
      res.status(404).send({ message: 'Pontajul nu a fost găsit' });
    }
  })
);

pontajRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const pontaj = await Pontaj.findById(req.params.id);
    if (pontaj) {
      await pontaj.remove();
      res.send({ message: 'Pontajul a fost șters' });
    } else {
      res.status(404).send({ message: 'Pontajul nu a fost găsit' });
    }
  })
);

pontajRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const pontaj = await Pontaj.find({ user: req.user._id });
    res.send(pontaj);
  })
);

pontajRouter.get('/:id', async (req, res) => {
  const pontaj = await Pontaj.findById(req.params.id);
  if (pontaj) {
    res.send(pontaj);
  } else {
    res.status(404).send({ message: 'Pontajul nu a fost gasit' });
  }
});

export default pontajRouter;
