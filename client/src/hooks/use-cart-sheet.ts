import { create } from "zustand";

interface useCartSheetStoreProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCartSheetStore = create<useCartSheetStoreProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
