import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog.tsx";
import {useState} from "react";
import ClientsCreateInput from "@/components/pages/clients/ClientsCreateInput.tsx";

const ClientsCreate = () => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="p-2 text-white border rounded-md bg-primary">
          Mijoz yaratish
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          {/* <ServicesCreateInputs closeDialog={closeDialog} /> */}
          <ClientsCreateInput />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientsCreate;