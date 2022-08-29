import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  username: String,
  key: String,
  secret: String
});

const User = models.User || model('User', userSchema);

export default User;
