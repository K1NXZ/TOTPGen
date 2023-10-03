import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

interface UIState {
  disclaimer: boolean
  toggleDisclaimer: () => void
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        disclaimer: true,
        toggleDisclaimer: () =>
          set((state) => ({
            disclaimer: !state.disclaimer,
          })),
      }),
      { name: "ui-store" }
    )
  )
)
