import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from '../lib/connectMongo';
import User from '../../models/userModel';
import bcrypt from 'bcrypt';

connectMongo();

export default NextAuth ({

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const username = credentials.username;
        const password = credentials.password;
        const user = User.findOne({username})

        if(!user){
          throw new Error ("User does not exist")
        }
        if(user){
          return SignInUser({password,user})
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: 'secret'
})

const SignInUser = async ({password,user}) => {
  if(!user.password){
    throw new Error('Please enter password')
  }
  const isMatch = await bcrpyt.compare(password,user);

  if(!isMatch){
    throw new Error('Password or Username not correct')
  }
  return user
}
