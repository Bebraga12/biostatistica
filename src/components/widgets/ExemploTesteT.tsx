import { useState } from 'react'
import { LINHA_OUTLIER, RESULTADOS } from '../../data/exemplo'
import { Segmentado, Tabela } from '../ui'

function P({ valor, bomSeMaior }: { valor: string; bomSeMaior: boolean }) {
  const pequeno = valor.startsWith('<') || Number(valor.replace(',', '.')) < 0.05
  const bom = bomSeMaior ? !pequeno : pequeno
  return <span className={bom ? 'cell-ok' : 'cell-err'}>{valor}</span>
}

// Mesmo conjunto de dados do tema "Histograma e boxplot", agora com os testes.
export function ExemploTesteT() {
  const [cenario, setCenario] = useState<'com' | 'sem'>('com')
  const r = cenario === 'com' ? RESULTADOS.comOutlier : RESULTADOS.semOutlier

  return (
    <div className="widget">
      <div className="widget-title">
        Exemplo guiado: Linhagem A × B
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

      <Tabela
        numericas={[1, 2]}
        dados={{
          titulo: '1. Normalidade — Shapiro-Wilk (queremos p > 0,05)',
          colunas: ['Linhagem', 'W', 'p'],
          linhas: [
            ['A', r.A.swW, <P valor={r.A.swP} bomSeMaior />],
            ['B', r.B.swW, <P valor={r.B.swP} bomSeMaior />],
          ],
        }}
      />
      <Tabela
        numericas={[0, 1, 2]}
        dados={{
          titulo: '2. Variâncias — Levene (queremos p > 0,05)',
          colunas: ['F', 'gl', 'p'],
          linhas: [[r.levene.f, r.levene.gl, <P valor={r.levene.p} bomSeMaior />]],
        }}
      />
      <Tabela
        numericas={[1, 2, 3]}
        dados={{
          titulo: '3. Comparação das médias (H0: média A = média B)',
          colunas: ['Teste', 'Estatística', 'gl', 'p'],
          linhas: [
            ['t de Student', `t = ${r.student.t}`, r.student.gl, <P valor={r.student.p} bomSeMaior={false} />],
            ['Mann-Whitney U', `U = ${r.mannWhitney.u}`, '—', <P valor={r.mannWhitney.p} bomSeMaior={false} />],
          ],
        }}
      />

      {cenario === 'com' ? (
        <div className="verdict is-err" aria-live="polite">
          <b>Armadilha: o teste t diz "sem diferença" (p = 0,157)</b>
          <p>
            Mas o Shapiro-Wilk de A deu p &lt; 0,001 → <strong>pressuposto violado</strong>. O outlier inflou o desvio-padrão de A (1,14)
            e escondeu a diferença. O Levene não acusou (p = 0,072) porque a variação vem de um único ponto. O teste não paramétrico
            (Mann-Whitney, p = 0,003) mostra que as linhagens diferem.
          </p>
          <p>
            <strong>Leitura crítica:</strong> nunca confie no p do teste t sem checar os pressupostos.
          </p>
        </div>
      ) : (
        <div className="verdict is-ok" aria-live="polite">
          <b>Pressupostos ok → teste t válido: p &lt; 0,001</b>
          <p>
            Se a linha {LINHA_OUTLIER} era um erro comprovado (digitação/medição) e foi excluída com justificativa, A e B ficam normais e com variâncias iguais. Conclusão: o
            rendimento da Linhagem B (média 3,11) é significativamente maior que o da Linhagem A (média 2,22); t(17) = −16,23; p &lt; 0,001.
          </p>
          <p className="muted">Se o 5,8 fosse um valor real, não se apaga: usa-se o Mann-Whitney.</p>
        </div>
      )}
    </div>
  )
}
