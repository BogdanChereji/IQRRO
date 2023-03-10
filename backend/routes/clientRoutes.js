import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Client from '../models/clientModel.js';
import { isAuth, isAdmin } from '../utils.js';

const clientRouter = express.Router();

clientRouter.get('/', async (req, res) => {
  const clienti = await Client.find();
  res.send(clienti);
});

clientRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newClient = new Client({
      codClient: req.body.codClient,
      numeClient: req.body.numeClient,
      cifClient: req.body.cifClient,
      regcomClient: req.body.regcomClient,
      tvaClient: req.body.tvaClient,
      adresaClient: req.body.adresaClient,
      localitateClient: req.body.localitateClient,
      judetClient: req.body.judetClient,
      contactClient: req.body.contactClient,
      ibanClient: req.body.ibanClient,
      bancaClient: req.body.bancaClient,
      telefonClient: req.body.telefonClient,
      emailClient: req.body.emailClient,
    });
    const client = await newClient.save();
    res.send({ message: 'Clientul a fost adăugat', client });
  })
);

clientRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const clientId = req.params.id;
    const client = await Client.findById(clientId);
    if (client) {
      (client.codClient = req.body.codClient),
        (client.numeClient = req.body.numeClient),
        (client.cifClient = req.body.cifClient),
        (client.regcomClient = req.body.regcomClient),
        (client.tvaClient = req.body.tvaClient),
        (client.adresaClient = req.body.adresaClient),
        (client.localitateClient = req.body.localitateClient),
        (client.judetClient = req.body.judetClient),
        (client.contactClient = req.body.contactClient),
        (client.ibanClient = req.body.ibanClient),
        (client.bancaClient = req.body.bancaClient),
        (client.telefonClient = req.body.telefonClient),
        (client.emailClient = req.body.emailClient),
        await client.save();
      res.send({ message: 'Înregistrarea a fost actualizată' });
    } else {
      res.status(404).send({ message: 'Clientul nu a fost găsit' });
    }
  })
);

clientRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id);
    if (client) {
      await client.remove();
      res.send({ message: 'Clientul a fost șters' });
    } else {
      res.status(404).send({ message: 'Clientul nu a fost găsit' });
    }
  })
);

clientRouter.get('/nume/:numeClient', async (req, res) => {
  const client = await Client.findOne({ numeClient: req.params.numeClient });

  if (client) {
    res.send(client);
  } else {
    res.status(404).send({ message: 'Clientul nu a fost gasit' });
  }
});

clientRouter.get('/:id', async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (client) {
    res.send(client);
  } else {
    res.status(404).send({ message: 'Clientul nu a fost gasit' });
  }
});

export default clientRouter;
