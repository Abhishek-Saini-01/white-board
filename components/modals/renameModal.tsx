"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useRenameModel } from "@/store/useRenameModal";
import { FormEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const RenameModal = () => {
    const {
        isOpen,
        onClose,
        initialValues
    } = useRenameModel();
    const [title, setTitle] = useState(initialValues.title);
    useEffect(() => {
        setTitle(initialValues.title)
    }, [initialValues.title])
    
    const { mutate,pending } = useApiMutation(api.board.update);
    const onSubmit:FormEventHandler<HTMLFormElement> = (
        e,
    ) => {
        e.preventDefault();

        mutate({
            id: initialValues.id,
            title
        }).then(() => {
            toast.success("Board title updated")
            onClose();
        }).catch(() => {
            toast.error("Failed to update title");
        })
    }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Edit board title
                </DialogTitle>
            </DialogHeader>
            <DialogDescription>
                Enter a new title for this board
            </DialogDescription>
            <form onSubmit={onSubmit} className="space-y-4">
                <Input 
                    disabled={pending}
                    required
                    maxLength={60}
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder="Borad title"
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button  type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button disabled={pending} type="submit">
                        Save
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>        
    </Dialog>
  )
}

export default RenameModal