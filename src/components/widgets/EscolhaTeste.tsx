import { useState } from 'react'
import { Icon } from '../Icon'

type Resposta = { pergunta: string; escolha: string }
type Resultado = { teste: string; porque: string; jamovi: string; extra?: boolean }
type Passo =
  | { pergunta: string; ajuda?: string; opcoes: { rotulo: string; detalhe?: string; proximo: Passo | Resultado }[] }

const NORMALIDADE = 'Os dados são normais? (Shapiro-Wilk)'
const VARIANCIAS = 'As variâncias são iguais? (Levene)'

const ARVORE: Passo = {
  pergunta: 'Quantos grupos você quer comparar?',
  opcoes: [
    {
      rotulo: '2 grupos ou 2 momentos',
      detalhe: 'ex.: Linhagem A × B, antes × depois',
      proximo: {
        pergunta: 'As medidas vêm de indivíduos diferentes ou dos mesmos indivíduos?',
        opcoes: [
          {
            rotulo: 'Indivíduos diferentes',
            detalhe: 'grupos independentes',
            proximo: {
              pergunta: NORMALIDADE,
              opcoes: [
                {
                  rotulo: 'Sim (p > 0,05)',
                  proximo: {
                    pergunta: VARIANCIAS,
                    opcoes: [
                      {
                        rotulo: 'Sim (p > 0,05)',
                        proximo: {
                          teste: 'Teste t independente (Student)',
                          porque: '2 grupos independentes, dados normais e variâncias iguais.',
                          jamovi: 'Testes T → Teste T para Amostras Independentes',
                        },
                      },
                      {
                        rotulo: 'Não (p < 0,05)',
                        proximo: {
                          teste: 'Teste t de Welch',
                          porque: '2 grupos independentes e normais, mas com variâncias diferentes.',
                          jamovi: 'Mesma tela do t independente, marcando "Welch"',
                          extra: true,
                        },
                      },
                    ],
                  },
                },
                {
                  rotulo: 'Não (p < 0,05)',
                  proximo: {
                    teste: 'Mann-Whitney U',
                    porque: '2 grupos independentes sem normalidade → equivalente não paramétrico do t independente.',
                    jamovi: 'Mesma tela do t independente, marcando "Mann-Whitney U"',
                    extra: true,
                  },
                },
              ],
            },
          },
          {
            rotulo: 'Mesmos indivíduos',
            detalhe: 'antes × depois, pares naturais',
            proximo: {
              pergunta: 'As diferenças (depois − antes) são normais? (Shapiro-Wilk)',
              opcoes: [
                {
                  rotulo: 'Sim (p > 0,05)',
                  proximo: {
                    teste: 'Teste t pareado',
                    porque: 'Os mesmos indivíduos foram medidos duas vezes (antes × depois).',
                    jamovi: 'Testes T → Teste T para Amostras Emparelhadas (Pareadas)',
                  },
                },
                {
                  rotulo: 'Não (p < 0,05)',
                  proximo: {
                    teste: 'Wilcoxon',
                    porque: 'Dados pareados sem normalidade → equivalente não paramétrico do t pareado.',
                    jamovi: 'Mesma tela do t pareado, marcando "Wilcoxon"',
                    extra: true,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      rotulo: '3 ou mais grupos',
      detalhe: 'ex.: 4 meios de cultura',
      proximo: {
        pergunta: NORMALIDADE,
        opcoes: [
          {
            rotulo: 'Sim (p > 0,05)',
            proximo: {
              pergunta: VARIANCIAS + ' — teste de homocedasticidade',
              opcoes: [
                {
                  rotulo: 'Sim (p > 0,05)',
                  proximo: {
                    teste: 'ANOVA + pós-teste de Tukey',
                    porque: '3+ grupos independentes, normais e com variâncias iguais. Se a ANOVA der p < 0,05, o Tukey mostra quais pares diferem.',
                    jamovi: 'ANOVA → ANOVA a um fator → Post-hoc: Tukey',
                  },
                },
                {
                  rotulo: 'Não (p < 0,05)',
                  proximo: {
                    teste: 'ANOVA de Welch + Games-Howell',
                    porque: '3+ grupos normais, mas com variâncias diferentes.',
                    jamovi: 'ANOVA a um fator → "Não assumir iguais (Welch)" → Post-hoc: Games-Howell',
                    extra: true,
                  },
                },
              ],
            },
          },
          {
            rotulo: 'Não (p < 0,05)',
            proximo: {
              teste: 'Kruskal-Wallis',
              porque: '3+ grupos sem normalidade → equivalente não paramétrico da ANOVA.',
              jamovi: 'ANOVA → Não paramétrica → Kruskal-Wallis',
              extra: true,
            },
          },
        ],
      },
    },
  ],
}

function ehResultado(n: Passo | Resultado): n is Resultado {
  return 'teste' in n
}

export function EscolhaTeste() {
  const [caminho, setCaminho] = useState<number[]>([])

  let atual: Passo | Resultado = ARVORE
  const trilha: Resposta[] = []
  for (const i of caminho) {
    if (ehResultado(atual)) break
    trilha.push({ pergunta: atual.pergunta, escolha: atual.opcoes[i].rotulo })
    atual = atual.opcoes[i].proximo
  }

  return (
    <div className="widget">
      <div className="widget-title">
        Qual teste usar?
        <span className="chip chip-primary">interativo</span>
      </div>

      {trilha.length > 0 && (
        <div className="wizard-trail" aria-label="Suas respostas">
          {trilha.map((r, i) => (
            <span key={i} className="chip">
              {r.escolha}
            </span>
          ))}
        </div>
      )}

      {ehResultado(atual) ? (
        <div className="result-test" aria-live="polite">
          <small>Teste indicado</small>
          <b>{atual.teste}</b>
          <p>{atual.porque}</p>
          <p className="muted">
            <strong>No Jamovi:</strong> {atual.jamovi}
          </p>
          {atual.extra && <p className="muted">Este caminho é complemento — vai além da anotação.</p>}
        </div>
      ) : (
        <>
          <p className="wizard-q">{atual.pergunta}</p>
          <div className="wizard-options">
            {atual.opcoes.map((o, i) => (
              <button key={o.rotulo} type="button" className="option-btn" onClick={() => setCaminho([...caminho, i])}>
                {o.rotulo}
                {o.detalhe && <small>{o.detalhe}</small>}
              </button>
            ))}
          </div>
        </>
      )}

      {caminho.length > 0 && (
        <div className="btn-row">
          <button type="button" className="btn btn-secondary" onClick={() => setCaminho(caminho.slice(0, -1))}>
            <Icon name="chevronLeft" /> Voltar
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setCaminho([])}>
            <Icon name="rotate" /> Recomeçar
          </button>
        </div>
      )}
    </div>
  )
}
