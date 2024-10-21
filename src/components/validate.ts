import { z } from "zod";

export const FormSchema = z
  .object({
    description: z.string().optional(),
    tolash_sana: z.date().optional(),

    // tolash_sana: z.string().optional(),
  })
  .catchall(
    z.union([
      
      z.string().nonempty("Maydon bo'sh qator bo'lishi mumkin emas"),
      z.number().min(1, "Maydon ijobiy raqam bo'lishi kerak"),
    ])
  );
