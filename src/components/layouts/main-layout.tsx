/** @format */

import { AddSecretDialogProvider } from "@/contexts/AddSecretDialogContext"
import { Eye, EyeOff, Plus } from "lucide-react"

import { useSecretStore } from "@/lib/stores/secret.store"
import { Toggle } from "@/components/ui/toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AddSecretDialog } from "@/components/shared/add-secret-dialog"
import { ThemeToggle } from "@/components/shared/theme-toggle"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { toggleHideSecrets, hideSecrets } = useSecretStore((state) => ({
    toggleHideSecrets: state.toggleHideSecrets,
    hideSecrets: state.hideSecrets,
  }))

  return (
    <AddSecretDialogProvider>
      <header className="container mx-auto flex items-center justify-between py-4">
        <span className="font-headline text-2xl font-bold tracking-tight">
          {/* onetimecode.app */}
        </span>
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
          <AddSecretDialog>
            <Plus className="h-4 w-4" /> Add
          </AddSecretDialog>
        </div>
      </header>
      <main className="container mx-auto">{children}</main>
    </AddSecretDialogProvider>
  )
}
