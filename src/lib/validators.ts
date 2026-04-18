import { z } from "zod"

export const createOrderSchema = z.object({
  planId: z.string(),
  treeId: z.string().optional(),
  adoptionName: z.string().max(20).optional(),
  address: z.object({
    contactName: z.string().min(2),
    phone: z.string().regex(/^1[3-9]\d{9}$/),
    province: z.string(),
    city: z.string(),
    district: z.string(),
    detail: z.string().min(5),
  }),
})

export type CreateOrderInput = z.infer<typeof createOrderSchema>
