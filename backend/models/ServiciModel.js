import mongoose from 'mongoose';

const serviciSchema = new mongoose.Schema(
  {
    numeServici: { type: String, required: true },
    descriereServici: { type: String },
  },
  {
    timestamps: true,
  }
);

const Servici = mongoose.model('Servici', serviciSchema);
export default Servici;
