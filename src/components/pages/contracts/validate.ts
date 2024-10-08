import { z } from "zod";

export const FormSchema = z
  .object({})
  .catchall(
    z.union([
      z.string().nonempty("Maydon bo'sh qator bo'lishi mumkin emas"),
      z.number().min(1, "Maydon ijobiy raqam bo'lishi kerak"),
    ])
  );
