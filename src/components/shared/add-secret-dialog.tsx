/** @format */

import React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  EditSecretForm,
  editSecretFormId,
} from "@/components/shared/forms/edit-secret-form"

import { ScrollArea } from "../ui/scroll-area"

export function AddSecretDialog({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">{children}</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen shrink-0 px-0">
        <DialogHeader className="px-4">
          <DialogTitle>Add Secret</DialogTitle>
          {/* <DialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription> */}
        </DialogHeader>
        <ScrollArea className="h-full w-full shrink">
          <div className="p-4">
            <EditSecretForm onFinish={() => setIsOpen(false)} />
          </div>
        </ScrollArea>
        <DialogFooter className="shrink-0 px-4">
          <Button type="submit" form={editSecretFormId}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
