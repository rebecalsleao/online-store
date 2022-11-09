export async function getCategories() {
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const date = await request.json();
  return date;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
    const date = await request.json();
    return date;
  } catch (e) {
    console.log('erro:', e);
  }
}

export async function getProductById(productId) {
  // Esta implementação específica não é avaliada, mas pode ajudar você
  const request = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const date = await request.json();
  return date;
}
