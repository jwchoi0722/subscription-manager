import { create } from 'zustand';

import type { Subscription } from "./data";

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