const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, 'firstname is required'],
      trim: true
    },
    lastname: {
      type: String,
      required: [true, 'lastname is required'],
      trim: true
    },
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'username is required']
    },
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
      default: undefined
    },
    address: {
      type: String,
      trim: true
    },
    avatar: {
      type: String,
      trim: true,
      default: 'user-avatar-default.jpeg'
    },
    role: {
      type: String,
      default: 'USER',
      enum: {
        values: ['ADMIN', 'USER'],
        message: 'invalid role: ({VALUE})'
      }
    },
    refreshToken: {
      type: String,
      select: false
    }
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

module.exports = model('User', UserSchema);
