import { toast } from 'react-toastify';

const notify = (type) => {
    let toastMsg;
    if (type === 'success') {
        toastMsg = 'Create success, redirect to Login';
    } else if (type === 'error') {
        toastMsg = 'Create fail, please try again !';
    }
    toast[type](toastMsg, {
        toastId: type,
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        pauseOnFocusLoss: false,
    });
};

export { notify };
