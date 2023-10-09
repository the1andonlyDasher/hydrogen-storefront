
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
import styles from './styles/style.css';
import favicon from '../public/favicon.ico';
import { type LinksFunction, type LoaderArgs } from '@shopify/remix-oxygen';
import { Layout } from './components/Layout';
import tailwind from './styles/tailwind-build.css';
import { Seo } from '@shopify/hydrogen';
import { defer } from '@shopify/remix-oxygen';
import { CART_QUERY } from 'app/queries/cart';
import { COLLECTIONS_QUERY } from "app/queries/models"
import GL from '@components/GL';
import { useAtom } from 'jotai';
import { model } from '@components/atoms';
import { useEffect, useMemo, useRef, useState } from 'react';
import FwdGL from '@components/GL';







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


export async function loader({ context, params, request }: LoaderArgs) {
  const cartId = await context.session.get('cartId');
  const { handle } = params;

  return defer({
    cart: cartId ? getCart(context, cartId) : undefined,
    layout: await context.storefront.query(LAYOUT_QUERY),
    collection: await context.storefront.query(COLLECTIONS_QUERY, {
      variables: {
        handle
      },
    })
  });
}

export default function App() {
  const data: any = useLoaderData<typeof loader>() || {};
  const [stableData, setData] = useState<any>(data);
  const prices:any = []
  const [m, setM] = useAtom(model)
  const { name } = data.layout.shop;
  
  useEffect(() => {
    stableData && stableData.collection.collections.nodes.map((node: any) => {
      node.products.edges.map((edge: any, index: number) =>
        Object.values(edge).map((edgeItem: any) => {
          edgeItem.media.nodes.map((med: any) => {
            if (med.mediaContentType === 'MODEL_3D') {
              if (!m.find((item: any) => item.name === edgeItem.handle)) {
                m.push({ name: edgeItem.handle, url: `${med.sources[0].url}`, collection: node.handle, price:  prices[index] })
              }
            }
          })
        })
      )
    })

    data && setData(data)
    stableData && stableData.collection.collections.nodes.map((node: any) => {
      node.products.edges.map((edge: any) =>
        Object.values(edge).map((edgeItem: any) => 
        edgeItem.variants.nodes.map((node:any)=>
        Object.values(node).map((item:any)=>{
if(Object.prototype.toString.call(item) === "[object Object]"){
  prices.push(item.amount)
}
      }))))})



  }, [stableData])


  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Seo />
        <Meta />
        <Links />
      </head>
      <body className="">
        <Layout title={name} />
        <Scripts />
        <GL />
        <ScrollRestoration />

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
