import { Home, SignIn, SignUp } from '../pages';
import { DefaultLayout } from '../layouts';
export const AllRoute = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: '/signin',
        component: SignIn,
        layout: '',
    },
    {
        path: '/signup',
        component: SignUp,
        layout: '',
    },
];
