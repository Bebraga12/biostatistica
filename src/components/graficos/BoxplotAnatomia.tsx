import { cor } from './svg'

// Boxplot horizontal com cada parte nomeada.
export function BoxplotAnatomia() {
  const y = 80
  const x = { min: 30, q1: 100, med: 146, q3: 200, max: 258, out: 308 }
  const fonte = { fontSize: 12, fontWeight: 600 }
  const leader = { ...cor.linhaMuted, strokeWidth: 1, strokeDasharray: '2 3' }

  return (
    <svg className="figure-svg" viewBox="0 0 340 170" role="img" aria-label="Partes de um boxplot: mínimo, Q1, mediana, Q3, máximo, bigodes e outlier">
      {/* bigodes */}
      <line x1={x.min} x2={x.q1} y1={y} y2={y} style={cor.linha} strokeWidth={2} />
      <line x1={x.q3} x2={x.max} y1={y} y2={y} style={cor.linha} strokeWidth={2} />
      <line x1={x.min} x2={x.min} y1={y - 10} y2={y + 10} style={cor.linha} strokeWidth={2} />
      <line x1={x.max} x2={x.max} y1={y - 10} y2={y + 10} style={cor.linha} strokeWidth={2} />
      {/* caixa */}
      <rect x={x.q1} y={y - 18} width={x.q3 - x.q1} height={36} rx={3} style={{ fill: 'var(--primary-soft)', stroke: 'var(--primary)' }} strokeWidth={2} />
      <line x1={x.med} x2={x.med} y1={y - 18} y2={y + 18} style={{ stroke: 'var(--primary)' }} strokeWidth={3.5} />
      {/* outlier */}
      <circle cx={x.out} cy={y} r={5} style={{ fill: 'var(--err)' }} />

      {/* rótulos de cima */}
      <text x={x.med} y={34} textAnchor="middle" style={{ ...cor.texto, ...fonte, fill: 'var(--primary)' }}>Mediana</text>
      <line x1={x.med} x2={x.med} y1={40} y2={y - 20} style={leader} />
      <text x={x.out} y={50} textAnchor="middle" style={{ ...fonte, fill: 'var(--err)' }}>Outlier</text>
      <line x1={x.out} x2={x.out} y1={56} y2={y - 7} style={leader} />
      <text x={(x.min + x.q1) / 2} y={y - 8} textAnchor="middle" style={{ ...cor.muted, fontSize: 11, fontStyle: 'italic' }}>bigode</text>
      <text x={(x.q3 + x.max) / 2} y={y - 8} textAnchor="middle" style={{ ...cor.muted, fontSize: 11, fontStyle: 'italic' }}>bigode</text>

      {/* rótulos de baixo */}
      {[
        { px: x.min, txt: 'Mínimo', y0: y + 11 },
        { px: x.q1, txt: 'Q1 (25%)', y0: y + 19 },
        { px: x.q3, txt: 'Q3 (75%)', y0: y + 19 },
        { px: x.max, txt: 'Máximo', y0: y + 11 },
      ].map((r) => (
        <g key={r.txt}>
          <line x1={r.px} x2={r.px} y1={r.y0} y2={110} style={leader} />
          <text x={r.px} y={124} textAnchor="middle" style={{ ...cor.texto, ...fonte }}>{r.txt}</text>
        </g>
      ))}

      {/* AIQ */}
      <path d={`M${x.q1},134 v6 H${x.q3} v-6`} fill="none" style={{ stroke: 'var(--primary)' }} strokeWidth={1.5} />
      <text x={(x.q1 + x.q3) / 2} y={158} textAnchor="middle" style={{ ...fonte, fill: 'var(--primary)' }}>AIQ = 50% centrais</text>
    </svg>
  )
}
