import connectMongo from '../../api/lib/connectMongo';
import User from '../models/userModel';

export default async function addUser(req, res) {
  try {
    await connectMongo();
    const user = await User.create(req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}
