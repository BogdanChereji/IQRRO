import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Angajat from '../models/angajatModel.js';
import User from '../models/userModel.js';
import Client from '../models/clientModel.js';
import Pontaj from '../models/pontajModel.js';
import { isAuth, isAdmin } from '../utils.js';
import mongoose from 'mongoose';

const infoRouter = express.Router();

infoRouter.get(
  '/summary',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const users = await User.aggregate([
      { $group: { _id: null, numUsers: { $sum: 1 } } },
    ]);
    const angajati = await Angajat.aggregate([
      { $group: { _id: null, numAngajati: { $sum: 1 } } },
    ]);
    const clienti = await Client.aggregate([
      { $group: { _id: null, numClienti: { $sum: 1 } } },
    ]);
    const today = new Date();
    const month = today.getMonth();
    const pontaje = await Pontaj.aggregate([
      { $group: { _id: null, numOre: { $sum: '$timp' } } },
    ]);

    const ObjectId = mongoose.Types.ObjectId;
    const pontajZilnic = await Pontaj.aggregate([
      {
        $match: {
          user: ObjectId(req.user._id),
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%m-%Y', date: '$data' },
          },
          numOre: { $sum: '$timp' },
        },
      },
      { $sort: { _id: -1 } },
    ]);

    res.send({ users, angajati, clienti, pontaje, pontajZilnic });
  })
);

export default infoRouter;
