import { RouteNamesEnum } from 'localConstants';
import { Dashboard } from 'pages';
import CheckoutForm from 'pages/CheckoutForm/CheckoutForm';
import ProductDetails from 'pages/ProductDetails/ProductDetails';
import ShoppingCart from 'pages/ShoppingCart/ShoppingCart';
import { RouteType } from 'types';

interface RouteWithTitleType extends RouteType {
  title: string;
}

export const routes: RouteWithTitleType[] = [
  {
    path: RouteNamesEnum.home,
    title: 'Home',
    component: Dashboard
  },
  {
    path: RouteNamesEnum.dashboard,
    title: 'Dashboard',
    component: Dashboard
  },
  {
    path: RouteNamesEnum.product,
    title: 'Product',
    component: ProductDetails
  },
  {
    path: RouteNamesEnum.cart,
    title: 'Product',
    component: ShoppingCart
  },
  {
    path: RouteNamesEnum.checkout,
    title: 'Checkout Form',
    component: CheckoutForm
  },
];
