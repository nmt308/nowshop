import { auth } from '../../Config/Config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { notify } from '../Toast';

// eslint-disable-next-line react-hooks/rules-of-hooks

const HandleSignIn = (email, password, navigate) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(async (data) => {
            notify('success', 'Login successful !');
            setTimeout(() => {
                navigate('/');
            }, 3000);
        })
        .catch((error) => {
            notify('error', 'Login failed, please try again');
        });
};
export default HandleSignIn;
