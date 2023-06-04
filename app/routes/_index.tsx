import { Link, useLoaderData } from '@remix-run/react';
import { LoaderArgs } from '@shopify/remix-oxygen';
import { Image } from '@shopify/hydrogen';
import { AnimatePresence, motion } from "framer-motion"
import CollectionsPage from './collectionPage';
import { useEffect, useState } from 'react';
import { model } from '@components/atoms';
import { useAtom } from 'jotai';


export function meta() {
  return [
    { title: 'Hydrogen' },
    { description: 'A custom storefront powered by Hydrogen' },
  ];
}

export async function loader({ context }: LoaderArgs) {
  return await context.storefront.query(COLLECTIONS_QUERY);
}

export default function Index() {
  const { collections }: any = useLoaderData() || {}
  const [stableData, setData] = useState(collections);
  const [m, setM] = useAtom(model)
  useEffect(() => {
    collections && setData(collections)
    stableData && stableData.nodes.map((node: any) => {
      node.products.edges.map((edge: any) =>
        Object.values(edge).map((edgeItem: any) => {
          edgeItem.media.nodes.map((med: any) => {
            if (med.mediaContentType === 'MODEL_3D') {
              if (!m.find((item: any) => item.name === edgeItem.handle)) {
                m.push({ name: edgeItem.handle, url: `${med.sources[0].url}`, collection: node.handle }), console.log("pushed")
              }
            }
          })
        })
      )
    })


  }, [collections])
  // console.log(collections);
  return (
    <section className="w-full gap-4" >
      <h2 className="whitespace-pre-wrap max-w-prose font-bold text-lead my-3">
        Collections
      </h2>
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-3">
        {stableData.nodes.map((collection: any) => {
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
          handle
          title
          media(first: 10) {
            nodes {
              ... on MediaImage {
                mediaContentType
                image {
                  id
                  url
                  altText
                  width
                  height
                }
              }
              ... on Model3d {
                id
                mediaContentType
                sources {
                  mimeType
                  url
                }
              }
            }
          }
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
