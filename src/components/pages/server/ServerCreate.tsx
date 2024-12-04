import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { useState } from "react";
import ServerCreateInput from "./ServerCreateInput";

const ServerCreate = () => {
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="p-2 text-white border rounded-md bg-primary">
          Server Qo'shish
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <ServerCreateInput closeDialog={closeDialog} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServerCreate;
