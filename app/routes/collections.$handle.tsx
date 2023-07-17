import {useLoaderData} from '@remix-run/react';
import {LoaderArgs, json} from '@shopify/remix-oxygen';
import { useEffect, useRef, useState } from 'react';
import ProductCard from '@components/ProductCard';


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
  const {collection}:any = useLoaderData() || {};
  const [stableData, setData]  = useState(collection);
  const [products, setProducts] = useState(stableData.products.nodes || []);

  useEffect(() => {
    collection && setData(collection);
    stableData &&  setProducts((prev:any) => [...prev, ...collection.products.nodes]);
    console.log(products)
  }, [collection])

  const ref = useRef<any>(!null);
  const caption = useRef<any>(!null);
  const scroll = useRef<any>(0);
  return ( <>
  <div
  ref={ref}
  onScroll={(e:any) => {
    scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight)
    caption.current.innerText = scroll.current.toFixed(2)
  }}
  className="mainScroll scroll">
    {products.map((product:any, index: number) => (
  <div style={{ height: "200vh" }}>
    <div className="dot">
          <ProductCard key={product.id + index} product={product} />
          </div>
    </div>
    ))}

 
  <span className="caption" ref={caption}>
    0.00
  </span>
</div>
  </> );
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
