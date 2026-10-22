export const endpoints = {
  products: '/products',
  product: (id: string) => `/products/${id}`,
  search: '/products/search',
  brands: '/brands',
  categories: '/categories/tree',
  login: '/users/login',
} as const;
