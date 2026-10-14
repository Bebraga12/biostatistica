import { caminho, cor, escala } from './svg'

const LARGURA = 158
const ALTURA = 100
const TOPO = 30

function painel(f: (x: number) => number, dominio: [number, number], deslocX: number) {
  const xs = Array.from({ length: 81 }, (_, i) => dominio[0] + ((dominio[1] - dominio[0]) * i) / 80)
  const ys = xs.map(f)
  const max = Math.max(...ys)
  const sx = escala(dominio, [deslocX + 6, deslocX + LARGURA - 6])
  const sy = escala([0, max], [TOPO + ALTURA, TOPO + 8])
  const pontos = xs.map((x, i) => [sx(x), sy(ys[i])] as [number, number])
  const linha = caminho(pontos)
  const area = `${linha}L${sx(dominio[1])},${sy(0)}L${sx(dominio[0])},${sy(0)}Z`
  return { linha, area, sx, sy, f }
}

// Normal (simétrica) × lognormal (assimétrica à direita).
export function CurvasDistribuicao() {
  const normal = painel((x) => Math.exp(-(x * x) / 2), [-3.2, 3.2], 0)
  const sigma = 0.75
  const logn = (x: number) => (x <= 0 ? 0 : Math.exp(-((Math.log(x)) ** 2) / (2 * sigma * sigma)) / x)
  const assim = painel(logn, [0, 5], 182)
  const mediana = 1
  const media = Math.exp((sigma * sigma) / 2)
  const base = TOPO + ALTURA

  return (
    <svg className="figure-svg" viewBox="0 0 340 158" role="img" aria-label="Distribuição simétrica em forma de sino comparada a uma distribuição assimétrica, em que a média se afasta da mediana">
      <text x={79} y={16} textAnchor="middle" style={{ ...cor.texto, fontSize: 12.5, fontWeight: 700 }}>Simétrica (normal)</text>
      <text x={261} y={16} textAnchor="middle" style={{ ...cor.texto, fontSize: 12.5, fontWeight: 700 }}>Assimétrica</text>

      <path d={normal.area} style={{ fill: 'var(--g-a)', opacity: 0.25 }} />
      <path d={normal.linha} fill="none" style={{ stroke: 'var(--g-a)' }} strokeWidth={2.5} />
      <line x1={normal.sx(0)} x2={normal.sx(0)} y1={normal.sy(1)} y2={base} style={cor.linha} strokeWidth={1.5} strokeDasharray="4 3" />

      <path d={assim.area} style={{ fill: 'var(--g-b)', opacity: 0.25 }} />
      <path d={assim.linha} fill="none" style={{ stroke: 'var(--g-b)' }} strokeWidth={2.5} />
      <line x1={assim.sx(mediana)} x2={assim.sx(mediana)} y1={TOPO + 14} y2={base} style={cor.linha} strokeWidth={1.5} strokeDasharray="4 3" />
      <line x1={assim.sx(media)} x2={assim.sx(media)} y1={TOPO + 30} y2={base} style={{ stroke: 'var(--err)' }} strokeWidth={1.5} strokeDasharray="4 3" />
      <text x={assim.sx(media) + 4} y={TOPO + 38} style={{ fontSize: 11, fontWeight: 600, fill: 'var(--err)' }}>média</text>
      <text x={assim.sx(mediana) + 4} y={TOPO + 22} style={{ ...cor.texto, fontSize: 11, fontWeight: 600 }}>mediana</text>

      <line x1={4} x2={160} y1={base} y2={base} style={cor.eixo} strokeWidth={1.5} />
      <line x1={184} x2={338} y1={base} y2={base} style={cor.eixo} strokeWidth={1.5} />

      <text x={79} y={base + 18} textAnchor="middle" style={{ ...cor.muted, fontSize: 11 }}>média = mediana</text>
      <text x={261} y={base + 18} textAnchor="middle" style={{ ...cor.muted, fontSize: 11 }}>cauda puxa a média</text>
    </svg>
  )
}
