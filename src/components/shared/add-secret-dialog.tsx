import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAddSecretDialog } from "@/components/providers/add-secret-provider"
import {
  AddSecretForm,
  AddSecretFormId,
} from "@/components/shared/forms/add-secret-form"

export function AddSecretDialog() {
  const { isOpen, setOpen } = useAddSecretDialog()

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add TOTP-Secret</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full w-full shrink">
          <div className="p-4">
            <AddSecretForm onFinish={() => setOpen(false)} />
          </div>
        </ScrollArea>
        <DialogFooter className="shrink-0 px-4">
          <Button
            variant="ghost"
            type="button"
            form={AddSecretFormId}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" form={AddSecretFormId}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
