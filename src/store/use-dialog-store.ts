import { create } from "zustand";

interface DialogState {
    isOpen: boolean;
    component: React.ReactNode;
    open: (component?: React.ReactNode) => void;
    close: () => void;
    setComponent: (component: React.ReactNode) => void;
}

export const useDialogStore = create<DialogState>((set) => ({
    isOpen: false,
    component: null,
    open: (component) => set({ isOpen: true, component }),
    close: () => set({ isOpen: false }),
    setComponent: (component) => set({ component }),
}));