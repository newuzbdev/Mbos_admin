import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ContractCreateInputs from "@/components/pages/servicises/ContractCreateInputs";
import { useState } from "react";

const ServicesCreate = () => {
  const [open, setOpen] = useState(false);

  // const closeDialog = () => {
  //   setOpen(false);
  // };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="p-2 text-white border rounded-md bg-primary">
        Shartnoma yaratish
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        {/* <ServicesCreateInputs closeDialog={closeDialog} /> */}
        <ContractCreateInputs />
      </DialogContent>
    </Dialog>
  );
};

export default ServicesCreate;
