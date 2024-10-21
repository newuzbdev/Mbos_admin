import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { useState } from "react";
import ProductCreateInput from "./ProductCreateInput";

const ProductCreate = () => {
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="p-2 text-white border rounded-md bg-primary">
          Mahsulot yaratish
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <ProductCreateInput closeDialog={closeDialog} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCreate;
