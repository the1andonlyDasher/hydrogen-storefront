import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';

export default function ProductCard({product}:any) {
  const {price, compareAtPrice} = product.variants?.nodes[0] || {};
  const isDiscounted = compareAtPrice?.amount > price?.amount;

  return (
    <Link to={`/products/${product.handle}`}>
      <div className="grid gap-6">
        <div className="shadow-sm rounded relative">
          {isDiscounted && (
            <label className="subpixel-antialiased absolute top-0 right-0 m-4 text-right text-notice text-red-600 text-xs">
              Sale
            </label>
          )}
          <Image
            data={product.variants.nodes[0].image}
            alt={product.title}
          />
        </div>
        <div className="grid gap-1">
          <h4 className="max-w-prose text-copy w-full overflow-hidden whitespace-nowrap text-ellipsis  font-medium">
            {product.title}
          </h4>
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
