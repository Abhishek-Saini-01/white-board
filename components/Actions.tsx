"use client"

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useRenameModel } from "@/store/useRenameModal";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ConfirmModal from "./ConfirmModal";
  
interface ActionsProps{
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
}

const Actions = ({
    children,
    id,
    title,
    side,
    sideOffset
}:ActionsProps) => {
    const { onOpen } = useRenameModel()

    const onCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`).then(()=>{
            toast.success("Link copied!")
        }).catch(()=>{
            toast.error("Failed to copy link")
        })
    }

    const {mutate,pending} = useApiMutation(api.board.remove);
    const onDeleteBoard = () => {
        mutate({id}).then(()=>{
            toast.success("Board deleted")
        }).catch(()=>{
            toast.error("Failed to delete");
        })
    }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent 
            onClick={(e)=>e.stopPropagation()}
            side={side}
            sideOffset={sideOffset}
            className="w-60"
        >
            <DropdownMenuItem
                className="p-3 cursor-pointer"
                onClick={onCopyLink}
            >
                <Link2 className="h-4 w-4 mr-2"/>
                Copy board link
            </DropdownMenuItem>
            <DropdownMenuItem
                className="p-3 cursor-pointer"
                onClick={() => onOpen(id, title)}
            >
                <Pencil className="h-4 w-4 mr-2"/>
                Rename board
            </DropdownMenuItem>
            <ConfirmModal
                header="Delete Board?"
                description="This will delete the board and all its content permanently"
                disabled={pending}
                onConfirm={onDeleteBoard}
            >
                <Button
                    variant="ghost"
                    className="p-3 cursor-pointer text-sm w-full justify-start font-normal"                    
                >
                    <Trash2 className="h-4 w-4 mr-2"/>
                    Delete
                </Button>
            </ConfirmModal>
            
        </DropdownMenuContent> 
    </DropdownMenu>
  )
}
 
 export default Actions