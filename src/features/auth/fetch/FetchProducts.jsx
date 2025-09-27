export const FetchProducts = async () => {
    const URL = 'https://api.redseam.redberryinternship.ge/api'


  const response = await fetch(`${URL}/products`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return data;


};

