import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import IncomeCreateInput from "./IncomeCreateInput.tsx";

const IncomeCreate = () => {
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="p-2 text-white border rounded-md bg-primary">
          Daromad yaratish
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <IncomeCreateInput closeDialog={closeDialog} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IncomeCreate;
