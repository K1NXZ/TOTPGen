import { AnimatePresence, motion } from "framer-motion"
import { Plus } from "lucide-react"

import { Secret, useSecretStore } from "@/lib/stores/secret.store"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Toaster } from "@/components/ui/toaster"
import { MainLayout } from "@/components/layouts/main-layout"
import {
  AddSecretDialogProvider,
  useAddSecretDialog,
} from "@/components/providers/add-secret-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { SecretCard } from "@/components/shared/secret-card"

function App() {
  const secretState = useSecretStore()

  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <AddSecretDialogProvider>
        <MainLayout>
          <AnimatePresence>
            {secretState.secrets.length > 0 ? (
              <SecretsGrid secrets={secretState.secrets} />
            ) : (
              <Empty />
            )}
          </AnimatePresence>
        </MainLayout>
        <Toaster />
      </AddSecretDialogProvider>
    </ThemeProvider>
  )
}

function SecretsGrid({ secrets }: { secrets: Secret[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 py-4 sm:grid-cols-2 md:py-8 lg:grid-cols-3 xl:grid-cols-4">
      {secrets.map((secret) => (
        <SecretCard key={secret.id} secret={secret} />
      ))}
    </div>
  )
}

function Empty() {
  const { setOpen } = useAddSecretDialog()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card className="mx-auto mt-20 w-fit">
        <CardContent className="px-10 py-4">
          <CardHeader>
            <CardTitle className="text-center font-headline text-2xl font-bold tracking-tight text-foreground">
              No secrets saved yet
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Add a new secret to get started.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button
              variant="secondary"
              className="gap-2"
              onClick={() => setOpen(true)}
            >
              <Plus className="h-4 w-4" /> Add
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default App
