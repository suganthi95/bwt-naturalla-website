import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useDeleteMyAccount } from "@/services/profile";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function DeleteAccountDialog() {
  const { token } = useSelector((state: RootState) => state.auth);
  const navigae = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useDeleteMyAccount();
  const handleDelete = () => {
    console.log("Account deleted");
    mutate(
      {
        token: String(token),
      },
      {
        onSuccess: () => {
          toast.success("Account deleted successfully");
          setIsOpen(false);
          logout();
          navigae("/");
        },
      }
    );
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" /> Delete Account
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account? This action{" "}
            <strong>cannot</strong> be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" disabled={isPending} onClick={handleDelete}>
           {isPending ? 'Deleting...':'Delete'} 
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
