import { motion } from "framer-motion"
import { AlertCircle, X } from "lucide-react"

import { useUIStore } from "@/lib/stores/ui.store"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function Disclaimer() {
  const uiState = useUIStore()

  if (!uiState.disclaimer) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Alert className="mb-4 mt-8 border-amber-600 pr-14">
        <AlertCircle className="h-4 w-4 stroke-amber-600" />
        <AlertTitle className="text-amber-600">
          Use only for development!
        </AlertTitle>
        <AlertDescription className="text-amber-600">
          Please use this tool only for development. The secrets are stored in
          your browser's local storage. They are not encrypted and can be read
          by anyone who has access to your computer. Also the secrets are not
          synced between devices and will be lost if you clear your browser's
          cache.
        </AlertDescription>
        <div className="absolute right-2 top-2">
          <Button
            size="icon"
            variant="ghost"
            className="text-amber-600 hover:bg-amber-500/20 hover:text-amber-600"
            onClick={() => uiState.toggleDisclaimer()}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </Alert>
    </motion.div>
  )
}
