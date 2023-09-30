import React from "react"
import { AddSecretDialogContext } from "@/contexts/AddSecretDialogContext"

export function useAddSecretDialog() {
  return React.useContext(AddSecretDialogContext)
}
