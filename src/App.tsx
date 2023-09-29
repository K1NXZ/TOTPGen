/** @format */

import { AnimatePresence } from "framer-motion"

import { MainLayout } from "./components/layouts/main-layout"
import { ThemeProvider } from "./components/providers/theme-provider"
import { SecretCard } from "./components/shared/secret-card"
import { Toaster } from "./components/ui/toaster"
import { useSecretStore } from "./lib/stores/secret.store"

function App() {
  const secretState = useSecretStore()

  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <MainLayout>
        <div className="grid grid-cols-1 gap-8 py-4 sm:grid-cols-2 md:py-8 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {secretState.secrets.map((secret) => (
              <SecretCard key={secret.id} secret={secret} />
            ))}
          </AnimatePresence>
        </div>
      </MainLayout>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
