import React from "react"

export const AddSecretDialogContext = React.createContext<{
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}>({
  isOpen: false,
  setOpen: () => {},
})

export function AddSecretDialogProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setOpen] = React.useState(false)
  return (
    <AddSecretDialogContext.Provider value={{ isOpen, setOpen }}>
      {children}
    </AddSecretDialogContext.Provider>
  )
}
