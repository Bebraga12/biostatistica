import { Icon } from '../components/Icon'
import { Topbar } from '../components/Topbar'
import { QUESTOES_POR_ID } from '../data/questoes'
import { TEMAS } from '../data/temas'
import { Rico, porcentagem } from '../lib/texto'
import { acertosDa, type Sessao } from './quiz'
import { textoCorreto } from './SessaoView'

type Props = {
  sessao: Sessao
  onRefazerErradas: () => void
  onNovoSimulado: () => void
  onFechar: () => void
}

function mensagem(pct: number) {
  if (pct >= 90) return 'Excelente! Esse conteúdo já está dominado.'
  if (pct >= 70) return 'Muito bom! Revise as que errou e bora.'
  if (pct >= 50) return 'No caminho. Releia os temas das questões erradas.'
  return 'Vale voltar aos resumos e tentar de novo.'
}

function Anel({ pct }: { pct: number }) {
  const r = 54
  const c = 2 * Math.PI * r
  const tom = pct >= 70 ? ' is-good' : pct < 50 ? ' is-bad' : ''
  return (
    <svg className="ring" viewBox="0 0 132 132" role="img" aria-label={`${pct}% de acertos`}>
      <circle className="ring-track" cx="66" cy="66" r={r} fill="none" strokeWidth="12" />
      <circle
        className={'ring-value' + tom}
        cx="66"
        cy="66"
        r={r}
        fill="none"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct / 100)}
        transform="rotate(-90 66 66)"
      />
      <text className="ring-text" x="66" y="75" textAnchor="middle">
        {pct}%
      </text>
    </svg>
  )
}

export function ResultadoView({ sessao, onRefazerErradas, onNovoSimulado, onFechar }: Props) {
  const total = sessao.ids.length
  const acertos = acertosDa(sessao)
  const pct = porcentagem(acertos, total)
  const erradas = sessao.ids.filter((id) => !sessao.respostas[id]?.acertou)

  const porTema = new Map<string, { total: number; acertos: number }>()
  for (const id of sessao.ids) {
    const q = QUESTOES_POR_ID.get(id)!
    const t = porTema.get(q.tema) ?? { total: 0, acertos: 0 }
    t.total++
    if (sessao.respostas[id]?.acertou) t.acertos++
    porTema.set(q.tema, t)
  }

  return (
    <>
      <Topbar titulo="Resultado" subtitulo={sessao.titulo} onVoltar={onFechar} voltarLabel="Voltar para o início da prática" />
      <div className="page">
        <section className="card result-hero">
          <Anel pct={pct} />
          <h2>
            {acertos} de {total} corretas
          </h2>
          <p>{mensagem(pct)}</p>
        </section>

        <div className="stack" style={{ marginTop: 16 }}>
          {erradas.length > 0 && (
            <button type="button" className="btn btn-primary btn-block" onClick={onRefazerErradas}>
              <Icon name="rotate" /> Refazer as {erradas.length} que errei
            </button>
          )}
          <div className="btn-row">
            <button type="button" className="btn btn-secondary" onClick={onNovoSimulado}>
              <Icon name="shuffle" /> Novo simulado
            </button>
            <button type="button" className="btn btn-secondary" onClick={onFechar}>
              <Icon name="list" /> Início
            </button>
          </div>
        </div>

        {porTema.size > 1 && (
          <>
            <h2 className="section-label">Por tema</h2>
            <div className="card list-card">
              {[...porTema].map(([tema, t]) => (
                <div key={tema} className="theme-row" style={{ cursor: 'default' }}>
                  <div className="theme-row-head">
                    <strong>{TEMAS[tema as keyof typeof TEMAS]}</strong>
                    <span>
                      {t.acertos}/{t.total}
                    </span>
                  </div>
                  <div className="progress is-ok">
                    <span style={{ width: `${porcentagem(t.acertos, t.total)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <h2 className="section-label">Revisão das questões</h2>
        <div className="card list-card">
          {sessao.ids.map((id, i) => {
            const q = QUESTOES_POR_ID.get(id)!
            const ok = !!sessao.respostas[id]?.acertou
            return (
              <details key={id} className="review-item" open={!ok && erradas.length <= 3}>
                <summary>
                  <Icon name={ok ? 'check' : 'x'} className={'icon ' + (ok ? 'is-ok-icon' : 'is-err-icon')} />
                  <span>
                    <span className="sr-only">{ok ? 'Acertou: ' : 'Errou: '}</span>
                    {i + 1}. <Rico texto={q.enunciado} />
                  </span>
                </summary>
                <div className="review-body">
                  {q.tipo === 'aberta' ? (
                    <p>
                      <strong>Resposta modelo:</strong> {q.resposta}
                    </p>
                  ) : (
                    <>
                      <p>
                        <strong>Resposta certa:</strong> {textoCorreto(q)}
                      </p>
                      <p className="muted">
                        <Rico texto={q.explicacao} />
                      </p>
                    </>
                  )}
                </div>
              </details>
            )
          })}
        </div>
      </div>
    </>
  )
}
