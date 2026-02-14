import { create } from "zustand";

// when need to clear waba selection manually

// export const useWabaStore = create((set) => ({
//   selectedWaba: null,
//   isManuallyCleared: false,
//   showWabaModal: false,

//   selectWaba: (waba) =>
//     set({
//       selectedWaba: waba,
//       isManuallyCleared: false,
//       showWabaModal: false,
//     }),

//   clearWaba: () =>
//     set({
//       selectedWaba: null,
//       isManuallyCleared: true,
//       showWabaModal: true,
//     }),

//   openWabaModal: () =>
//     set({ showWabaModal: true }),

//   closeWabaModal: () =>
//     set({ showWabaModal: false }),
// }));

// simpler version without isManuallyCleared
export const useWabaStore = create((set) => ({
  selectedWaba: null,
  showWabaModal: false,

  selectWaba: (waba) =>
    set({
      selectedWaba: waba,
      showWabaModal: false,
    }),

  openWabaModal: () => set({ showWabaModal: true }),

  closeWabaModal: () => set({ showWabaModal: false }),
}));
