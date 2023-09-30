import React from "react"
import { cva } from "class-variance-authority"
import { motion } from "framer-motion"
import {
  Braces,
  ClipboardCheck,
  KeyRound,
  Link2,
  MoreHorizontal,
  QrCode,
  Trash2,
} from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { CircularProgressbar } from "react-circular-progressbar"

import { useSecretStore, type Secret } from "@/lib/stores/secret.store"
import { useTotp } from "@/hooks/useTotp"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"

export function SecretCard({ secret }: { secret: Secret }) {
  const secretState = useSecretStore()
  const { token, seconds, url, secret: totpSecret } = useTotp(secret.options)
  const [qrcodeOpen, setQrcodeOpen] = React.useState(false)

  const isLoading = !token || !seconds

  async function copyToClipboard() {
    try {
      if (!token) {
        return
      }
      await navigator.clipboard.writeText(token)
      toast({
        title: "Copied to clipboard",
        description: "The token has been copied to your clipboard.",
        duration: 2000,
      })
    } catch (err) {
      console.error(err)
      toast({
        title: "Failed to copy to clipboard",
        description: "An error occurred while copying the token to clipboard.",
        variant: "destructive",
      })
    }
  }

  async function copyURI() {
    try {
      if (!token) {
        return
      }
      await navigator.clipboard.writeText(url)
      toast({
        title: "Copied to clipboard",
        description: "The URI has been copied to your clipboard.",
        duration: 2000,
      })
    } catch (err) {
      console.error(err)
      toast({
        title: "Failed to copy to clipboard",
        description: "An error occurred while copying the URI to clipboard.",
        variant: "destructive",
      })
    }
  }

  async function copySecret() {
    try {
      if (!secret.options.secret) {
        return
      }
      await navigator.clipboard.writeText(totpSecret)
      toast({
        title: "Copied to clipboard",
        description: "The secret has been copied to your clipboard.",
        duration: 2000,
      })
    } catch (err) {
      console.error(err)
      toast({
        title: "Failed to copy to clipboard",
        description: "An error occurred while copying the secret to clipboard.",
        variant: "destructive",
      })
    }
  }

  async function copyJSON() {
    try {
      if (!secret.options.secret) {
        return
      }
      await navigator.clipboard.writeText(JSON.stringify(secret.options))
      toast({
        title: "Copied to clipboard",
        description: "The json has been copied to your clipboard.",
        duration: 2000,
      })
    } catch (err) {
      console.error(err)
      toast({
        title: "Failed to copy to clipboard",
        description: "An error occurred while copying the json to clipboard.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <CardSekeleton />
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Card className="h-full rounded-md">
          <CardHeader className="flex flex-row items-start justify-between py-1 pl-4 pr-2.5">
            <div className="flex flex-col py-2">
              <CardTitle className="font-headline text-lg font-semibold tracking-tight">
                {secret.options.issuer}
              </CardTitle>
              <CardDescription className="text-sm">
                {secret.options.label ? secret.options.label : <>&nbsp;</>}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="gap-2" onSelect={() => copyURI()}>
                  <Link2 className="h-4 w-4" />
                  Copy URI
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="gap-2"
                  onSelect={() => setQrcodeOpen(true)}
                >
                  <QrCode className="h-4 w-4" />
                  QRCode
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="gap-2"
                  onSelect={() => copySecret()}
                >
                  <KeyRound className="h-4 w-4" />
                  Copy Secret
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-2" onSelect={() => copyJSON()}>
                  <Braces className="h-4 w-4" />
                  Copy JSON
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="gap-2 text-destructive hover:!bg-destructive/10 hover:!text-destructive focus-visible:bg-destructive/10 focus-visible:text-destructive"
                  onSelect={() => secretState.deleteSecret(secret.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="flex w-full items-center justify-center px-4 py-8">
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="py-6 font-mono text-2xl font-semibold tabular-nums tracking-[0.3em]"
                    onClick={() => copyToClipboard()}
                  >
                    {secretState.hideSecrets
                      ? Array.from(token).map(() => "*")
                      : token}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="flex items-center gap-2">
                    <ClipboardCheck className="-mt-0.5 h-4 w-4" /> Copy to
                    clipboard
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardContent>
          <CardFooter className="pointer-events-none justify-end pb-3.5 pl-4 pr-3.5">
            <ProgressBar seconds={seconds} period={secret.options.period} />
          </CardFooter>
        </Card>
      </motion.div>

      <Dialog open={qrcodeOpen} onOpenChange={setQrcodeOpen}>
        <DialogContent className="max-h-screen shrink-0 px-0">
          <DialogHeader className="px-4">
            <DialogTitle>QRCode</DialogTitle>
          </DialogHeader>
          <QRCodeSVG
            value={url}
            className="mx-auto h-full w-full max-w-[360px] px-8"
          />
          <DialogFooter className="shrink-0 px-4">
            <Button type="button" onClick={() => setQrcodeOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

const progressBarRootVariants = cva("relative w-[36px] h-[36px]", {
  variants: {
    variant: {
      default: "text-lime-500",
      warn: "text-amber-500",
      desctructive: "text-destructive",
    },
  },
})

const progressBarProgressVariants = cva("", {
  variants: {
    pulse: {
      true: "animate-pulse duration-500",
    },
  },
})

function ProgressBar({ seconds, period }: { seconds: number; period: number }) {
  return (
    <div
      className={progressBarRootVariants({
        variant:
          seconds > 5 ? "default" : seconds > 2 ? "warn" : "desctructive",
      })}
    >
      <CircularProgressbar
        className={progressBarProgressVariants({ pulse: seconds <= 5 })}
        value={((period - seconds) / period) * 100}
        strokeWidth={8}
        styles={{
          trail: {
            stroke: "hsl(var(--secondary))",
          },
          path: {
            strokeLinecap: "round",
            stroke: "currentColor",
            transition: "stroke-dashoffset 1s linear",
          },
        }}
      />
      <span className="absolute left-0 top-0 flex h-[36px] w-[36px] items-center justify-center text-center text-sm font-medium tabular-nums leading-relaxed">
        {seconds}
      </span>
    </div>
  )
}

function CardSekeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Skeleton className="rounded-md border bg-transparent">
        <CardHeader className="flex flex-row items-start justify-between py-1 pl-4 pr-2.5">
          <div className="flex flex-col gap-1 py-2">
            <CardTitle className="font-headline text-lg font-semibold tracking-tight">
              <Skeleton className="h-3 w-24" />
            </CardTitle>
            <CardDescription className="text-sm">
              <Skeleton className="h-3 w-20" />
            </CardDescription>
          </div>
          <Skeleton className="h-10 w-10" />
        </CardHeader>
        <CardContent className="flex w-full items-center justify-center px-4 pt-10">
          <Skeleton className="h-12 w-48" />
        </CardContent>
        <CardFooter className="pointer-events-none justify-end px-4">
          <Skeleton className="h-8 w-8 rounded-full" />
        </CardFooter>
      </Skeleton>
    </motion.div>
  )
}
