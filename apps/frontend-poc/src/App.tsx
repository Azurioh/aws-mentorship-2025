import '../services/amplify-config'
import { signUp, signIn } from '../services/amplify'

const Register = () => {

    const register = async () => {
      console.log( await signUp('david.benistant@epitech.com', 'Azertyuiop1234567890@', 'David', 'Benistant'))
    }

    const login = async () => {
      console.log( await signIn('david.benistant@epitech.eu', 'Azertyuiop1234567890@'))
    }


    return (
        <div>
            <input type='button' onClick={register}/>
            <input type='button' onClick={login}/>
        </div>
    );
};

export default Register;
