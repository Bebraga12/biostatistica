export const TEMAS = {
  descritiva: 'Estatística descritiva',
  graficos: 'Histograma e boxplot',
  jamovi: 'Jamovi na prática',
  inferencial: 'Hipóteses e p-valor',
  pressupostos: 'Pressupostos (Shapiro e Levene)',
  'teste-t': 'Teste t de Student',
  anova: 'ANOVA e Tukey',
  escolha: 'Qual teste escolher?',
  critica: 'Leitura crítica',
} as const

export type TemaId = keyof typeof TEMAS

export const TEMA_IDS = Object.keys(TEMAS) as TemaId[]

export function isTema(valor: string | null): valor is TemaId {
  return valor !== null && valor in TEMAS
}
