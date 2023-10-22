import mongoose from 'mongoose'

const issueSchema = mongoose.Schema(
  {
    name: {type: String, require: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    title: { type: String, required: true },
    description: { type: String, required: true},
    status: { type: String, enum: ['Open', 'In Progress', 'Resolved'], default: 'Open' },
    createdAt: { type: Date, default: Date.now  },
    updatedAt: { type: Date,  default: Date.now }
  },
  {
    timestamps: true,
  }
);



const Issue = mongoose.model('Issue', issueSchema)

export default Issue