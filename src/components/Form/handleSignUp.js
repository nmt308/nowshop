import { auth, fs } from '../../Config/Config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { notify } from '../Toast';

const HandleSignUp = (email, password, navigate) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (data) => {
            await addDoc(collection(fs, 'users'), {
                email,
                password,
            });
            notify('success');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        })
        .catch((error) => {
            notify('error');
        });
};
export default HandleSignUp;
