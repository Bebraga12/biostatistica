import type { CSSProperties } from 'react'

// Cores dos gráficos via variáveis CSS (acompanham tema claro/escuro).
export const cor = {
  texto: { fill: 'var(--text)' } as CSSProperties,
  muted: { fill: 'var(--muted)' } as CSSProperties,
  eixo: { stroke: 'var(--border)' } as CSSProperties,
  linha: { stroke: 'var(--text)' } as CSSProperties,
  linhaMuted: { stroke: 'var(--muted)' } as CSSProperties,
}

export const GRUPO_COR = { A: 'var(--g-a)', B: 'var(--g-b)' } as const

export function escala(dominio: [number, number], faixa: [number, number]) {
  const [d0, d1] = dominio
  const [r0, r1] = faixa
  return (v: number) => r0 + ((v - d0) / (d1 - d0)) * (r1 - r0)
}

export function caminho(pontos: [number, number][]) {
  return pontos.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join('')
}

export function num(v: number, casas = 1) {
  return v.toFixed(casas).replace('.', ',')
}
