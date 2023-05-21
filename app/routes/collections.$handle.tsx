import {useLoaderData} from '@remix-run/react';
import {LoaderArgs, json} from '@shopify/remix-oxygen';
import ProductGrid from '../components/ProductGrid';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const seo = ({data}:any) => ({
  title: data?.collection?.title,
  description: data?.collection?.description.substr(0, 154),
});

export const handle = {
  seo,
};

export async function loader({params, context, request}:LoaderArgs) {
  const {handle} = params;
  const searchParams = new URL(request.url).searchParams;
  const cursor = searchParams.get('cursor');

  const {collection}:any = await context.storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
      cursor,
    },
  });

  // Handle 404s
  if (!collection) {
    throw new Response(null, {status: 404});
  }

  // json is a Remix utility for creating application/json responses
  // https://remix.run/docs/en/v1/utils/json
  return json({
    collection,
  });
}

export function meta({data}:any){
  return [
    {title: data?.collection?.title ?? 'Collection'},
    {description: data?.collection?.description},
  ];
};

export default function Collection() {
  const {collection}:any = useLoaderData<typeof loader>() || {};
  const [stableData, setData]  = useState(collection);
  useEffect(() => {
    collection && setData(collection)
  }, [collection])
  return (
    <>
           <motion.div
      className="w-full h-full md:col-span-3 sm:overflow-auto relative z-0"
    > 
      <header className="grid w-full gap-8 py-8 justify-items-start">
        <h1 className="text-4xl whitespace-pre-wrap font-bold inline-block">
          {stableData.title}
        </h1>

        {stableData.description && (
          <div className="flex items-baseline justify-between w-full">
            <div>
              <p className="max-w-md whitespace-pre-wrap inherit text-copy inline-block">
                {stableData.description}
              </p>
            </div>
          </div>
        )}
      </header>
      <ProductGrid
        collection={stableData}
        url={`/collections/${stableData.handle}`}
      />
      </motion.div>
    </>
  );
}

const COLLECTION_QUERY = `#graphql
  query CollectionDetails($handle: String!, $cursor: String) {
    collection(handle: $handle) {
      id
      title
      description
      handle
      products(first: 4, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          title
          publishedAt
          handle
          variants(first: 1) {
            nodes {
              id
              image {
                url
                altText
                width
                height
              }
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;
