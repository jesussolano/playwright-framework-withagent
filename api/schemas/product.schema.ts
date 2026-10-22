import { z } from 'zod';

export const productSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  price: z.number().positive(),
  in_stock: z.boolean(),
  is_rental: z.boolean(),
  category: z.object({ id: z.string(), name: z.string(), slug: z.string().optional() }),
  brand: z.object({ id: z.string(), name: z.string() }),
});

export const productPageSchema = z.object({
  current_page: z.number().int(),
  per_page: z.number().int(),
  total: z.number().int(),
  data: z.array(productSchema),
});

export const brandListSchema = z.array(z.object({ id: z.string(), name: z.string(), slug: z.string() }));

export const loginResponseSchema = z.object({
  access_token: z.string().min(1),
  token_type: z.string(),
  expires_in: z.number(),
});

export const authErrorSchema = z.object({
  error: z.string().min(1),
});

export type Product = z.infer<typeof productSchema>;
