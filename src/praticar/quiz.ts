import { QUESTOES_POR_ID, type Questao } from '../data/questoes'
import { embaralhar } from '../lib/texto'

export type Resposta = {
  acertou: boolean
  /** Índice original da alternativa (mc), V/F (vf) ou null (dissertativa). */
  escolha: number | boolean | null
}

export type Sessao = {
  titulo: string
  ids: string[]
  /** Ordem embaralhada das alternativas de cada questão objetiva. */
  ordem: Record<string, number[]>
  respostas: Record<string, Resposta>
  indice: number
}

/** Último resultado de cada questão, para "Revisar erros" e estatísticas. */
export type Historico = Record<string, { acertou: boolean; tentativas: number }>

export function criarSessao(questoes: Questao[], titulo: string, limite?: number): Sessao {
  const escolhidas = embaralhar(questoes).slice(0, limite ?? questoes.length)
  const ordem: Record<string, number[]> = {}
  for (const q of escolhidas) {
    if (q.tipo === 'mc') ordem[q.id] = embaralhar(q.opcoes.map((_, i) => i))
  }
  return { titulo, ids: escolhidas.map((q) => q.id), ordem, respostas: {}, indice: 0 }
}

/** Descarta ids que não existem mais (caso o banco de questões mude). */
export function sessaoValida(s: Sessao | null): Sessao | null {
  if (!s || !Array.isArray(s.ids)) return null
  const ids = s.ids.filter((id) => QUESTOES_POR_ID.has(id))
  if (ids.length === 0) return null
  return { ...s, ids, indice: Math.min(s.indice, ids.length) }
}

export function terminou(s: Sessao) {
  return s.indice >= s.ids.length
}

export function acertosDa(s: Sessao) {
  return s.ids.filter((id) => s.respostas[id]?.acertou).length
}
