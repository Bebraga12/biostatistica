import { useEffect, useState } from 'react'

// Progresso salvo só neste navegador. Em aba anônima ou com armazenamento
// bloqueado, o app continua funcionando — apenas não lembra entre visitas.
function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => read(key, initial))

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* armazenamento indisponível */
    }
  }, [key, value])

  return [value, setValue] as const
}
