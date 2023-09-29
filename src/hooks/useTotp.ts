/** @format */

import React, { useCallback } from "react"
import * as OTPAuth from "otpauth"

import { SecretOptions } from "@/lib/stores/secret.store"

export function useTotp(options: SecretOptions) {
  const [token, setToken] = React.useState<string | undefined>(undefined)
  const [seconds, setSeconds] = React.useState(0)

  const totp = React.useMemo(() => {
    return new OTPAuth.TOTP(options)
  }, [options])

  const getRemainingSeconds = useCallback(() => {
    const a = Date.now() / options.period / 1000
    const t = options.period * (a - Math.floor(a))
    return options.period - Math.floor(t)
  }, [options.period])

  const refresh = useCallback(() => {
    const newToken = totp.generate()
    setToken(newToken)
    const remainingSeconds = getRemainingSeconds()
    setSeconds(remainingSeconds)
    return remainingSeconds
  }, [getRemainingSeconds, totp])

  React.useEffect(() => {
    refresh()
    const refreshInterval = setInterval(() => {
      const remaining = getRemainingSeconds()
      setSeconds(remaining)
      if (remaining === options.period) {
        refresh()
      }
    }, 1000)

    return () => {
      clearInterval(refreshInterval)
    }
  }, [getRemainingSeconds, options.period, refresh])

  return {
    seconds,
    token,
    url: totp.toString(),
    secret: totp.secret.base32,
    refresh,
  } as const
}
