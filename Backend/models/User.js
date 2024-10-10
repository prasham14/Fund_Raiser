const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImg: { type: String }
});

// Hash the password before saving the user
UserSchema.pre("save", async function (next) {
  const person = this;
  if (!person.isModified("password")) return next();
  try {
    //  generating salt
    const salt = await bcrypt.genSalt(10);
    //   generating hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);
    person.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});
UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
