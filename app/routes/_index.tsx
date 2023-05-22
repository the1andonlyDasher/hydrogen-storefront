import {Link, useLoaderData} from '@remix-run/react';
import { LoaderArgs } from '@shopify/remix-oxygen';
import {Image} from '@shopify/hydrogen';
import {AnimatePresence, motion} from "framer-motion"
import CollectionsPage from './collectionPage';
import { useEffect, useState } from 'react';


export function meta() {
  return [
    {title: 'Hydrogen'},
    {description: 'A custom storefront powered by Hydrogen'},
  ];
}

export async function loader({context}: LoaderArgs) {
  return await context.storefront.query(COLLECTIONS_QUERY);
}

export default function Index() {
  const {collections}:any = useLoaderData() || {}
  const [stableData, setData] = useState(collections);
  useEffect(()=>{
    collections && setData(collections)
  }, [collections])
  // console.log(collections);
  return (
    <section className="w-full gap-4" >
    <h2 className="whitespace-pre-wrap max-w-prose font-bold text-lead my-3">
      Collections
    </h2>
    <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-3">
      {stableData.nodes.map((collection:any) => {
        return (
          <Link to={`/collections/${collection.handle}`} key={collection.id}>
              
          <div className="grid gap-4">
            {collection?.image && (
              <Image
                alt={`Image of ${collection.title}`}
                data={collection.image}
                key={collection.id}
                sizes="(max-width: 32em) 100vw, 33vw"
              />
            )}
            <h2 className="whitespace-pre-wrap max-w-prose font-medium text-copy">
              {collection.title}
            </h2>
          </div>
        </Link>
        );
      })}
    </div>
  </section>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 3, query: "collection_type:smart") {
      nodes {
        products(first: 100) {
          edges {
          node {
          id
          title
          }
          }
          }
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;
