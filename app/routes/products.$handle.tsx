import { useLoaderData, useMatches, useFetcher } from '@remix-run/react';
import { LoaderArgs, json } from '@shopify/remix-oxygen';
import { MediaFile, Money, ShopPayButton } from '@shopify/hydrogen-react';
import ProductOptions from '@components/ProductOptions'
import { m, motion, useAnimationControls } from 'framer-motion';
import { motion as motion3d } from "framer-motion-3d"
import { useEffect, useRef, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { model } from '@components/atoms';
import { useLocation } from '@remix-run/react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Camera } from 'three';
import { Environment, PerspectiveCamera, useAspect, useGLTF } from '@react-three/drei';
import { useRoute } from 'wouter';
import { attach } from '@react-three/fiber/dist/declarations/src/core/utils';
import Footer from '@components/Footer';
import { SeoHandleFunction } from '@shopify/hydrogen';

const seo: SeoHandleFunction<typeof loader> = ({data}) => ({
  title: data?.product?.seo?.title,
  description: data?.product?.seo?.description,
});

export const handle = {
  seo,
};

export async function loader({ params, context, request }: LoaderArgs) {
  const storeDomain = context.storefront.getShopifyDomain();
  const { handle } = params;
  const searchParams = new URL(request.url).searchParams;
  const selectedOptions: any = [];

  // set selected options from the query string
  searchParams.forEach((value, name) => {
    selectedOptions.push({ name, value });
  });

  const { product }: any = await context.storefront.query(PRODUCT_QUERY, {

    variables: {
      handle,
      selectedOptions,
    },
  });

  const selectedVariant =
    product.selectedVariant ?? product?.variants?.nodes[0];

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  return json({
    product,
    selectedVariant,
    storeDomain
  });
}


function PrintJson({ data }: any) {
  return (
    <details className="outline outline-2 outline-blue-300 p-4 my-2">
      <summary>Product JSON</summary>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </details>
  );
}

function ProductGallery({ media }: any) {
  const [m, setM] = useAtom(model);
  if (!media.length) {
    return null;
  }

  const typeNameMap: any = {
    MODEL_3D: 'Model3d',
    VIDEO: 'Video',
    IMAGE: 'MediaImage',
    EXTERNAL_VIDEO: 'ExternalVideo',
  };


  return (


    <div
      className={`grid gap-4 overflow-x-hidden grid-flow-col md:grid-flow-row  md:p-0 md:overflow-x-auto md:grid-cols-2 w-[90vw] md:w-full lg:col-span-2`}
    >
      {media.map((med: any, i: number) => {
        let extraProps = {};

        if (med.mediaContentType === 'MODEL_3D') {

          // console.log(`${med.sources[0].url}`)
          extraProps = {
            interactionPromptThreshold: '0',
            ar: true,
            loading: 'eager',
            disableZoom: true,
            style: { height: '100%', margin: '0 auto' },
          };
       

        const data = {
          ...med,
          __typename: typeNameMap[med.mediaContentType] || typeNameMap['IMAGE'],
          image: {
            ...med.image,
            altText: med.alt || 'Product image',
          },
        };

        return (
          <div
            className={`${i % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1'
              // } snap-center card-image bg-white aspect-square md:w-full w-[80vw] shadow-sm rounded`}
              } snap-center card-image  aspect-square md:w-full w-[80vw]  rounded`}
            key={data.id || data.image.id}
          >
            <MediaFile
              tabIndex={0}
              className={`w-full h-full aspect-square object-cover model-viewer`}
              data={data}
              {...extraProps}
            />
          </div>
        );
      }
      })}
    </div>
  );
}

function ProductForm({ variantId }: any) {
  const [root] = useMatches();
  const selectedLocale = root?.data?.selectedLocale;
  const fetcher = useFetcher();

  const lines = [{ merchandiseId: variantId, quantity: 1 }];

  return (
    <fetcher.Form action="/cart" method="post" className='w-full'>
      <input type="hidden" name="cartAction" value={'ADD_TO_CART'} />
      <input
        type="hidden"
        name="countryCode"
        value={selectedLocale?.country ?? 'US'}
      />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      <button className="self-start bg-black text-white my-4 px-6 py-3 w-full rounded-md text-center font-medium ">
        In den Warenkorb
      </button>
    </fetcher.Form>
  );
}



export default function ProductHandle() {
  const [m, setM]:any = useAtom(model)
  const [productModel, setModel] = useState<any>();
  const loc = useLocation();
  const { handle }: any = useLoaderData<typeof loader>() || {};
  const { product, selectedVariant, storeDomain }: any = useLoaderData<typeof loader>() || {};
  const [stableProductData, setProductData] = useState(product)
  const [stableSelectedVariantData, setSelectedVariantData] = useState(selectedVariant)
  const [stableStoreDomainData, setStoreDomainData] = useState(storeDomain)
  const [stableHandleData, setHandleData] = useState(handle)
  const orderable = selectedVariant?.availableForSale || false;
  const setAnime = useSetAtom(model)

  useEffect(() => {

    product && setProductData(product);
    selectedVariant && setSelectedVariantData(selectedVariant);
    storeDomain && setStoreDomainData(storeDomain)
    handle && setHandleData(handle)

  }, [product, selectedVariant, storeDomain, handle])



  

  return (
<>
    <section>
      {/* <div className="grid items-start gap-6 lg:gap-20 md:grid-cols-2 lg:grid-cols-3"> */}
      <div className="product-grid w-full max-w-full  grid items-start gap-6 lg:gap-10 md:grid-cols-[repeat(2,_minmax(auto,_1fr))]">
        <div className=" product max-h-[500px] w-full max-w-full grid md:grid-flow-row md:p-0  md:grid-cols-2 md:w-full lg:col-span-2">
          <div className="md:col-span-2 snap-center card-image aspect-square md:w-full w-[80vw]  rounded">
            <div
              className={`grid gap-4  grid-flow-col md:grid-flow-row  md:p-0  md:grid-cols-2 w-[90vw] md:w-full lg:col-span-2`}
            ></div>
            {/* <Canvas style={{zIndex: 100}}>
              <color args={["lime"]} attach="background" />
              <Environment preset='dawn'/>
               <P/>
            </Canvas> */}
                      {/* <ProductGallery media={stableProductData.media.nodes} /> */}
          </div>
        </div>
        <div className="grid gap-2 name">
            <h1 className="text-4xl font-bold leading-10 whitespace-normal">
              {stableProductData.title}
            </h1>
            <span className="max-w-prose whitespace-pre-wrap inherit text-copy opacity-50 font-medium">
              {stableProductData.vendor}
            </span>
            <Money
            withoutTrailingZeros
            data={stableSelectedVariantData.price}
            className="text-xl font-semibold mb-2"
          />
          </div>
          <div className='grid gap-2 desc border-t border-[#222] md:pt-6'>
          <p>{stableProductData.descriptionHtml}</p>
          </div>
        <div className=" buy grid">

         {/* {stableSelectedVariantData && <ProductOptions options={stableProductData.options} selectedVariant={stableSelectedVariantData} />}  */}
          {orderable && (
              <div className="flex flex-wrap space-y-2 max-w-[400px]">
                <ShopPayButton
                  storeDomain={stableStoreDomainData}
                  variantIds={[stableSelectedVariantData?.id]}
                  className='w-full flex flex-auto'
                  width='auto'
                />
                <ProductForm variantId={stableSelectedVariantData?.id} className='w-full flex flex-auto'/>
              </div>
          )}
          {/* <div
            className="prose border-t border-gray-200 pt-6 text-black text-md"
          /> */}
        </div>
      </div>
    </section>
<Footer/>
</>
  );
}

const PRODUCT_QUERY = `#graphql
  query product($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    product(handle: $handle) {
      id
      title
      handle
      vendor
      descriptionHtml
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
      options {
        name,
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
        image {
          id
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
        sku
        title
        unitPrice {
          amount
          currencyCode
        }
        product {
          title
          handle
        }
      }
      variants(first: 1) {
        nodes {
          id
          title
          availableForSale
          price {
            currencyCode
            amount
          }
          compareAtPrice {
            currencyCode
            amount
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;


