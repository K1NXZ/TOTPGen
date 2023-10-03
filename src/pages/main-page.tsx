import { AnimatePresence } from "framer-motion"

import { useSecretStore } from "@/lib/stores/secret.store"
import { MainLayout } from "@/components/layouts/main-layout"
import { Disclaimer } from "@/components/shared/disclaimer"
import { SecretGrid } from "@/components/shared/secret-grid"

export function MainPage() {
  const secretState = useSecretStore()

  return (
    <MainLayout>
      <AnimatePresence>
        <Disclaimer />
        <SecretGrid secrets={secretState.secrets} />
      </AnimatePresence>
    </MainLayout>
  )
}
