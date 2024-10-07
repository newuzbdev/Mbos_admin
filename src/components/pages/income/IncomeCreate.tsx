import {useState} from "react";
import {Dialog, DialogTrigger, DialogContent} from "@/components/ui/dialog.tsx";
import IncomeCreateInput from "@/components/pages/income/IncomeCreateInput.tsx";

const IncomeCreate = () => {
  const [open, setOpen] = useState(false)
  const closeDialog = () => {
    setOpen(false)
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="p-2 text-white border rounded-md bg-primary">
          Daromat qo'shish
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <IncomeCreateInput closeDialog={closeDialog} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IncomeCreate;