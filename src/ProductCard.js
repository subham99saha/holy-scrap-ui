import React from 'react';

const ProductCard = ({ product }) => {
    const productSource = (product.itemLink) ? product.itemLink.includes('myntra')
        ? 'myntra.png'
        : product.itemLink.includes('amazon')
        ? 'amazon.jpg'
        : product.itemLink.includes('flipkart')
        ? 'flipkart.png'
        : product.itemLink.includes('ajio')
        ? 'ajio.webp'
        : 'Other'
    : ''
    ;

    return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${product.imageUrl})` }}
      ></div>
      <div className="p-4 grid place-content-between min-h-68">
        <div className=''>
            <a
            href={product.itemLink}
            className=""
            target="_blank"  // Opens the link in a new tab
            rel="noopener noreferrer"  // Security measure for external links
            >
            {product.productTitle ? <h2 className="text-base font-semibold mb-2">{product.productTitle}</h2>
            : <span className='text-xs text-gray-600'>Sponsored</span>}</a>
        </div>
        <div className=''>
            <p className="text-sm text-gray-600 font-semibold mb-2">
            {parseFloat(product.discountedPrice) != 0 && (
            <span className='mr-3'>Rs. {product.discountedPrice}</span>
            )}
            {parseFloat(product.price) != 0 && (
                <span className='font-light'><s>Rs. {product.price}</s></span>
            )}
            </p>
            {parseFloat(product.rating) != 0 && (
            <p className="text-xs font-bold mb-2">{product.rating} <span className='text-yellow-400'>⭐</span> {parseFloat(product.ratingCount) != 0 ? `(${product.ratingCount})` : ''}</p>
            )}
            {/* <p className="text-gray-700 font-bold mb-2">{productSource}</p> Display product source */}
        </div>
        <div className="mt-3">
          <img src={`${process.env.PUBLIC_URL}/images/logos/${productSource}`} class="h-10 w-10" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
