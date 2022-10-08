import { auth } from '../../Config/Config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { notify } from '../Toast';

// eslint-disable-next-line react-hooks/rules-of-hooks

const HandleSignIn = (email, password, navigate) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(async (data) => {
            notify('success', 'Đăng nhập thành công !');
            setTimeout(() => {
                navigate('/');
            }, 3000);
        })
        .catch((error) => {
            notify('error', 'Đăng nhập thất bại !');
        });
};
export default HandleSignIn;
