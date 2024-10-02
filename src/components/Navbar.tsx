import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { LogOut } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-start justify-end w-full gap-3 px-5 py-3 border-b shadow">
      <ModeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <AlertDialog>
            <AlertDialogTrigger>
              <LogOut className="w-8 h-5 mt-2 mr-2" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-500 hover:bg-red-600">
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
