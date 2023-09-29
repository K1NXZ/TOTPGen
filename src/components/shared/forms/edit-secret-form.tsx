/** @format */

import { zodResolver } from "@hookform/resolvers/zod"
import { URI as OTPAuthURI } from "otpauth"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  secretOptionAlgorithm,
  useSecretStore,
} from "@/lib/stores/secret.store"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const editSecretFormSchema = z.object({
  issuer: z.string().trim(),
  label: z.string().trim().optional(),
  secret: z.string().trim().min(1, "Secret can't be empty"),
  algorithm: z.enum(secretOptionAlgorithm),
  digits: z.coerce.number(),
  period: z.coerce.number(),
})

type EditSecretFormInput = z.infer<typeof editSecretFormSchema>

export const editSecretFormId = "edit-secret-form"

export function EditSecretForm({ onFinish }: { onFinish: () => void }) {
  const { addSecret } = useSecretStore()

  const form = useForm<EditSecretFormInput>({
    resolver: zodResolver(editSecretFormSchema),
    defaultValues: {
      issuer: "",
      secret: "",
      label: "",
      algorithm: "SHA1",
      digits: 6,
      period: 30,
    },
  })

  function onSubmit(input: EditSecretFormInput) {
    addSecret(input)
    onFinish()
  }

  function checkURI(value: string) {
    try {
      const url = new URL(value)
      if (url.protocol !== "otpauth:") {
        throw new Error("Invalid protocol")
      }
      const totp = OTPAuthURI.parse(value)
      const parsed = editSecretFormSchema.parse({
        issuer: totp.issuer,
        label: totp.label,
        secret: totp.secret.base32,
        algorithm: totp.algorithm,
        digits: totp.digits,
        period: 30,
      })
      Object.entries(parsed).forEach(([key, value]) => {
        form.setValue(key as keyof EditSecretFormInput, value)
      })
    } catch {
      // Ignore
    }
  }

  return (
    <Form {...form}>
      <form
        id={editSecretFormId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="secret"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secret or URI</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onBlur={(e) => {
                    checkURI(e.target.value)
                    field.onBlur()
                  }}
                  className="font-mono"
                />
              </FormControl>
              <FormDescription>
                The secret key or the URI of the secret.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="issuer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issuer</FormLabel>
              <FormControl>
                <Input placeholder="ACME" {...field} />
              </FormControl>
              <FormDescription>
                The service that issued the secret.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormDescription>
                Anything that lets you identify the secret. Something like
                username or email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="digits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Digits</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The amount of digits the code should have. Usually 6 or 8.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="period"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Period</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The number of seconds that the token is valid for.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="algorithm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Algorithm</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an algorithm" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {secretOptionAlgorithm.map((algorithm) => (
                    <SelectItem key={algorithm} value={algorithm}>
                      {algorithm}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
