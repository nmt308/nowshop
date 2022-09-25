import { Home, Login, Register, AddProduct, Cart } from '../pages';

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
    {
        path: '/dashboard/addproduct',
        component: AddProduct,
        layout: '',
    },
    {
        path: '/cart',
        component: Cart,
        layout: DefaultLayout,
    },
];
