import { useEffect, useState } from 'react'
import { Icon, type IconName } from '../components/Icon'
import { Topbar } from '../components/Topbar'
import { QUESTOES, QUESTOES_POR_ID, type Questao } from '../data/questoes'
import { TEMAS, TEMA_IDS, isTema, type TemaId } from '../data/temas'
import { navigate } from '../lib/router'
import { usePersistentState } from '../lib/storage'
import { porcentagem } from '../lib/texto'
import { criarSessao, sessaoValida, terminou, type Historico, type Resposta, type Sessao } from './quiz'
import { ResultadoView } from './ResultadoView'
import { SessaoView } from './SessaoView'

const TAMANHO_SIMULADO = 10

export function Praticar({ tema }: { tema: string | null }) {
  const [sessaoSalva, setSessao] = usePersistentState<Sessao | null>('bio:sessao:v1', null)
  const [historico, setHistorico] = usePersistentState<Historico>('bio:historico:v1', {})
  const [comDissertativas, setComDissertativas] = usePersistentState('bio:dissertativas:v1', true)
  const sessao = sessaoValida(sessaoSalva)
  // Sair do simulado só "pausa": a sessão continua salva e aparece em "Continuar".
  const [emSessao, setEmSessao] = useState(false)

  const filtrar = (lista: Questao[]) => (comDissertativas ? lista : lista.filter((q) => q.tipo !== 'aberta'))

  const iniciar = (lista: Questao[], titulo: string, limite?: number) => {
    if (lista.length === 0) return
    setSessao(criarSessao(lista, titulo, limite))
    setEmSessao(true)
    window.scrollTo({ top: 0 })
  }

  // Vindo de "Praticar este tema" (#/praticar/<tema>) na aba Estudar.
  useEffect(() => {
    if (!isTema(tema)) return
    const lista = QUESTOES.filter((q) => q.tema === tema)
    setSessao(criarSessao(comDissertativas ? lista : lista.filter((q) => q.tipo !== 'aberta'), TEMAS[tema]))
    setEmSessao(true)
    navigate('/praticar', { replace: true })
  }, [tema, comDissertativas, setSessao])

  const responder = (id: string, r: Resposta) => {
    setSessao((s) => (s ? { ...s, respostas: { ...s.respostas, [id]: r } } : s))
    setHistorico((h) => ({ ...h, [id]: { acertou: r.acertou, tentativas: (h[id]?.tentativas ?? 0) + 1 } }))
  }

  if (sessao && emSessao) {
    if (terminou(sessao)) {
      const erradas = sessao.ids.filter((id) => !sessao.respostas[id]?.acertou).map((id) => QUESTOES_POR_ID.get(id)!)
      return (
        <ResultadoView
          sessao={sessao}
          onRefazerErradas={() => iniciar(erradas, 'Refazendo erros')}
          onNovoSimulado={() => iniciar(filtrar(QUESTOES), 'Simulado rápido', TAMANHO_SIMULADO)}
          onFechar={() => {
            setSessao(null)
            setEmSessao(false)
          }}
        />
      )
    }
    return (
      <SessaoView
        sessao={sessao}
        onResponder={responder}
        onProxima={() => setSessao((s) => (s ? { ...s, indice: s.indice + 1 } : s))}
        onSair={() => setEmSessao(false)}
      />
    )
  }

  // ── Tela inicial da prática
  const respondidas = QUESTOES.filter((q) => historico[q.id])
  const acertadas = respondidas.filter((q) => historico[q.id].acertou)
  const erradas = filtrar(respondidas.filter((q) => !historico[q.id].acertou))
  const ineditas = filtrar(QUESTOES.filter((q) => !historico[q.id]))
  const pausada = sessao && !terminou(sessao) ? sessao : null

  const modos: { icone: IconName; titulo: string; descricao: string; acao: () => void; desativado?: boolean; destaque?: boolean }[] = [
    {
      icone: 'zap',
      titulo: 'Simulado rápido',
      descricao: `${TAMANHO_SIMULADO} questões sorteadas de todos os temas`,
      acao: () => iniciar(filtrar(QUESTOES), 'Simulado rápido', TAMANHO_SIMULADO),
      destaque: !pausada,
    },
    {
      icone: 'list',
      titulo: 'Simulado completo',
      descricao: `Todas as ${filtrar(QUESTOES).length} questões, embaralhadas`,
      acao: () => iniciar(filtrar(QUESTOES), 'Simulado completo'),
    },
    {
      icone: 'rotate',
      titulo: 'Revisar erros',
      descricao: erradas.length ? `${erradas.length} questões que você errou da última vez` : 'Nenhum erro registrado ainda',
      acao: () => iniciar(erradas, 'Revisando erros'),
      desativado: erradas.length === 0,
    },
    {
      icone: 'sparkle',
      titulo: 'Só as inéditas',
      descricao: ineditas.length ? `${ineditas.length} questões que você ainda não respondeu` : 'Você já respondeu todas!',
      acao: () => iniciar(ineditas, 'Questões inéditas'),
      desativado: ineditas.length === 0,
    },
  ]

  const resetar = () => {
    if (window.confirm('Apagar todo o histórico de respostas deste aparelho?')) {
      setHistorico({})
      setSessao(null)
    }
  }

  return (
    <>
      <Topbar titulo="Praticar" subtitulo="Bioestatística" />
      <div className="page">
        <section className="card stats-card" aria-label="Seu desempenho">
          <div>
            <b>{respondidas.length}</b>
            <span>de {QUESTOES.length} feitas</span>
          </div>
          <div>
            <b>{acertadas.length}</b>
            <span>acertos</span>
          </div>
          <div>
            <b>{respondidas.length ? `${porcentagem(acertadas.length, respondidas.length)}%` : '—'}</b>
            <span>aproveitamento</span>
          </div>
        </section>

        {pausada && (
          <section className="card resume-card" style={{ marginTop: 12 }}>
            <p>
              <strong>{pausada.titulo}</strong> em andamento —{' '}
              <span className="muted">
                questão {pausada.indice + 1} de {pausada.ids.length}
              </span>
            </p>
            <div className="btn-row">
              <button type="button" className="btn btn-secondary" onClick={() => setSessao(null)}>
                Descartar
              </button>
              <button type="button" className="btn btn-primary" onClick={() => setEmSessao(true)}>
                Continuar <Icon name="arrowRight" />
              </button>
            </div>
          </section>
        )}

        <h2 className="section-label">Modos</h2>
        <div className="stack">
          {modos.map((m) => (
            <button key={m.titulo} type="button" className={'mode-btn' + (m.destaque ? ' is-featured' : '')} onClick={m.acao} disabled={m.desativado}>
              <span className="mode-icon">
                <Icon name={m.icone} />
              </span>
              <span className="mode-body">
                <strong>{m.titulo}</strong>
                <span>{m.descricao}</span>
              </span>
              <Icon name="chevronRight" className="icon chevron" />
            </button>
          ))}
        </div>

        <h2 className="section-label">Por tema</h2>
        <div className="card list-card">
          {TEMA_IDS.map((t: TemaId) => {
            const doTema = filtrar(QUESTOES.filter((q) => q.tema === t))
            const certas = doTema.filter((q) => historico[q.id]?.acertou).length
            return (
              <button key={t} type="button" className="theme-row" onClick={() => iniciar(doTema, TEMAS[t])}>
                <span className="theme-row-head">
                  <strong>{TEMAS[t]}</strong>
                  <span>
                    {certas}/{doTema.length} certas
                  </span>
                </span>
                <span className="progress is-ok" aria-hidden="true">
                  <span style={{ width: `${porcentagem(certas, doTema.length)}%` }} />
                </span>
              </button>
            )
          })}
        </div>

        <h2 className="section-label">Preferências</h2>
        <div className="card list-card">
          <div className="switch-row">
            <span id="lbl-dissertativas">
              Incluir dissertativas
              <small>Você escreve, compara com a resposta modelo e se autoavalia.</small>
            </span>
            <button
              type="button"
              role="switch"
              className="switch"
              aria-checked={comDissertativas}
              aria-labelledby="lbl-dissertativas"
              onClick={() => setComDissertativas(!comDissertativas)}
            />
          </div>
        </div>

        <p className="center">
          <button type="button" className="link-btn" onClick={resetar}>
            Zerar meu histórico
          </button>
        </p>
      </div>
    </>
  )
}
