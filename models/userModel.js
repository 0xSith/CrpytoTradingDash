import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  user: String,
  Key: String,
  Secret: String
});

const User = models.User || model('User', userSchema);

export default User;
