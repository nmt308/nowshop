import { auth, fs } from '../../Config/Config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';
import { notify } from '../Toast';

// eslint-disable-next-line react-hooks/rules-of-hooks
const handleSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (data) => {
            const navigate = useNavigate();
            await addDoc(collection(fs, 'users'), {
                email,
                password,
            });
            notify('success');
            navigate('/login');
        })
        .catch((error) => {
            notify('error');
        });
};
export default handleSignUp;
