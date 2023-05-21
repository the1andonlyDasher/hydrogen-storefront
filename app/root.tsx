
import {
  Links,
  Meta,
  Outlet,
  Path,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from '@remix-run/react';
import type { Shop } from '@shopify/hydrogen/storefront-api-types';
import styles from './styles/app.css';
import favicon from '../public/favicon.svg';
import { type LinksFunction, type LoaderArgs } from '@shopify/remix-oxygen';
import { Layout } from './components/Layout';
import tailwind from './styles/tailwind-build.css';
import { Seo } from '@shopify/hydrogen';
import { defer } from '@shopify/remix-oxygen';
import { CART_QUERY } from 'app/queries/cart';
import { AnimatePresence, motion } from 'framer-motion';



export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tailwind },
    { rel: 'stylesheet', href: styles },
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    { rel: 'icon', type: 'image/svg+xml', href: favicon },
  ];
};

async function getCart({ storefront }: any, cartId: any) {
  if (!storefront) {
    throw new Error('missing storefront client in cart query');
  }

  const { cart } = await storefront.query(CART_QUERY, {
    variables: {
      cartId,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
    cache: storefront.CacheNone(),
  });

  return cart;
}


export async function loader({ context, request }: LoaderArgs) {
  const cartId = await context.session.get('cartId');
  return defer({
    cart: cartId ? getCart(context, cartId) : undefined,
    layout: await context.storefront.query(LAYOUT_QUERY),
  });
}

export default function App({ Path }: any) {
  const data: any = useLoaderData<typeof loader>() || {};
  const { name } = data.layout.shop;
  

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Seo />
        <Meta />
        <Links />
      </head>
      <body>
                 <Layout title={name} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const LAYOUT_QUERY = `#graphql
  query layout {
    shop {
      name
      description
    }
  }
`;
