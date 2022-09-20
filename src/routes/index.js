import { Home, Login, Register } from '../pages';
import { DefaultLayout } from '../layouts';
export const AllRoute = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: '/Login',
        component: Login,
        layout: '',
    },
    {
        path: '/Register',
        component: Register,
        layout: '',
    },
];
