import React from 'react';

const ProductCard = ({ product }) => {
    const productSource = (product.itemLink) ? product.itemLink.includes('myntra')
        ? 'MYNTRA'
        : product.itemLink.includes('amazon')
        ? 'AMAZON'
        : product.itemLink.includes('flipkart')
        ? 'FLIPKART'
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
            <p className="text-xs text-gray-600 font-semibold mb-2">
            {product.discountedPrice && (
            <span className='mr-3'>Rs. {product.discountedPrice}</span>
            )}
            {product.price && (
                <span className='font-light'><s>Rs. {product.price}</s></span>
            )}
            </p>
            {product.rating && (
            <p className="text-xs font-bold mb-2">{product.rating} <span className='text-yellow-400'>⭐</span> {product.ratingCount ? `(${product.ratingCount})` : ''}</p>
            )}
            <p className="text-gray-700 font-bold mb-2">{productSource}</p> {/* Display product source */}
            {/* <a
            href={product.itemLink}
            className="text-blue-500 hover:text-blue-700"
            target="_blank"  // Opens the link in a new tab
            rel="noopener noreferrer"  // Security measure for external links
            >
            View Product
            </a> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
