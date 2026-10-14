// Dados ILUSTRATIVOS que imitam os gráficos do PDF (Rendimento × Linhagem).
// Os valores estatísticos abaixo foram calculados com scipy a partir destes dados.

export type Observacao = { linha: number; grupo: 'A' | 'B'; valor: number }

const LINHAGEM_A = [2.1, 2.3, 2.0, 2.2, 2.4, 2.25, 2.15, 2.35, 5.8, 2.2]
const LINHAGEM_B = [3.0, 3.1, 3.2, 3.05, 3.15, 3.3, 2.95, 3.1, 3.25, 3.0]

export const LINHA_OUTLIER = 9

export const DADOS: Observacao[] = [
  ...LINHAGEM_A.map((valor, i) => ({ linha: i + 1, grupo: 'A' as const, valor })),
  ...LINHAGEM_B.map((valor, i) => ({ linha: i + 11, grupo: 'B' as const, valor })),
]

export function dadosDoCenario(comOutlier: boolean) {
  return comOutlier ? DADOS : DADOS.filter((d) => d.linha !== LINHA_OUTLIER)
}

type Descritiva = { n: string; media: string; mediana: string; dp: string; min: string; max: string; swW: string; swP: string }

export const RESULTADOS = {
  comOutlier: {
    A: { n: '10', media: '2,58', mediana: '2,23', dp: '1,14', min: '2,00', max: '5,80', swW: '0,467', swP: '< 0,001' } satisfies Descritiva,
    B: { n: '10', media: '3,11', mediana: '3,10', dp: '0,11', min: '2,95', max: '3,30', swW: '0,961', swP: '0,799' } satisfies Descritiva,
    levene: { f: '3,64', gl: '1; 18', p: '0,072' },
    student: { t: '−1,48', gl: '18', p: '0,157' },
    mannWhitney: { u: '10', p: '0,003' },
  },
  semOutlier: {
    A: { n: '9', media: '2,22', mediana: '2,20', dp: '0,12', min: '2,00', max: '2,40', swW: '0,986', swP: '0,987' } satisfies Descritiva,
    B: { n: '10', media: '3,11', mediana: '3,10', dp: '0,11', min: '2,95', max: '3,30', swW: '0,961', swP: '0,799' } satisfies Descritiva,
    levene: { f: '0,02', gl: '1; 17', p: '0,890' },
    student: { t: '−16,23', gl: '17', p: '< 0,001' },
    mannWhitney: { u: '0', p: '< 0,001' },
  },
}

// ── utilitários para desenhar os gráficos

/** Quantil pelo método linear (tipo 7, o padrão do R/Jamovi). */
export function quantil(ordenados: number[], p: number) {
  const h = (ordenados.length - 1) * p
  const i = Math.floor(h)
  const resto = h - i
  return ordenados[i] + (ordenados[Math.min(i + 1, ordenados.length - 1)] - ordenados[i]) * resto
}

export function resumoBoxplot(valores: number[]) {
  const s = [...valores].sort((a, b) => a - b)
  const q1 = quantil(s, 0.25)
  const mediana = quantil(s, 0.5)
  const q3 = quantil(s, 0.75)
  const aiq = q3 - q1
  const limInf = q1 - 1.5 * aiq
  const limSup = q3 + 1.5 * aiq
  const dentro = s.filter((v) => v >= limInf && v <= limSup)
  return {
    q1,
    mediana,
    q3,
    bigodeInf: Math.min(...dentro),
    bigodeSup: Math.max(...dentro),
    ehOutlier: (v: number) => v < limInf || v > limSup,
  }
}

/** Curva de densidade (kernel gaussiano), como a opção "Densidade" do Jamovi. */
export function densidade(valores: number[], xs: number[], banda = 0.12) {
  const k = 1 / (valores.length * banda * Math.sqrt(2 * Math.PI))
  return xs.map((x) => k * valores.reduce((soma, v) => soma + Math.exp(-0.5 * ((x - v) / banda) ** 2), 0))
}
