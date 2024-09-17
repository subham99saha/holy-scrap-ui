import React, { useState, useEffect } from 'react';
import axios from "axios";
import ProductCard from './ProductCard';
// import data from './products.json';

const App = () => {
  const [products, setProducts] = useState([]); // Start with null to indicate loading
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading,setloading] = useState(false)

  useEffect(() => {
    // Simulate processing delay
    

    // processProducts(); // Run the function to process data
  }, []);

  const processProducts = (data) => {
    // Clean price and discountedPrice by removing ₹ symbol, handling missing discountedPrice, and sorting by discountedPrice
    const cleanedProducts = data.map((product) => {
      const cleanPrice = (product.price) ? product.price.replace('₹', '').trim() : '';
      let cleanDiscountedPrice = (product.discountedPrice) ? product.discountedPrice.replace('₹', '').trim() : '';

      // If discountedPrice is missing or empty, assign price to discountedPrice
      if (!cleanDiscountedPrice) {
        cleanDiscountedPrice = cleanPrice;
      }

      return {
        ...product,
        price: cleanPrice,
        discountedPrice: cleanDiscountedPrice
      };
    });

    // Sort products by discountedPrice (assuming it's a number in the JSON)
    // const sortedProducts = cleanedProducts.sort((a, b) => parseInt(a.discountedPrice) - parseInt(b.discountedPrice));

    setloading(false)
    setProducts(cleanedProducts); // Update state with processed data
  };

  const handleSearch = () => {
    setloading(true)
    console.log('Search started')
    axios.post(`http://localhost:5000/scrape/`, {
        "query": searchTerm,
        "scpMTRA": true, 
        "scpAMZN": true,
        "scpFLPKT": true,
    }, {
      headers: {
          'Content-Type': 'application/json', 
      }
    }).then((result)=>{
        console.log(result.data)
        processProducts(result.data.message)
    }).catch(err => {
        console.log({err})
    });
    // const filtered = products.filter(product =>
    //   product.productTitle.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    // setFilteredProducts(filtered);
  };

  const handleFilter = () => {
    const sortedProducts = products.sort((a, b) => parseInt(a.discountedPrice.replace('₹', '').replace(',', '').trim()) - parseInt(b.discountedPrice.replace('₹', '').replace(',', '').trim()));
    console.log({sortedProducts})
    setProducts(sortedProducts)
  }

  // if (!products) {
  //   // Show loading state while processing
  //   return <div className="text-center mt-4">Loading products...</div>;
  // }

  return (
    <div className="container mx-auto p-4 py-40">
      <h1 className="text-3xl font-bold mb-4 text-center">Product Search</h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          className="border border-gray-300 p-2 w-1/2 rounded-md"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Search
        </button>
        <button
          onClick={handleFilter}
          className="ml-2 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-600 flex"
        >
          By Price <svg className='ml-5' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 mx-20">
        { !loading ? products.map((product, index) => (
          <ProductCard key={index} product={product} />
        )) : 'Loading Results...'}
      </div>
    </div>
  );
};

export default App;
