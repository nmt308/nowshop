import { Home, Login, Register, AddProduct, Cart, ProductDetail, Search } from '../pages';

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
    {
        path: '/search',
        component: Search,
        layout: DefaultLayout,
    },
    {
        path: '/:param-detail',
        component: ProductDetail,
        layout: DefaultLayout,
    },
];
