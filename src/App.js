import React, { useState, useEffect } from 'react';
import axios from "axios";
import ProductCard from './ProductCard';
// import data from './products.json';

const App = () => {

  // const URL = 'http://localhost:5000/'
  const URL = 'https://5745-2405-201-800b-1b7c-6509-887d-75fb-68c7.ngrok-free.app/'

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
    // const cleanedProducts = data.map((product) => {
    //   const cleanPrice = (product.price) ? product.price.replace('₹', '').trim() : '';
    //   let cleanDiscountedPrice = (product.discountedPrice) ? product.discountedPrice.replace('₹', '').trim() : '';

    //   // If discountedPrice is missing or empty, assign price to discountedPrice
    //   // if (!cleanDiscountedPrice) {
    //   //   cleanDiscountedPrice = cleanPrice;
    //   // }

    //   return {
    //     ...product,
    //     price: cleanPrice,
    //     discountedPrice: cleanDiscountedPrice
    //   };
    // });

    // Sort products by discountedPrice (assuming it's a number in the JSON)
    // const sortedProducts = cleanedProducts.sort((a, b) => parseInt(a.discountedPrice) - parseInt(b.discountedPrice));

    setloading(false)
    // setProducts([...products,...cleanedProducts]); // Update state with processed data
    // setProducts([...products,...data]); // Update state with processed data
    setProducts((prevProducts) => [...prevProducts, ...data]);
    // console.log({products})
  };

  const handleSearch = async () => {
    setProducts([])
    setloading(true)
    console.log('Search started')

    axios.post(`${URL}scrape/`, {
        query: searchTerm,        
        site: "scpAMZN"
    }, {
      headers: {
          'Content-Type': 'application/json', 
      }
    }).then((result)=>{
        console.log({amazon: result.data})
        console.log('Amazon scraped')
        processProducts(result.data.message)
    }).catch(err => {
        console.log({err})
    });

    axios.post(`${URL}scrape/`, {
        query: searchTerm,        
        site: "scpFLPKT"
    }, {
      headers: {
          'Content-Type': 'application/json', 
      }
    }).then((result)=>{
        console.log({flipkart: result.data})
        console.log('Flipkart scraped')
        processProducts(result.data.message)
    }).catch(err => {
        console.log({err})
    });

    axios.post(`${URL}scrape/`, {
        query: searchTerm,        
        site: "scpMTRA"
    }, {
      headers: {
          'Content-Type': 'application/json', 
      }
    }).then((result)=>{
        console.log({myntra: result.data})
        console.log('Myntra scraped')
        processProducts(result.data.message)
    }).catch(err => {
        console.log({err})
    });

    axios.post(`${URL}scrape/`, {
      query: searchTerm,        
      site: "scpAJIO"
    }, {
      headers: {
          'Content-Type': 'application/json', 
      }
    }).then((result)=>{
        console.log({ajio: result.data})
        console.log('AJIO scraped')
        processProducts(result.data.message)
    }).catch(err => {
        console.log({err})
    });

  };

  const handleSort = (by) => {
    let sortedProducts = []
    if (by === 'price') {      
      sortedProducts = [...products].sort((a, b) => parseFloat(a.discountedPrice) - parseFloat(b.discountedPrice));
    } else if (by === 'rating') {
      sortedProducts = [...products].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }  else if (by === 'ratingCount') {
      sortedProducts = [...products].sort((a, b) => parseFloat(b.ratingCount) - parseFloat(a.ratingCount));
    } 
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
          onClick={() => handleSort('price')}
          className="ml-2 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-600 flex"
        >
          Price
        </button>
        <button
          onClick={() => handleSort('rating')}
          className="ml-2 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-600 flex"
        >
          Rating
        </button>
        <button
          onClick={() => handleSort('ratingCount')}
          className="ml-2 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-600 flex"
        >
          Rating Count
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 mx-20">
        { !loading ? products.map((product, index) => (
          (product.imageUrl != '') ? <ProductCard key={index} product={product} /> : ''
        )) : 'Loading Results...'}
      </div>
    </div>
  );
};

export default App;
