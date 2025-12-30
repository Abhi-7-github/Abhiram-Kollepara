import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      minlength: [2, 'Project title must be at least 2 characters'],
      maxlength: [120, 'Project title must be at most 120 characters']
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      minlength: [10, 'Project description must be at least 10 characters'],
      maxlength: [2000, 'Project description must be at most 2000 characters']
    },
    techStack: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length <= 30,
        message: 'Tech stack must contain at most 30 items'
      }
    },
    imageUrl: {
      type: String,
      trim: true,
      maxlength: [2048, 'Image URL must be at most 2048 characters'],
      validate: {
        validator: (value) => !value || /^https?:\/\//i.test(value),
        message: 'Image URL must be a valid http(s) URL'
      }
    },
    githubUrl: {
      type: String,
      trim: true,
      maxlength: [2048, 'GitHub URL must be at most 2048 characters'],
      validate: {
        validator: (value) => !value || /^https?:\/\//i.test(value),
        message: 'GitHub URL must be a valid http(s) URL'
      }
    },
    liveUrl: {
      type: String,
      trim: true,
      maxlength: [2048, 'Live URL must be at most 2048 characters'],
      validate: {
        validator: (value) => !value || /^https?:\/\//i.test(value),
        message: 'Live URL must be a valid http(s) URL'
      }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ProjectSchema.index({ title: 1 }, { unique: true });
ProjectSchema.index({ techStack: 1 });

export const Project = mongoose.model('Project', ProjectSchema);
