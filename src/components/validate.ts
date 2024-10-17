import { z } from "zod";

export const FormSchema = z
  .object({
    marta: z.string().optional(),
    dona: z.string().optional(),
  })
  .catchall(
    z.union([
      z.string().nonempty("Maydon bo'sh qator bo'lishi mumkin emas"),
      z.number().min(1, "Maydon ijobiy raqam bo'lishi kerak"),
    ])
  );
