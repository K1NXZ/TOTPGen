import { zodResolver } from "@hookform/resolvers/zod"
import { URI as OTPAuthURI } from "otpauth"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  SecretOptionAlgorithm,
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
  issuer: z.string().trim().min(1, "Issuer can't be empty"),
  label: z.string().trim().optional(),
  secret: z
    .string()
    .trim()
    .min(1, "Secret can't be empty")
    .regex(/^([A-Z2-7=])+$/, "Invalid Secret"),

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
    addSecret({
      ...input,
    })
    onFinish()
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
              <FormLabel>URI/Secret</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="font-mono"
                  onBlur={(e) => {
                    field.onBlur()
                    try {
                      const uri = OTPAuthURI.parse(e.currentTarget.value)
                      if (uri) {
                        form.setValue("issuer", uri.issuer)
                        form.setValue(
                          "label",
                          uri.label.replace(`${uri.issuer}:`, "")
                        )
                        form.setValue("secret", uri.secret.base32)
                        form.setValue(
                          "algorithm",
                          uri.algorithm as SecretOptionAlgorithm
                        )
                        form.setValue("digits", uri.digits)
                      }
                    } catch {
                      //ignore
                    }
                  }}
                />
              </FormControl>
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
