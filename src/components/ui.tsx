import type { ReactNode } from 'react'
import { Icon, type IconName } from './Icon'

type Variante = 'nota' | 'dica' | 'atencao' | 'extra'

const CALLOUT: Record<Variante, { titulo: string; icone: IconName }> = {
  nota: { titulo: 'Da sua anotação', icone: 'quote' },
  dica: { titulo: 'Dica de prova', icone: 'lightbulb' },
  atencao: { titulo: 'Atenção', icone: 'alert' },
  extra: { titulo: 'Complemento', icone: 'plus' },
}

export function Callout({ tipo, titulo, children }: { tipo: Variante; titulo?: string; children: ReactNode }) {
  const cfg = CALLOUT[tipo]
  return (
    <aside className={`callout callout-${tipo}`}>
      <div className="callout-title">
        <Icon name={cfg.icone} className="icon" />
        {titulo ?? cfg.titulo}
      </div>
      {children}
    </aside>
  )
}

/** Trecho literal do PDF da prova. */
export function Anotacao({ children }: { children: ReactNode }) {
  return (
    <Callout tipo="nota">
      <blockquote>{children}</blockquote>
    </Callout>
  )
}

export function Definicao({ children }: { children: ReactNode }) {
  return <p className="def">{children}</p>
}

export function Termo({ nome, tag, children }: { nome: ReactNode; tag?: string; children: ReactNode }) {
  return (
    <div className="term">
      <div className="term-name">
        <span>{nome}</span>
        {tag && <small>{tag}</small>}
      </div>
      {children}
    </div>
  )
}

type TabelaDados = { titulo?: string; colunas: ReactNode[]; linhas: ReactNode[][] }

export function Tabela({ dados, numericas = [] }: { dados: TabelaDados; numericas?: number[] }) {
  return (
    <div className="table-wrap">
      {dados.titulo && <div className="table-caption">{dados.titulo}</div>}
      <table>
        <thead>
          <tr>
            {dados.colunas.map((c, i) => (
              <th key={i} className={numericas.includes(i) ? 'num' : undefined} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dados.linhas.map((linha, i) => (
            <tr key={i}>
              {linha.map((celula, j) => (
                <td key={j} className={numericas.includes(j) ? 'num' : undefined}>
                  {celula}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Checklist({ itens, negativo = false }: { itens: ReactNode[]; negativo?: boolean }) {
  return (
    <ul className={'checklist' + (negativo ? ' is-x' : '')}>
      {itens.map((item, i) => (
        <li key={i}>
          <Icon name={negativo ? 'x' : 'check'} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function Segmentado<T extends string>({
  opcoes,
  valor,
  onChange,
  rotulo,
}: {
  opcoes: { valor: T; rotulo: string }[]
  valor: T
  onChange: (v: T) => void
  rotulo: string
}) {
  return (
    <div className="segmented" role="group" aria-label={rotulo}>
      {opcoes.map((o) => (
        <button key={o.valor} type="button" aria-pressed={o.valor === valor} onClick={() => onChange(o.valor)}>
          {o.rotulo}
        </button>
      ))}
    </div>
  )
}
