import { Icon } from '../components/Icon'
import { Topbar } from '../components/Topbar'
import { QUESTOES } from '../data/questoes'
import { navigate } from '../lib/router'
import { usePersistentState } from '../lib/storage'
import { porcentagem } from '../lib/texto'
import { SECOES, type Secao } from './secoes'

const DATA_PROVA = new Date(2026, 9, 16) // 16/10

function contagemRegressiva(hoje = new Date()) {
  const dia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
  const dias = Math.round((DATA_PROVA.getTime() - dia.getTime()) / 86_400_000)
  if (dias > 1) return `Faltam ${dias} dias para a prova (16/10)`
  if (dias === 1) return 'A prova é amanhã (16/10) — revise a cola rápida!'
  if (dias === 0) return 'Hoje é dia de prova. Boa prova!'
  return 'Prova de 16/10'
}

export function Estudar({ secaoId }: { secaoId: string | null }) {
  const [lidas, setLidas] = usePersistentState<string[]>('bio:lidas:v1', [])
  const indice = SECOES.findIndex((s) => s.id === secaoId)

  if (indice >= 0) {
    const lida = lidas.includes(SECOES[indice].id)
    const alternarLida = () =>
      setLidas((atual) => (lida ? atual.filter((id) => id !== SECOES[indice].id) : [...atual, SECOES[indice].id]))
    return <Artigo indice={indice} lida={lida} onAlternarLida={alternarLida} />
  }

  const totalLidas = SECOES.filter((s) => lidas.includes(s.id)).length

  return (
    <>
      <Topbar titulo="Estudar" subtitulo="Bioestatística" />
      <div className="page">
        <section className="card hero">
          <h2>Revisão de Bioestatística</h2>
          <p>{contagemRegressiva()}</p>
          <div className="progress" role="progressbar" aria-valuenow={totalLidas} aria-valuemin={0} aria-valuemax={SECOES.length} aria-label="Temas lidos">
            <span style={{ width: `${porcentagem(totalLidas, SECOES.length)}%` }} />
          </div>
          <div className="hero-meta">
            <span>
              {totalLidas} de {SECOES.length} temas lidos
            </span>
            <span>{QUESTOES.length} questões</span>
          </div>
        </section>

        <h2 className="section-label">Temas</h2>
        <ol className="topic-list">
          {SECOES.map((s, i) => {
            const feita = lidas.includes(s.id)
            return (
              <li key={s.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <a className="topic-link" href={`#/estudar/${s.id}`}>
                  <span className={'topic-num' + (feita ? ' is-done' : '')} aria-hidden="true">
                    {feita ? <Icon name="check" className="icon" /> : i + 1}
                  </span>
                  <span className="topic-body">
                    <strong>{s.titulo}</strong>
                    <span>{s.resumo}</span>
                  </span>
                  {feita && <span className="sr-only">(lido)</span>}
                  <Icon name="chevronRight" className="icon chevron" />
                </a>
              </li>
            )
          })}
        </ol>
      </div>
    </>
  )
}

function Artigo({ indice, lida, onAlternarLida }: { indice: number; lida: boolean; onAlternarLida: () => void }) {
  const secao: Secao = SECOES[indice]
  const anterior = SECOES[indice - 1]
  const proxima = SECOES[indice + 1]
  const nQuestoes = secao.tema ? QUESTOES.filter((q) => q.tema === secao.tema).length : 0
  const { Conteudo } = secao

  return (
    <>
      <Topbar titulo={secao.titulo} subtitulo={`Tema ${indice + 1} de ${SECOES.length}`} onVoltar={() => navigate('/estudar')} voltarLabel="Voltar para os temas" />
      <article className="page">
        <header className="article-head">
          <span className="chip chip-primary">Tema {indice + 1}</span>
          <h1>{secao.titulo}</h1>
          <p>{secao.resumo}</p>
        </header>

        <div className="prose">
          <Conteudo />
        </div>

        <footer className="article-foot">
          {secao.tema && (
            <a className="btn btn-primary btn-block" href={`#/praticar/${secao.tema}`}>
              <Icon name="target" /> Praticar este tema · {nQuestoes} questões
            </a>
          )}
          <button type="button" className="btn btn-secondary btn-block" onClick={onAlternarLida} aria-pressed={lida}>
            <Icon name={lida ? 'checkSquare' : 'check'} />
            {lida ? 'Lido — desmarcar' : 'Marcar como lido'}
          </button>
          <nav className="pager" aria-label="Navegação entre temas">
            {anterior && (
              <a href={`#/estudar/${anterior.id}`}>
                <small>← Anterior</small>
                {anterior.titulo}
              </a>
            )}
            {proxima && (
              <a className="next" href={`#/estudar/${proxima.id}`}>
                <small>Próximo →</small>
                {proxima.titulo}
              </a>
            )}
          </nav>
        </footer>
      </article>
    </>
  )
}
