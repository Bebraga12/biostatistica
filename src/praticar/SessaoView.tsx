import { useEffect, useRef, useState } from 'react'
import { Icon } from '../components/Icon'
import { Topbar } from '../components/Topbar'
import { Tabela } from '../components/ui'
import { QUESTOES_POR_ID, type Questao, type QuestaoAberta, type QuestaoMC, type QuestaoVF } from '../data/questoes'
import { TEMAS } from '../data/temas'
import { Rico, porcentagem } from '../lib/texto'
import type { Resposta, Sessao } from './quiz'

const LETRAS = 'ABCDEFG'

type Props = {
  sessao: Sessao
  onResponder: (id: string, r: Resposta) => void
  onProxima: () => void
  onSair: () => void
}

export function SessaoView({ sessao, onResponder, onProxima, onSair }: Props) {
  const id = sessao.ids[sessao.indice]
  const q = QUESTOES_POR_ID.get(id)!
  const resposta = sessao.respostas[id]
  const total = sessao.ids.length
  const ultima = sessao.indice === total - 1
  const respondidas = Object.keys(sessao.respostas).length
  const feedbackRef = useRef<HTMLDivElement>(null)
  const proximaRef = useRef<HTMLButtonElement>(null)

  // Depois de responder, traz a explicação para a tela (no celular ela fica abaixo da dobra).
  useEffect(() => {
    if (!resposta) return
    feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    proximaRef.current?.focus({ preventScroll: true })
  }, [resposta])

  const proxima = () => {
    onProxima()
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <Topbar
        titulo={sessao.titulo}
        subtitulo="Praticar"
        onVoltar={onSair}
        voltarLabel="Sair do simulado (o progresso fica salvo)"
      />
      <div className="page">
        <div className="quiz-progress">
          <div
            className="progress"
            role="progressbar"
            aria-valuenow={respondidas}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label="Progresso do simulado"
          >
            <span style={{ width: `${porcentagem(respondidas, total)}%` }} />
          </div>
          <span>
            {sessao.indice + 1}/{total}
          </span>
        </div>

        <section className="card" aria-labelledby={`q-${q.id}`}>
          <div className="question-meta">
            <span className="chip chip-primary">{TEMAS[q.tema]}</span>
            {q.tipo === 'vf' && <span className="chip">Verdadeiro ou falso</span>}
            {q.tipo === 'aberta' && <span className="chip">Dissertativa</span>}
            {q.extra && <span className="chip chip-note">complemento</span>}
          </div>
          <p className="question-text" id={`q-${q.id}`}>
            <Rico texto={q.enunciado} />
          </p>
          {q.tabela && (
            <div className="question-table">
              <Tabela dados={q.tabela} />
            </div>
          )}

          {q.tipo === 'mc' && (
            <Objetiva key={q.id} q={q} ordem={sessao.ordem[q.id] ?? q.opcoes.map((_, i) => i)} resposta={resposta} onResponder={(r) => onResponder(q.id, r)} />
          )}
          {q.tipo === 'vf' && <VerdadeiroFalso key={q.id} q={q} resposta={resposta} onResponder={(r) => onResponder(q.id, r)} />}
          {q.tipo === 'aberta' && <Dissertativa key={q.id} q={q} resposta={resposta} onResponder={(r) => onResponder(q.id, r)} />}

          <div ref={feedbackRef} className="feedback-anchor">{resposta && q.tipo !== 'aberta' && <Feedback q={q} resposta={resposta} />}</div>
        </section>

        {resposta && (
          <div className="sticky-action">
            <button type="button" className="btn btn-primary btn-block" onClick={proxima} ref={proximaRef}>
              {ultima ? 'Ver resultado' : 'Próxima questão'} <Icon name="arrowRight" />
            </button>
          </div>
        )}
      </div>
    </>
  )
}

function classeAlternativa(respondida: boolean, correta: boolean, escolhida: boolean) {
  if (!respondida) return 'answer'
  if (correta) return 'answer is-correct'
  if (escolhida) return 'answer is-wrong'
  return 'answer is-dim'
}

function Objetiva({ q, ordem, resposta, onResponder }: { q: QuestaoMC; ordem: number[]; resposta?: Resposta; onResponder: (r: Resposta) => void }) {
  return (
    <div className="options" role="group" aria-label="Alternativas">
      {ordem.map((original, pos) => (
        <button
          key={original}
          type="button"
          className={classeAlternativa(!!resposta, original === q.correta, resposta?.escolha === original)}
          disabled={!!resposta}
          onClick={() => onResponder({ escolha: original, acertou: original === q.correta })}
        >
          <span className="answer-letter" aria-hidden="true">
            {resposta && original === q.correta ? <Icon name="check" className="icon" /> : resposta?.escolha === original ? <Icon name="x" className="icon" /> : LETRAS[pos]}
          </span>
          <span className="answer-text">{q.opcoes[original]}</span>
        </button>
      ))}
    </div>
  )
}

function VerdadeiroFalso({ q, resposta, onResponder }: { q: QuestaoVF; resposta?: Resposta; onResponder: (r: Resposta) => void }) {
  return (
    <div className="options vf-options" role="group" aria-label="Verdadeiro ou falso">
      {[true, false].map((valor) => (
        <button
          key={String(valor)}
          type="button"
          className={classeAlternativa(!!resposta, valor === q.correta, resposta?.escolha === valor)}
          disabled={!!resposta}
          onClick={() => onResponder({ escolha: valor, acertou: valor === q.correta })}
        >
          {valor ? 'Verdadeiro' : 'Falso'}
        </button>
      ))}
    </div>
  )
}

function Dissertativa({ q, resposta, onResponder }: { q: QuestaoAberta; resposta?: Resposta; onResponder: (r: Resposta) => void }) {
  const [texto, setTexto] = useState('')
  const [revelada, setRevelada] = useState(!!resposta)

  return (
    <>
      <label className="sr-only" htmlFor={`txt-${q.id}`}>
        Sua resposta
      </label>
      <textarea
        id={`txt-${q.id}`}
        className="textarea"
        placeholder="Escreva sua resposta aqui (ou responda de cabeça) e depois compare com a resposta modelo."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        readOnly={revelada}
      />
      {!revelada ? (
        <button type="button" className="btn btn-primary btn-block" style={{ marginTop: 12 }} onClick={() => setRevelada(true)}>
          Ver resposta modelo
        </button>
      ) : (
        <>
          <div className="model-answer">
            <h3>Resposta modelo</h3>
            <p>{q.resposta}</p>
            <h3>Pontos que não podem faltar</h3>
            <ul className="checklist">
              {q.pontos.map((p) => (
                <li key={p}>
                  <Icon name="check" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          {resposta ? (
            <div className={'feedback ' + (resposta.acertou ? 'is-ok' : 'is-err')}>
              <div className="feedback-title">
                <Icon name={resposta.acertou ? 'check' : 'x'} />
                {resposta.acertou ? 'Você marcou: acertei' : 'Você marcou: preciso revisar'}
              </div>
            </div>
          ) : (
            <div className="self-grade">
              <p>Sua resposta cobriu os pontos principais?</p>
              <div className="btn-row">
                <button type="button" className="btn btn-secondary" onClick={() => onResponder({ escolha: null, acertou: false })}>
                  <Icon name="x" /> Preciso revisar
                </button>
                <button type="button" className="btn btn-primary" onClick={() => onResponder({ escolha: null, acertou: true })}>
                  <Icon name="check" /> Acertei
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export function textoCorreto(q: Questao) {
  if (q.tipo === 'mc') return q.opcoes[q.correta]
  if (q.tipo === 'vf') return q.correta ? 'Verdadeiro' : 'Falso'
  return q.resposta
}

function Feedback({ q, resposta }: { q: QuestaoMC | QuestaoVF; resposta: Resposta }) {
  return (
    <div className={'feedback ' + (resposta.acertou ? 'is-ok' : 'is-err')} role="status">
      <div className="feedback-title">
        <Icon name={resposta.acertou ? 'check' : 'x'} />
        {resposta.acertou ? 'Correto!' : 'Incorreto'}
      </div>
      {!resposta.acertou && <p className="correct-answer">Resposta certa: {textoCorreto(q)}</p>}
      <p>
        <Rico texto={q.explicacao} />
      </p>
    </div>
  )
}
