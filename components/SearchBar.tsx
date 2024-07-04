"use client";

import { sracpeAndStoreProduct } from '@/lib/actions';
import { FormEvent, useState } from 'react'

const SearchBar = () => {

  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidAmazonProductUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const hostName = parsedUrl.hostname;

      // Check if hostname is amazon.com
      if (
        hostName.includes("amazon.com") ||
        hostName.includes("amazon.") ||
        hostName.endsWith("amazon")
      ) {
        return true;
      }
    } catch (error) {
      console.log("Validation error: ", error);
      return false;
    }
    return false;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidUrl = isValidAmazonProductUrl(searchPrompt);

    if (!isValidUrl) {
      alert('Invalid Amazon product URL');
      return;
    }

    try {
      setIsLoading(true);
      
      // Scrape the product details
      const product = await sracpeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
      <input
        type="text"
        name=""
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder='Enter product link'
        className='searchbar-input'
      />
      <button
        disabled={searchPrompt === '' || isLoading}
        type='submit'
        className='searchbar-btn'
      >
        {
          isLoading ? 'Searching...' : 'Search'
        }
      </button>
    </form>
  )
}

export default SearchBar