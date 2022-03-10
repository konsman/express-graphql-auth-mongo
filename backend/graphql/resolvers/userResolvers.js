import User from "../../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { private_key } from '../../helpers/keys.js';

export default {
    user:({userId},req) => {
        if (!req.isAuth) {
            throw new Error("Unauthorized");
        }
        const userInfo =  User.findById(userId).exec()
        if (!userInfo) {
          throw new Error('Error')
        }
       
       return userInfo;
    },
    createUser: async (args) => {
        const newUser = new User(args.userInput);
        const user = await newUser.save();
        return user
    },
    login: async ({ email, password }) => {
        console.log(email);
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('Invalid Credentials!user')
            }
            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if (!isCorrectPassword) {
                throw new Error("Invalid Credentials!password")
            }
            const token = jwt.sign({ _id: user._id, email: user.email }, private_key, {
                algorithm: "RS256"
            });
            return {
                token,
                userId: user._id
            }
        } catch (error) {
            return error
        }
    },
    posts: (_, req) => {
        if (!req.isAuth) {
            throw new Error("Unauthorized");
        }
        return [{ title: "accident", description: "accident ocurred" }, { title: "Laptop", description: "Buy A new Laptop" }]
    }
}