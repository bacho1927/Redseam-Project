export const FetchProductById = async (productId) => {
    const response = await fetch(`https://api.redseam.redberryinternship.ge/api/products/${productId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch product with id ${productId}`);
    }
    return response.json();
};