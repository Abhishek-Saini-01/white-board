import { create } from "zustand";

const defaultValues = {
    id: "",
    title: "",
}

interface IRenameModel {
    initialValues: typeof defaultValues;
    isOpen: boolean;
    onOpen: (id:string, title: string) => void;
    onClose: () => void;
}

export const useRenameModel = create<IRenameModel>((set)=>({
    isOpen: false,
    onOpen: (id, title) => set({
        isOpen: true,
        initialValues: { id, title }
    }),
    onClose: () => set({
        isOpen: false,
        initialValues: defaultValues
    }),
    initialValues: defaultValues
}))