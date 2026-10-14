import { cor, escala } from './svg'

const POUCO = [4.6, 4.8, 4.9, 5, 5, 5.1, 5.2, 5.4]
const MUITO = [2.2, 3.1, 3.9, 4.6, 5.4, 6.1, 6.9, 7.8]

// Dois grupos com a mesma média (5) e desvios-padrão bem diferentes.
export function DispersaoPontos() {
  const sx = escala([0, 10], [20, 320])
  const linhas = [
    { y: 46, valores: POUCO, rotulo: 'Grupo X — DP pequeno (0,2)', corPonto: 'var(--g-a)' },
    { y: 112, valores: MUITO, rotulo: 'Grupo Y — DP grande (1,9)', corPonto: 'var(--g-b)' },
  ]
  return (
    <svg className="figure-svg" viewBox="0 0 340 150" role="img" aria-label="Dois grupos com a mesma média: no grupo X os pontos ficam juntos, no grupo Y ficam espalhados">
      {linhas.map((l) => (
        <g key={l.y}>
          <text x={20} y={l.y - 18} style={{ ...cor.texto, fontSize: 12, fontWeight: 650 }}>{l.rotulo}</text>
          <line x1={20} x2={320} y1={l.y} y2={l.y} style={cor.eixo} strokeWidth={1.5} />
          <line x1={sx(5)} x2={sx(5)} y1={l.y - 14} y2={l.y + 8} style={{ stroke: 'var(--primary)' }} strokeWidth={1.5} strokeDasharray="4 3" />
          {l.valores.map((v, i) => (
            <circle key={i} cx={sx(v)} cy={l.y - (i % 2) * 7} r={5.5} style={{ fill: l.corPonto, stroke: 'var(--surface)' }} strokeWidth={1.5} />
          ))}
        </g>
      ))}
      <text x={sx(5)} y={142} textAnchor="middle" style={{ fontSize: 11.5, fontWeight: 700, fill: 'var(--primary)' }}>média = 5 nos dois</text>
    </svg>
  )
}
