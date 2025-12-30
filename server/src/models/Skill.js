import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
      minlength: [2, 'Skill name must be at least 2 characters'],
      maxlength: [60, 'Skill name must be at most 60 characters']
    },
    logoUrl: {
      type: String,
      required: [true, 'Skill logo URL is required'],
      trim: true,
      maxlength: [2048, 'Logo URL must be at most 2048 characters'],
      validate: {
        validator: (value) => /^https?:\/\//i.test(value),
        message: 'Logo URL must be a valid http(s) URL'
      }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

SkillSchema.index({ name: 1 }, { unique: true });

export const Skill = mongoose.model('Skill', SkillSchema);
