import '../services/amplify-config'
import { signUp } from '../services/amplify'

const Register = () => {

    const register = async () => {
      console.log( await signUp('david.benistant@epitech.com', 'Azertyuiop1234567890@', 'David', 'Benistant'))
    }

    return (
        <div>
            <input type='button' onClick={register}/>
        </div>
    );
};

export default Register;
