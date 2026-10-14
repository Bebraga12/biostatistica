import { useState } from 'react'
import { Segmentado } from '../ui'

type Contexto = 'teste' | 'shapiro' | 'levene'

const CONTEXTOS: { valor: Contexto; rotulo: string }[] = [
  { valor: 'teste', rotulo: 't / ANOVA' },
  { valor: 'shapiro', rotulo: 'Shapiro-Wilk' },
  { valor: 'levene', rotulo: 'Levene' },
]

const EXEMPLOS = ['0,001', '0,03', '0,049', '0,051', '0,27', '0,85']

const LEITURA: Record<Contexto, { h0: string; menor: [string, string]; maior: [string, string] }> = {
  teste: {
    h0: 'não há diferença entre as médias',
    menor: ['Rejeita H0 → diferença significativa', 'Provável efeito biológico real (não é só acaso).'],
    maior: ['Não rejeita H0 → sem diferença significativa', 'Não há evidência suficiente de diferença — pode ser acaso. (Não prova que são iguais.)'],
  },
  shapiro: {
    h0: 'os dados são normais',
    menor: ['Dados NÃO normais ✗', 'Pressuposto violado: investigue outliers e considere teste não paramétrico.'],
    maior: ['Dados normais ✓', 'Pressuposto atendido: pode usar teste paramétrico (t ou ANOVA).'],
  },
  levene: {
    h0: 'as variâncias são iguais',
    menor: ['Variâncias diferentes ✗', 'Use a correção de Welch (t de Welch / ANOVA de Welch).'],
    maior: ['Variâncias iguais (homocedasticidade) ✓', 'Pressuposto atendido: siga com o t de Student / ANOVA + Tukey.'],
  },
}

function lerP(texto: string) {
  const v = Number(texto.trim().replace(',', '.'))
  return texto.trim() !== '' && Number.isFinite(v) && v >= 0 && v <= 1 ? v : null
}

export function InterpretePValor({ contextos = ['teste', 'shapiro', 'levene'] }: { contextos?: Contexto[] }) {
  const [ctx, setCtx] = useState<Contexto>(contextos[0])
  const [texto, setTexto] = useState('0,03')
  const p = lerP(texto)
  const leitura = LEITURA[ctx]
  const significativo = p !== null && p < 0.05
  // No teste principal p < 0,05 é "achado"; nos pressupostos é "problema".
  const bom = ctx === 'teste' ? significativo : !significativo
  const [titulo, detalhe] = significativo ? leitura.menor : leitura.maior

  return (
    <div className="widget">
      <div className="widget-title">Intérprete de p-valor</div>
      {contextos.length > 1 && (
        <Segmentado rotulo="Qual teste gerou o p?" valor={ctx} onChange={setCtx} opcoes={CONTEXTOS.filter((c) => contextos.includes(c.valor))} />
      )}
      <div className="field">
        <label htmlFor="pvalor">Digite um p-valor ou toque num exemplo</label>
        <input
          id="pvalor"
          className="input"
          inputMode="decimal"
          autoComplete="off"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="ex.: 0,03"
        />
      </div>
      <div className="chips-row">
        {EXEMPLOS.map((ex) => (
          <button key={ex} type="button" className="chip-btn" aria-pressed={texto === ex} onClick={() => setTexto(ex)}>
            {ex}
          </button>
        ))}
      </div>
      <div className={'verdict ' + (p === null ? 'is-neutral' : bom ? 'is-ok' : 'is-err')} aria-live="polite">
        {p === null ? (
          <b>Digite um valor entre 0 e 1</b>
        ) : (
          <>
            <b>
              p {significativo ? '<' : '≥'} 0,05 · {titulo}
            </b>
            <p>{detalhe}</p>
            <p className="muted">H0 deste teste: {leitura.h0}.</p>
          </>
        )}
      </div>
    </div>
  )
}
