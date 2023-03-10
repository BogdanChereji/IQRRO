import mongoose from 'mongoose';

const angajatSchema = new mongoose.Schema(
  {
    codAngajat: { type: Number, required: true, unique: true },
    nume: { type: String, required: true },
    prenume: { type: String, required: true },
    telefon: { type: String, required: true },
    email: { type: String, required: true },
    adresa: { type: String, required: true },
    iban: { type: String, required: true },
    banca: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Angajat = mongoose.model('Angajat', angajatSchema);
export default Angajat;
