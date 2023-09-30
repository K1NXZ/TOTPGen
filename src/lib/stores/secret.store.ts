import { Secret as OTPAuthSecret } from "otpauth"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

export interface Secret {
  id: string
  options: SecretOptions
}

export const secretOptionAlgorithm = [
  "SHA1",
  "SHA224",
  "SHA256",
  "SHA384",
  "SHA512",
  "SHA3-224",
  "SHA3-256",
  "SHA3-384",
  "SHA3-512",
] as const

export type SecretOptionAlgorithm = (typeof secretOptionAlgorithm)[number]

export interface SecretOptions {
  issuer?: string | undefined
  label?: string | undefined
  secret: string | OTPAuthSecret
  algorithm: SecretOptionAlgorithm
  digits: number
  period: number
}

interface SecretState {
  secrets: Secret[]
  hideSecrets: boolean
  addSecret: (options: SecretOptions) => void
  deleteSecret: (id: string) => void
  toggleHideSecrets: () => void
}

export const useSecretStore = create<SecretState>()(
  devtools(
    persist(
      (set) => ({
        hideSecrets: false,

        secrets: [],
        addSecret: (options) =>
          set((state) => ({
            secrets: [
              ...state.secrets,
              {
                id: crypto.randomUUID(),
                options,
              },
            ],
          })),

        deleteSecret: (id) =>
          set((state) => ({
            secrets: state.secrets.filter((secret) => secret.id !== id),
          })),

        toggleHideSecrets: () =>
          set((state) => ({
            hideSecrets: !state.hideSecrets,
          })),
      }),
      { name: "secret-store" }
    )
  )
)
