import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
  {
    codClient: { type: Number, required: true, unique: true },
    numeClient: { type: String, required: true },
    cifClient: { type: String, required: true },
    regcomClient: { type: String, required: true },
    tvaClient: { type: String, required: true },
    adresaClient: { type: String, required: true },
    localitateClient: { type: String, required: true },
    judetClient: { type: String, required: true },
    contactClient: { type: String, required: true },
    ibanClient: { type: String, required: true },
    bancaClient: { type: String, required: true },
    telefonClient: { type: String, required: true },
    emailClient: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model('Client', clientSchema);
export default Client;
