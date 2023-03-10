import mongoose from 'mongoose';

const pontajSchema = new mongoose.Schema(
  {
    numeAngajat: { type: String, required: true },
    data: { type: Date, required: true },
    ziua: { type: String, required: true },
    denumireClient: { type: String, required: true },
    denumireServiciu: { type: String, required: true },
    timp: { type: Number, required: true },
    distanta: { type: Number, required: true },
    comentariu: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

const Pontaj = mongoose.model('Pontaj', pontajSchema);
export default Pontaj;
