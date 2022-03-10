import { buildSchema } from "graphql";

export default buildSchema(`
    type User{
        _id:ID!
        username:String!
        email:String!
        password:String!
    }
    type Post{
        title:String
        description:String
    }
    input UserInput{
        username:String!
        email:String!
        password:String!
    }
    type LoginReturnType{
        token:String
        userId:ID
    }
    type RootMutation{
        createUser(userInput:UserInput!):User!
        login(email:String!,password:String!):LoginReturnType!
    }
    type RootQuery{
        user(userId:String!):User!
        users:[User!]!
        posts:[Post!]!
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`)