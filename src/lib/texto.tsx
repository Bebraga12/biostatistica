import { Fragment, type ReactNode } from 'react'

/** Converte `**negrito**` em <strong>. Usado nos textos das questões. */
export function Rico({ texto }: { texto: string }): ReactNode {
  return texto.split(/(\*\*[^*]+\*\*)/g).map((parte, i) =>
    parte.startsWith('**') && parte.endsWith('**') ? (
      <strong key={i}>{parte.slice(2, -2)}</strong>
    ) : (
      <Fragment key={i}>{parte}</Fragment>
    ),
  )
}

export function embaralhar<T>(lista: readonly T[]): T[] {
  const copia = [...lista]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

export function porcentagem(parte: number, total: number) {
  return total === 0 ? 0 : Math.round((parte / total) * 100)
}
