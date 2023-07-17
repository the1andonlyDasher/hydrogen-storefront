import { WebGLFrame } from '@context';
import {Link} from '@remix-run/react';
import {Image, MediaFile, Money} from '@shopify/hydrogen';

function ProductGallery({media}:any) {
  if (!media.length) {
    return null;
  }

  const typeNameMap:any = {
    MODEL_3D: 'Model3d',
    VIDEO: 'Video',
    IMAGE: 'MediaImage',
    EXTERNAL_VIDEO: 'ExternalVideo',
  };

  
  return (


    <div
      className={`grid gap-4 overflow-x-scroll grid-flow-col md:grid-flow-row  md:p-0 md:overflow-x-auto md:grid-cols-2 w-[90vw] md:w-full lg:col-span-2`}
    >
      {media.map((med:any, i:number) => {
        let extraProps = {};

        if (med.mediaContentType === 'MODEL_3D') {

          console.log(`${med.sources[0].url}`)
          extraProps = {
            interactionPromptThreshold: '0',
            ar: true,
            loading: 'eager',
            disableZoom: true,
            style: {height: '100%', margin: '0 auto'},
          };
        }

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
            className={`${
              i % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1'
            // } snap-center card-image bg-white aspect-square md:w-full w-[80vw] shadow-sm rounded`}
            } snap-center card-image  aspect-square md:w-full w-[80vw] shadow-sm rounded`}
            key={data.id || data.image.id}
          >
            <MediaFile
              tabIndex={0}
              className={`w-full h-full aspect-square object-cover`}
              data={data}
              {...extraProps}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function ProductCard({product}:any) {
  const {price, compareAtPrice} = product.variants?.nodes[0] || {};
  const isDiscounted = compareAtPrice?.amount > price?.amount;
  const typeNameMap:any = {
    MODEL_3D: 'Model3d',
    VIDEO: 'Video',
    IMAGE: 'MediaImage',
    EXTERNAL_VIDEO: 'ExternalVideo',
  };

  return (
    <Link to={`/products/${product.handle}`}>
      <div className="grid gap-6">
        <div className="shadow-sm rounded relative">
          {isDiscounted && (
            <label className="subpixel-antialiased absolute top-0 right-0 m-4 text-right text-notice text-red-600 text-xs">
              Sale
            </label>
          )}
        </div>
        <div className="grid gap-1">
          <h4 className="max-w-prose text-copy w-full overflow-hidden whitespace-nowrap text-ellipsis  font-medium">
            {product.title}
          </h4>
          <p>{product.description}</p>
          <div className="flex gap-4">
            <span className="max-w-prose whitespace-pre-wrap inherit text-copy flex gap-4 font-medium text-xl">
              <Money withoutTrailingZeros data={price} />
              {isDiscounted && (
                <Money
                  className="line-through opacity-50"
                  withoutTrailingZeros
                  data={compareAtPrice}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
