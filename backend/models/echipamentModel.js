import mongoose from 'mongoose';

const echipamentSchema = new mongoose.Schema(
  {
    numeEchipament: { type: String, required: true },
    descriereEchipament: { type: String },
  },
  {
    timestamps: true,
  }
);

const Echipament = mongoose.model('Echipament', echipamentSchema);
export default Echipament;
