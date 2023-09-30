import { Eye, EyeOff, Plus } from "lucide-react"

import { useSecretStore } from "@/lib/stores/secret.store"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useAddSecretDialog } from "@/components/providers/add-secret-provider"
import { AddSecretDialog } from "@/components/shared/add-secret-dialog"
import { ThemeToggle } from "@/components/shared/theme-toggle"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { toggleHideSecrets, hideSecrets } = useSecretStore((state) => ({
    toggleHideSecrets: state.toggleHideSecrets,
    hideSecrets: state.hideSecrets,
  }))

  const { setOpen } = useAddSecretDialog()

  return (
    <>
      <header className="container mx-auto flex items-center justify-end py-4">
        <div className="flex gap-2">
          <ThemeToggle />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  variant="outline"
                  aria-label="Toggle Secrets"
                  pressed={hideSecrets}
                  onPressedChange={() => toggleHideSecrets()}
                >
                  {hideSecrets ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Secrets</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button className="gap-2" onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> Add
          </Button>
        </div>
      </header>
      <main className="container mx-auto">{children}</main>
      <AddSecretDialog />
    </>
  )
}
