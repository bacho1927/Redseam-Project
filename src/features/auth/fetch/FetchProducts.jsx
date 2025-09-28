
export const FetchProducts = async ({ page = 1, sort = 'default', minPrice = '', maxPrice = '' }) => {
  const baseUrl = 'https://api.redseam.redberryinternship.ge/api/products';

  const params = new URLSearchParams();

  params.append('page', page);

  if (sort !== 'default') {
    
    params.append('sort', sort);
  }

  
  if (minPrice) {
    
    params.append('filter[price_from]', minPrice);
  }
  if (maxPrice) {
    
    params.append('filter[price_to]', maxPrice);
  }
  

  const url = `${baseUrl}?${params.toString()}`;
  

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};