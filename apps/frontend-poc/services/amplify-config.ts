import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito : {
      userPoolId: 'eu-west-3_sPpNlCgcL',
      userPoolClientId: 't7vhkahlckvaldtksp0n7cm53',
      loginWith: { email: true}
      
    }
  }
});