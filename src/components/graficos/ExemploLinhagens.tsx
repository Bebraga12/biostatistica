import { useState } from 'react'
import { LINHA_OUTLIER, RESULTADOS, dadosDoCenario, densidade, resumoBoxplot, type Observacao } from '../../data/exemplo'
import { Segmentado, Tabela } from '../ui'
import { GRUPO_COR, caminho, cor, escala, num } from './svg'

type Cenario = 'com' | 'sem'
const GRUPOS = ['A', 'B'] as const

function valoresDo(dados: Observacao[], g: 'A' | 'B') {
  return dados.filter((d) => d.grupo === g).map((d) => d.valor)
}

function eixoX(comOutlier: boolean) {
  return comOutlier
    ? { dominio: [1.75, 6.25] as [number, number], ticks: [2, 3, 4, 5, 6] }
    : { dominio: [1.75, 3.75] as [number, number], ticks: [2, 2.5, 3, 3.5] }
}

/** Histograma + densidade por linhagem, no estilo da saída do Jamovi. */
function Histograma({ dados, comOutlier }: { dados: Observacao[]; comOutlier: boolean }) {
  const { dominio, ticks } = eixoX(comOutlier)
  const sx = escala(dominio, [40, 328])
  const LARG_BIN = 0.25
  const ALT = 66
  const base = { A: 92, B: 176 }
  const sy = (d: number) => (d / 3.4) * ALT
  const xs = Array.from({ length: 121 }, (_, i) => dominio[0] + ((dominio[1] - dominio[0]) * i) / 120)

  return (
    <svg className="figure-svg" viewBox="0 0 340 222" role="img" aria-label="Histograma do rendimento por linhagem">
      {GRUPOS.map((g) => {
        const valores = valoresDo(dados, g)
        const bins = new Map<number, number>()
        for (const v of valores) {
          const i = Math.floor((v - 1.75) / LARG_BIN + 1e-9)
          bins.set(i, (bins.get(i) ?? 0) + 1)
        }
        const dens = densidade(valores, xs)
        const curva = caminho(xs.map((x, i) => [sx(x), base[g] - sy(dens[i])]))
        return (
          <g key={g}>
            {[...bins].map(([i, n]) => {
              const x0 = 1.75 + i * LARG_BIN
              const h = sy(n / (valores.length * LARG_BIN))
              return (
                <rect
                  key={i}
                  x={sx(x0)}
                  y={base[g] - h}
                  width={sx(x0 + LARG_BIN) - sx(x0)}
                  height={h}
                  style={{ fill: GRUPO_COR[g], fillOpacity: 0.6, stroke: GRUPO_COR[g] }}
                  strokeWidth={1}
                />
              )
            })}
            <path d={curva} fill="none" style={cor.linha} strokeWidth={1.5} />
            <line x1={40} x2={328} y1={base[g]} y2={base[g]} style={cor.eixo} strokeWidth={1.5} />
            {/* A tem dados à esquerda e B à direita: cada rótulo vai no lado vazio */}
            <text
              x={g === 'A' ? 328 : 40}
              y={base[g] - 50}
              textAnchor={g === 'A' ? 'end' : 'start'}
              style={{ ...cor.texto, fontSize: 12, fontWeight: 700 }}
            >
              Linhagem {g}
            </text>
          </g>
        )
      })}
      {comOutlier && (
        <text x={sx(5.875)} y={base.A - 16} textAnchor="middle" style={{ fontSize: 11, fontWeight: 700, fill: 'var(--err)' }}>
          linha {LINHA_OUTLIER}
        </text>
      )}
      {ticks.map((t) => (
        <g key={t}>
          <line x1={sx(t)} x2={sx(t)} y1={base.B} y2={base.B + 5} style={cor.linhaMuted} />
          <text x={sx(t)} y={base.B + 18} textAnchor="middle" style={{ ...cor.muted, fontSize: 11 }}>
            {num(t, t % 1 ? 1 : 0)}
          </text>
        </g>
      ))}
      <text x={184} y={base.B + 38} textAnchor="middle" style={{ ...cor.texto, fontSize: 12, fontWeight: 600 }}>
        Rendimento
      </text>
    </svg>
  )
}

/** Boxplot vertical com etiqueta de outlier (nº da linha), como no Jamovi. */
function Boxplot({ dados, comOutlier }: { dados: Observacao[]; comOutlier: boolean }) {
  const { dominio, ticks } = eixoX(comOutlier)
  const sy = escala(dominio, [196, 14])
  const centro = { A: 136, B: 256 }
  const meia = 32

  return (
    <svg className="figure-svg" viewBox="0 0 340 240" role="img" aria-label="Boxplot do rendimento por linhagem">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={50} x2={330} y1={sy(t)} y2={sy(t)} style={cor.eixo} strokeDasharray="2 4" />
          <text x={44} y={sy(t) + 4} textAnchor="end" style={{ ...cor.muted, fontSize: 11 }}>
            {num(t, t % 1 ? 1 : 0)}
          </text>
        </g>
      ))}
      <text transform="translate(14 105) rotate(-90)" textAnchor="middle" style={{ ...cor.texto, fontSize: 12, fontWeight: 600 }}>
        Rendimento
      </text>
      {GRUPOS.map((g) => {
        const obs = dados.filter((d) => d.grupo === g)
        const r = resumoBoxplot(obs.map((d) => d.valor))
        const cx = centro[g]
        return (
          <g key={g}>
            <line x1={cx} x2={cx} y1={sy(r.bigodeSup)} y2={sy(r.q3)} style={cor.linha} strokeWidth={1.5} />
            <line x1={cx} x2={cx} y1={sy(r.q1)} y2={sy(r.bigodeInf)} style={cor.linha} strokeWidth={1.5} />
            <line x1={cx - 10} x2={cx + 10} y1={sy(r.bigodeSup)} y2={sy(r.bigodeSup)} style={cor.linha} strokeWidth={1.5} />
            <line x1={cx - 10} x2={cx + 10} y1={sy(r.bigodeInf)} y2={sy(r.bigodeInf)} style={cor.linha} strokeWidth={1.5} />
            <rect
              x={cx - meia}
              y={sy(r.q3)}
              width={meia * 2}
              height={Math.max(sy(r.q1) - sy(r.q3), 2)}
              rx={2}
              style={{ fill: GRUPO_COR[g], fillOpacity: 0.55, stroke: 'var(--text)' }}
              strokeWidth={1.2}
            />
            <line x1={cx - meia} x2={cx + meia} y1={sy(r.mediana)} y2={sy(r.mediana)} style={cor.linha} strokeWidth={2.5} />
            {obs
              .filter((d) => r.ehOutlier(d.valor))
              .map((d) => (
                <g key={d.linha}>
                  <circle cx={cx} cy={sy(d.valor)} r={4.5} style={{ fill: 'var(--err)' }} />
                  <rect x={cx - 30} y={sy(d.valor) - 9} width={18} height={18} rx={3} style={{ fill: 'var(--surface)', stroke: 'var(--err)' }} />
                  <text x={cx - 21} y={sy(d.valor) + 4} textAnchor="middle" style={{ fontSize: 11, fontWeight: 700, fill: 'var(--err)' }}>
                    {d.linha}
                  </text>
                </g>
              ))}
            <text x={cx} y={216} textAnchor="middle" style={{ ...cor.texto, fontSize: 12, fontWeight: 600 }}>
              Linhagem {g}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function ExemploLinhagens() {
  const [cenario, setCenario] = useState<Cenario>('com')
  const comOutlier = cenario === 'com'
  const dados = dadosDoCenario(comOutlier)
  const res = comOutlier ? RESULTADOS.comOutlier : RESULTADOS.semOutlier

  const linha = (rotulo: string, chave: keyof typeof res.A) => [rotulo, res.A[chave], res.B[chave]]

  return (
    <div className="widget">
      <div className="widget-title">
        Exemplo: Rendimento × Linhagem
        <span className="chip">dados ilustrativos</span>
      </div>
      <Segmentado
        rotulo="Cenário"
        valor={cenario}
        onChange={setCenario}
        opcoes={[
          { valor: 'com', rotulo: 'Com o outlier' },
          { valor: 'sem', rotulo: `Sem a linha ${LINHA_OUTLIER}` },
        ]}
      />
      <div className="figure-card">
        <p className="figure-title">Histograma + densidade</p>
        <Histograma dados={dados} comOutlier={comOutlier} />
      </div>
      <div className="figure-card">
        <p className="figure-title">Box plot com etiqueta de outliers</p>
        <Boxplot dados={dados} comOutlier={comOutlier} />
      </div>
      <Tabela
        numericas={[1, 2]}
        dados={{
          titulo: 'Estatística descritiva (como sai no Jamovi)',
          colunas: ['', 'Linhagem A', 'Linhagem B'],
          linhas: [
            linha('N', 'n'),
            linha('Média', 'media'),
            linha('Mediana', 'mediana'),
            linha('Desvio-padrão', 'dp'),
            linha('Mínimo', 'min'),
            linha('Máximo', 'max'),
            linha('Shapiro-Wilk W', 'swW'),
            linha('Shapiro-Wilk p', 'swP'),
          ],
        }}
      />
      {comOutlier ? (
        <p className="muted">
          O outlier da linha {LINHA_OUTLIER} puxa a <strong>média</strong> de A para 2,58, mas a <strong>mediana</strong> quase não muda
          (2,23). O desvio-padrão de A explode (1,14) e o Shapiro-Wilk dá p &lt; 0,001: <strong>A não é normal</strong>.
        </p>
      ) : (
        <p className="muted">
          Sem a linha {LINHA_OUTLIER}, média e mediana de A ficam quase iguais (2,22 e 2,20), o DP cai para 0,12 e o Shapiro-Wilk dá
          p = 0,987: <strong>normalidade ok</strong> nos dois grupos.
        </p>
      )}
    </div>
  )
}
