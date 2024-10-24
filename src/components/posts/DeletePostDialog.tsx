import { PostData } from "@/lib/types";
import { use } from "react";
import { useDeletePostMutation } from "./mutations";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { on } from "events";
import LoadingButton from "../ui/loadingButton";
import { Button } from "../ui/button";

interface DeletePostDialogProps {
  post: PostData;
  open: boolean;
  onClose: () => void;
}

export default function DeletePostDialog({
  post,
  open,
  onClose,
}: DeletePostDialogProps) {
  const mutation = useDeletePostMutation();

  function handleOpenChange(open: boolean) {
    if (!open || mutation.isPending) {
      onClose();
    }
  }
  return <Dialog open={open} onOpenChange={handleOpenChange}>
    <DialogContent >
    <DialogHeader>
        <DialogTitle >Delete Post?</DialogTitle>
        <DialogDescription>Are you sure you want to delete this post?</DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <LoadingButton
          loading={mutation.isPending}
          variant={"destructive"}
          onClick={() => mutation.mutate(post.id ,{
            onSuccess: () => {
              onClose();
            },
          })}
        >
          Delete
        </LoadingButton>
        <Button onClick={onClose} disabled={mutation.isPending}>Cancel</Button>
    </DialogFooter>
    </DialogContent>
  </Dialog>;
}
