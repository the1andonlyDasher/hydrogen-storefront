
import {
  Link,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from '@remix-run/react';
import styles from './styles/style.css';
import favicon from '../public/favicon.ico';
import { type LinksFunction, type LoaderArgs } from '@shopify/remix-oxygen';
import { Layout } from './components/Layout';
import tailwind from './styles/tailwind-build.css';
import { Seo, getShopifyCookies } from '@shopify/hydrogen';
import { defer } from '@shopify/remix-oxygen';
import { CART_QUERY } from 'app/queries/cart';
import { COLLECTIONS_QUERY } from "app/queries/models"
import GL from '@components/GL';
import { useAtom } from 'jotai';
import { model } from '@components/atoms';
import { useEffect, useRef, useState } from 'react';
import { useShopifyCookies } from '@shopify/hydrogen-react';
import { motion, useAnimate, useAnimation, useAnimationControls, useCycle } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookie } from '@fortawesome/free-solid-svg-icons';





export const handle = {
  seo: {
    title: 'Kopfsache by Stephan',
    description:
      'Kopfsache by Stephan ist dein Friseur und Barber Shop in Unterensingen. Entdecke neue Haarschnitte, Styles und Produkte.',
  },
};



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

const cookieWrapper__variants = {
  hidden: { width: "3rem", height: "3rem", transition: { staggerChildren: 0.1, when: "afterChildren", ease: "easeOut", staggerDirection: -1 } },
  open: { width: "100%", height: "100%", transition: { staggerChildren: 0.2, when: "beforeChildren", ease: "easeIn" } }
}

const modal__variants = {
  hidden: { opacity: 0, scaleX: 0, transition: { staggerChildren: 0.1, when: "afterChildren", ease: "easeOut", staggerDirection: -1 } },
  open: { opacity: 1, scaleX: 1, transition: { staggerChildren: 0.2, when: "beforeChildren", ease: "easeIn" } }
}

const element__variants = {
  hidden: { opacity: 0, x: -10, transition: { ease: "easeOut" } },
  open: { opacity: 1, x: 0, transition: { ease: "easeIn" } }
}


export default function App() {
  const [consent, setConsent] = useState(false);
  const [closed, setClosed] = useCycle(false, true);
  const [hovering, setHover] = useState(false);
  useShopifyCookies({ hasUserConsent: consent });
  const data: any = useLoaderData<typeof loader>() || {};
  const [stableData, setData] = useState<any>(data);
  const prices: any = []
  const [m, setM] = useAtom(model)
  const { name } = data.layout.shop;
  const location = useLocation();
  const lastLocationKey = useRef<string>('');


  const Consent = () => {
    return <motion.div initial="hidden" animate={closed ? "hidden" : "open"} variants={cookieWrapper__variants} className='origin-bottom-left flex justify-center items-center fixed bottom-0 left-0 w-full h-full overflow-hidden backdrop-blur-lg z-50'>
      <motion.div variants={modal__variants} className='p-6 flex flex-col justify-start items-center w-full h-full max-h-[700px] max-w-[500px] bg-[#0d0d0d]'>
        <motion.p variants={element__variants} className='m-0'>Wir verwenden</motion.p>
        <motion.h2 variants={element__variants} className='m-0'>Cookies</motion.h2>
        <motion.p className='text-base py-4' variants={element__variants}>
          Diese Website nutzt Cookies und vergleichbare Funktionen zur Verarbeitung von Endgeräteinformationen und personenbezogenen Daten. Die Verarbeitung dient der Einbindung von Inhalten, externen Diensten und Elementen Dritter, der statistischen Analyse/Messung, der personalisierten Werbung oder des Remarketings sowie der Einbindung sozialer Medien. Je nach Funktion werden dabei Daten an Dritte weitergegeben innerhalb der EU. Ihre Einwilligung ist stets freiwillig, für die Nutzung unserer Website nicht erforderlich und kann jederzeit über das Icon unten links abgelehnt oder widerrufen werden.
        </motion.p>
        <motion.div variants={modal__variants} className='mt-auto flex flex-wrap gap-4 justify-between w-full my-4'>
          <motion.button variants={element__variants} type='button' aria-label='Accept cookies' className='border border-white-100 p-4 cursor-pointer bg-white text-black font-bold rounded flex-auto' onClick={() => { setConsent(true), setClosed() }}>Zustimmen</motion.button>
          <motion.button variants={element__variants} type='button' aria-label='Decline cookies' className='border border-white-100 p-4 cursor-pointer bg-none text-white font-bold rounded flex-auto' onClick={() => { setConsent(false), setClosed() }}>Ablehnen</motion.button>
        </motion.div>
        <motion.ul variants={modal__variants} className='flex flex-wrap gap-4 justify-between w-full my-4'>
          <motion.li onClick={() => setClosed()}><Link className='underline-offset-1' to="/Impressum">Impressum</Link></motion.li>
          <motion.li onClick={() => setClosed()}><Link className='underline-offset-1' to="/Datenschutz">Datenschutz</Link></motion.li>
          <motion.li onClick={() => setClosed()}><Link className='underline-offset-1' to="/AGB">AGB</Link></motion.li>
        </motion.ul>
      </motion.div>
      <motion.div
        onClick={() => setClosed()}
        animate={closed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        className='flex flex-row justify-center items-center cursor-pointer w-auto h-12 absolute bottom-0 left-0'>
        <FontAwesomeIcon className='w-12' icon={faCookie} />
      </motion.div>
    </motion.div>
  }

  useEffect(() => {
    // Filter out useEffect running twice
    if (lastLocationKey.current === location.key) return;
    lastLocationKey.current = location.key;
    // This hook is where you can send a page view event to Shopify and other third-party analytics
  }, [location]);

  useEffect(() => {

    if (typeof window !== 'undefined') {
      const get = getShopifyCookies(document.cookie)
      console.log(get)
    }
  }, [consent])

  useEffect(() => {
    stableData && stableData.collection.collections.nodes.map((node: any) => {
      node.products.edges.map((edge: any, index: number) =>
        Object.values(edge).map((edgeItem: any) => {
          edgeItem.media.nodes.map((med: any) => {
            if (med.mediaContentType === 'MODEL_3D') {
              if (!m.find((item: any) => item.name === edgeItem.handle)) {
                m.push({ name: edgeItem.handle, url: `${med.sources[0].url}`, collection: node.handle, price: prices[index] })
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
          edgeItem.variants.nodes.map((node: any) =>
            Object.values(node).map((item: any) => {
              if (Object.prototype.toString.call(item) === "[object Object]") {
                prices.push(item.amount)

              }
            }))))
    })



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
        <Consent />
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

