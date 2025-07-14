import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// creating userSchema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
    },
  },
  {
    // custom method to compare and validate password for logging in
    methods: {
      isCorrectPassword: async function (password: string) {
        return bcrypt.compare(password, this.password);
      },
    },
  },
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

const User = model('User', userSchema);

export default User;
