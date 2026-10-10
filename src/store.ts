import { create } from 'zustand';
import { persist } from 'zustand/middleware'

import type { Subscription } from "./data";

const APP_STORAGE_KEY: string = "app-storage";

interface AppState {
  isTestMode: boolean
  setTestMode: (isTestMode: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isTestMode: false,
      setTestMode: (isTestMode: boolean) => set(() => ({ isTestMode: isTestMode }))
    }),
    {
      name: APP_STORAGE_KEY
    }
  )
);

interface SubscriptionModalState {
  addModalInitialValues: Subscription | null
  setAddModalInitialValues: (sub: Subscription | null) => void
  isAddModalOpen: boolean
  setIsAddModalOpen: (isOpen: boolean) => void
  editModalInitialValues: Subscription | null
  setEditModalInitialValues: (sub: Subscription | null) => void
  isEditModalOpen: boolean
  setIsEditModalOpen: (isOpen: boolean) => void
  deleteModalInitialValues: Subscription | null
  setDeleteModalInitialValues: (sub: Subscription | null) => void
  isDeleteDialogOpen: boolean
  setIsDeleteDialogOpen: (isOpen: boolean) => void
  detailsModalValues: Subscription | null
  setDetailsModalValues: (sub: Subscription | null) => void
  isDetailsModalOpen: boolean
  setIsDetailsModalOpen: (isOpen: boolean) => void
}

export const useSubscriptionModalStore = create<SubscriptionModalState>()((set) => ({
  addModalInitialValues: null,
  setAddModalInitialValues: (sub: Subscription | null) => set(() => ({ addModalInitialValues: sub })),
  isAddModalOpen: false,
  setIsAddModalOpen: (isOpen: boolean) => set(() => ({ isAddModalOpen: isOpen })),
  editModalInitialValues: null, 
  setEditModalInitialValues: (sub: Subscription | null) => set(() => ({ editModalInitialValues: sub })),
  isEditModalOpen: false,
  setIsEditModalOpen: (isOpen: boolean) => set(() => ({ isEditModalOpen: isOpen})),
  deleteModalInitialValues: null,
  setDeleteModalInitialValues: (sub: Subscription | null) => set(() => ({ deleteModalInitialValues: sub })),
  isDeleteDialogOpen: false,
  setIsDeleteDialogOpen: (isOpen: boolean) => set(() => ({ isDeleteDialogOpen: isOpen})),
  detailsModalValues: null,
  setDetailsModalValues: (sub: Subscription | null) => set(() => ({ detailsModalValues: sub })),
  isDetailsModalOpen: false,
  setIsDetailsModalOpen: (isOpen: boolean) => set(() => ({ isDetailsModalOpen: isOpen }))
}));

interface SubscriptionListState {
  selectedServices: Set<string>
  setServiceSelectState: (service: string, isSelected: boolean) => void
  setAllServicesUnselected: () => void
  selectedCategories: Set<string>
  setCategorySelectState: (category: string, isSelected: boolean) => void
  setAllCategoriesUnselected: () => void
  isUncategorizedSelected: boolean
  setUncategorizedSelected: (isSelected: boolean) => void
}

export const useSubscriptionListStore = create<SubscriptionListState>()((set) => ({
  selectedServices: new Set(),
  setServiceSelectState: (service: string, isSelected: boolean) => set((state) => {
    const newSet: Set<string> = new Set(state.selectedServices);
    if (isSelected) {
      newSet.add(service);
    }
    else {
      newSet.delete(service);
    }
    return { selectedServices: newSet };
  }),
  setAllServicesUnselected: () => set(() => ({ selectedServices: new Set() })),
  selectedCategories: new Set(),
  setCategorySelectState: (category: string, isSelected: boolean) => set((state) => {
    const newSet: Set<string> = new Set(state.selectedCategories);
    if (isSelected) {
      newSet.add(category);
    }
    else {
      newSet.delete(category);
    }

    return { selectedCategories: newSet };
  }),
  setAllCategoriesUnselected: () => set(() => ({ selectedCategories: new Set(), isUncategorizedSelected: false })),
  isUncategorizedSelected: false,
  setUncategorizedSelected: (isSelected: boolean) => set(() => ({ isUncategorizedSelected: isSelected }))
}));
