import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAddSecretDialog } from "@/components/providers/add-secret-provider"
import {
  EditSecretForm,
  editSecretFormId,
} from "@/components/shared/forms/edit-secret-form"

export function AddSecretDialog() {
  const { isOpen, setOpen } = useAddSecretDialog()

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Secret</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full w-full shrink">
          <div className="p-4">
            <EditSecretForm onFinish={() => setOpen(false)} />
          </div>
        </ScrollArea>
        <DialogFooter className="shrink-0 px-4">
          <Button type="submit" form={editSecretFormId} size="sm">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
