import { Toaster } from "@/components/ui/toaster"
import { AddSecretDialogProvider } from "@/components/providers/add-secret-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"

import { MainPage } from "./pages/main-page"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <AddSecretDialogProvider>
        <MainPage />
        <Toaster />
      </AddSecretDialogProvider>
    </ThemeProvider>
  )
}

export default App
