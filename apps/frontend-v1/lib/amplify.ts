import * as Auth from 'aws-amplify/auth';

export const signUp = async (email: string, password: string, givenName: string, familyName: string, metaData?: any) => {
  return await Auth.signUp({
    username: email,
    password,
    options: {
        userAttributes: {
            given_name: givenName,
            family_name: familyName,
        },
        clientMetadata: { data: JSON.stringify(metaData)}
    }
  });
};

// export const confirmSignUp = async (email, code) => {
//   return await Auth.confirmSignUp(: email, code);
// };

export const signIn = async (email: string, password: string) => {
  return await Auth.signIn({ username: email, password: password});
};

// export const signOut = async () => {
//   return await Auth.signOut();
// };

// export const currentUser = async () => {
//   return await Auth.currentAuthenticatedUser();
// };

