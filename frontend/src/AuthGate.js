import React from "react";
import Private from "./pages/Private";
import AuthenticationForm from "./pages/AuthenticationForm";
import { useAuthToken, useAuthUserToken } from "./config/auth";
import {gql, useQuery} from "@apollo/client";


const userQueryGQL = gql`
  query user($userId: String!) {
    user(userId: $userId) {
      _id
      username
      email
    }
  }
`;

export const AuthGate = () => {

  const [authToken] = useAuthToken()
  const [authUserToken] = useAuthUserToken()


const {loading,error, data} = useQuery(userQueryGQL,
  {
  variables:{userId:authUserToken},
  onCompleted:()=>{console.log("query successful",data.user.username);
 
}
})

 
  
  if (data) {
    console.log("username output " + data.user.username);
  }
  


  if (data && authToken) {
    return <Private user={data.user.username} />;
  }
  

  return <AuthenticationForm loading={loading} />;
  
};
