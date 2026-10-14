import type { ComponentType } from 'react'
import { BoxplotAnatomia } from '../components/graficos/BoxplotAnatomia'
import { CurvasDistribuicao } from '../components/graficos/CurvasDistribuicao'
import { DispersaoPontos } from '../components/graficos/DispersaoPontos'
import { ExemploLinhagens } from '../components/graficos/ExemploLinhagens'
import { Anotacao, Callout, Checklist, Definicao, Tabela, Termo } from '../components/ui'
import { EscolhaTeste } from '../components/widgets/EscolhaTeste'
import { ExemploTesteT } from '../components/widgets/ExemploTesteT'
import { InterpretePValor } from '../components/widgets/InterpretePValor'
import type { TemaId } from '../data/temas'

export type Secao = {
  id: string
  titulo: string
  resumo: string
  /** Tema de questões ligado a esta seção (botão "Praticar este tema"). */
  tema: TemaId | null
  Conteudo: ComponentType
}

// ───────────────────────────────────────────── 1
function VisaoGeral() {
  return (
    <>
      <Anotacao>
        Assuntos: estatística descritiva · inferencial · sobre pressuposto de normalidade · testes t de Student · ANOVA
      </Anotacao>
      <p>
        A matéria segue a ordem de uma análise de dados de verdade no laboratório. Se você entender esse caminho, entende a prova:
      </p>
      <ol className="steps">
        <li>
          <strong>Inserir os dados no Jamovi</strong>
          <p>Cada linha é uma observação; cada coluna, uma variável (nominal ou contínua).</p>
        </li>
        <li>
          <strong>Descrever (estatística descritiva)</strong>
          <p>Média, mediana, desvio-padrão, histograma e boxplot. Procurar outliers.</p>
        </li>
        <li>
          <strong>Checar os pressupostos</strong>
          <p>Normalidade (Shapiro-Wilk) e igualdade de variâncias (Levene).</p>
        </li>
        <li>
          <strong>Escolher e aplicar o teste (inferencial)</strong>
          <p>2 grupos independentes → t independente · antes × depois → t pareado · 3+ grupos → ANOVA.</p>
        </li>
        <li>
          <strong>Interpretar o p-valor e concluir</strong>
          <p>p &lt; 0,05 → rejeita H0. Na ANOVA significativa, fazer o pós-teste de Tukey.</p>
        </li>
      </ol>
      <h2>Como a prova cobra cada teste</h2>
      <Anotacao>objetivo dos testes: definição, aplicação, leitura crítica</Anotacao>
      <div className="term-grid">
        <Termo nome="Definição">
          <p>O que é o teste e para que serve. Ex.: "o teste t compara as médias de dois grupos".</p>
        </Termo>
        <Termo nome="Aplicação">
          <p>Quando usar (qual delineamento) e como rodar no Jamovi. Ex.: "antes × depois → t pareado".</p>
        </Termo>
        <Termo nome="Leitura crítica">
          <p>Ler a saída, interpretar o p e achar erros: teste errado, pressuposto ignorado, conclusão exagerada.</p>
        </Termo>
      </div>
      <Callout tipo="dica">
        <p>
          Leia um tema e, no fim da página, toque em <strong>Praticar este tema</strong>. Quando estiver confiante, faça um simulado na aba{' '}
          <strong>Praticar</strong>.
        </p>
      </Callout>
    </>
  )
}

// ───────────────────────────────────────────── 2
function Descritiva() {
  return (
    <>
      <Definicao>
        <strong>Estatística descritiva</strong> resume e descreve os dados obtidos no experimento. Ela fala só da amostra que você tem nas
        mãos — não generaliza nem testa hipóteses.
      </Definicao>
      <Anotacao>Calcula média, mediana, desvio-padrão e constrói gráficos (Boxplots/Histogramas). Resume e descreve os dados obtidos no experimento.</Anotacao>

      <h2>Tendência central: onde fica o "centro"</h2>
      <div className="term-grid">
        <Termo nome="Média" tag="soma ÷ n">
          <p>Soma de todos os valores dividida pela quantidade. Usa todos os dados, por isso é sensível a valores extremos.</p>
        </Termo>
        <Termo nome="Mediana" tag="valor do meio">
          <p>Com os dados em ordem, é o valor do meio: 50% ficam abaixo e 50% acima. Resiste a outliers.</p>
        </Termo>
        <Termo nome="Moda" tag="mais frequente">
          <p>O valor que mais se repete.</p>
        </Termo>
      </div>
      <Callout tipo="dica" titulo="Exemplo rápido">
        <p>
          Dados: 2, 3, 3, 4, <strong>18</strong>. Média = 30 ÷ 5 = <strong>6</strong>. Mediana = <strong>3</strong>.
        </p>
        <p>O 18 "puxou" a média para cima. A mediana continua representando bem o grupo.</p>
      </Callout>

      <h2>Dispersão: o quanto os dados variam</h2>
      <div className="term-grid">
        <Termo nome="Desvio-padrão (DP)" tag="o mais usado">
          <p>Distância típica dos dados até a média, na mesma unidade da variável.</p>
          <p>DP pequeno = dados concentrados (grupo homogêneo). DP grande = dados espalhados.</p>
        </Termo>
        <Termo nome="Variância" tag="DP²">
          <p>O desvio-padrão ao quadrado. É o que o teste de Levene compara entre os grupos.</p>
        </Termo>
        <Termo nome="Amplitude" tag="máx − mín">
          <p>Diferença entre o maior e o menor valor.</p>
        </Termo>
        <Termo nome="AIQ" tag="Q3 − Q1">
          <p>Amplitude interquartil: a faixa dos 50% centrais. É o tamanho da "caixa" do boxplot.</p>
        </Termo>
      </div>
      <figure className="figure-card">
        <DispersaoPontos />
        <figcaption>Mesma média, dispersões diferentes: a média sozinha não descreve os dados.</figcaption>
      </figure>

      <Callout tipo="atencao">
        <p>
          A descritiva mostra <em>que</em> existe uma diferença entre grupos na amostra, mas <strong>não diz se ela é real ou acaso</strong>.
          Isso é papel da estatística inferencial.
        </p>
      </Callout>
    </>
  )
}

// ───────────────────────────────────────────── 3
function Graficos() {
  return (
    <>
      <h2>Histograma: a forma dos dados</h2>
      <p>
        Cada barra mostra <strong>quantos dados caem numa faixa de valores</strong>. Serve para ver a forma da distribuição: simétrica em sino
        (sugere normalidade), assimétrica ou com valores isolados. No Jamovi, a opção <strong>Densidade</strong> desenha a curva suavizada por
        cima.
      </p>
      <figure className="figure-card">
        <CurvasDistribuicao />
        <figcaption>Na distribuição normal, média e mediana coincidem. Na assimétrica, a cauda puxa a média.</figcaption>
      </figure>

      <h2>Boxplot (gráfico de caixa)</h2>
      <p>Resume os dados em cinco números e destaca os outliers:</p>
      <figure className="figure-card">
        <BoxplotAnatomia />
      </figure>
      <ul>
        <li>
          <strong>Linha dentro da caixa</strong> = mediana.
        </li>
        <li>
          <strong>Caixa</strong> = do Q1 (25%) ao Q3 (75%): os 50% centrais. Caixa comprida = muita variação.
        </li>
        <li>
          <strong>Bigodes</strong> = vão até os valores mais extremos que ainda não são outliers (até 1,5 × AIQ além da caixa).
        </li>
        <li>
          <strong>Pontos isolados</strong> = outliers. Com <em>Etiqueta outliers</em>, o Jamovi escreve o número da linha da planilha.
        </li>
      </ul>

      <h2>Lendo o exemplo do PDF</h2>
      <p>
        O PDF mostra o <strong>Rendimento</strong> de duas linhagens. Os gráficos abaixo recriam aquela saída com dados ilustrativos. Alterne
        os cenários para ver o efeito do outlier:
      </p>
      <ExemploLinhagens />
      <h3>O que os gráficos mostram</h3>
      <ul>
        <li>
          <strong>Linhagem B rende mais</strong> (em torno de 3,1) que a Linhagem A (em torno de 2,2).
        </li>
        <li>B é simétrica e concentrada: caixa estreita, sem outliers.</li>
        <li>
          A tem um <strong>outlier</strong> — a observação da <strong>linha 9</strong> (~5,8), muito acima do resto.
        </li>
        <li>O outlier puxa a média de A para cima, quase não mexe na mediana e quebra a normalidade (Shapiro-Wilk).</li>
      </ul>
      <Callout tipo="atencao" titulo="O que fazer com um outlier?">
        <ul>
          <li>
            <strong>Erro de digitação ou medição?</strong> Corrija (ou exclua, justificando).
          </li>
          <li>
            <strong>Valor biológico real?</strong> Não apague. Relate e prefira um teste não paramétrico, que é menos sensível a outliers.
          </li>
        </ul>
      </Callout>
      <Callout tipo="dica">
        <p>
          Para descrever um gráfico na prova, fale de 4 coisas: <strong>centro</strong> (mediana/média), <strong>dispersão</strong> (tamanho
          da caixa/DP), <strong>forma</strong> (simetria) e <strong>outliers</strong>.
        </p>
      </Callout>
    </>
  )
}

// ───────────────────────────────────────────── 4
function Jamovi() {
  return (
    <>
      <p>O roteiro abaixo reproduz o que está no PDF, do zero até os gráficos.</p>
      <ol className="steps">
        <li>
          <strong>Inserção de dados</strong>
          <p>
            Cada <strong>linha</strong> é uma observação (uma planta, um animal, uma placa). Cada <strong>coluna</strong> é uma variável.
          </p>
        </li>
        <li>
          <strong>Configurar o tipo de cada variável</strong>
          <p>Aba Dados → Configuração (ou dois cliques no cabeçalho da coluna).</p>
        </li>
        <li>
          <strong>Abrir a Estatística Descritiva</strong>
          <p>Análises → Exploração → Estatística Descritiva.</p>
        </li>
        <li>
          <strong>Montar a análise</strong>
          <p>Rendimento em "Variáveis"; Linhagem em "Separar por".</p>
        </li>
        <li>
          <strong>Marcar as opções e ler a saída</strong>
          <p>Tabela com as estatísticas por linhagem + histogramas e boxplots.</p>
        </li>
      </ol>

      <h2>Tipos de variável</h2>
      <Anotacao>
        tabela 1: medida = nominal / dados = texto
        <br />
        tabela 2: medida = contínua / dados = decimal
      </Anotacao>
      <Tabela
        dados={{
          colunas: ['Variável', 'Exemplo', 'Medida', 'Dados'],
          linhas: [
            ['Linhagem', 'A, B', 'Nominal', 'Texto'],
            ['Rendimento', '2,35', 'Contínua', 'Decimal'],
          ],
        }}
      />
      <ul>
        <li>
          <strong>Nominal</strong>: categorias sem ordem — grupos, tratamentos, linhagens, sexo. É a variável que separa os grupos.
        </li>
        <li>
          <strong>Contínua</strong>: medida numérica que pode ter casas decimais — peso, altura, rendimento. É a variável resposta.
        </li>
        <li>
          <strong>Ordinal</strong> (complemento): categorias com ordem — escores como leve / moderado / grave.
        </li>
      </ul>

      <h2>O que marcar na Estatística Descritiva</h2>
      <figure>
        <img
          className="screenshot"
          src="/img/jamovi-descritiva.webp"
          width={392}
          height={590}
          loading="lazy"
          alt="Tela de Estatística Descritiva do Jamovi com Rendimento em Variáveis e Linhagem em Separar por, com N, Omisso, Média, Mediana, Desvio-padrão, Mínimo, Máximo, Shapiro-Wilk, Histograma, Densidade, Gráfico de caixa e Etiqueta outliers marcados"
        />
        <figcaption>Tela do Jamovi, como no PDF.</figcaption>
      </figure>
      <Tabela
        dados={{
          colunas: ['Bloco', 'Marcar'],
          linhas: [
            ['Dimensão da amostra', 'N, Omisso'],
            ['Tendência central', 'Média, Mediana'],
            ['Dispersão', 'Desvio-padrão, Mínimo, Máximo'],
            ['Normalidade', 'Shapiro-Wilk'],
            ['Histogramas', 'Histograma, Densidade'],
            ['Box plots', 'Gráfico de caixa, Etiqueta outliers'],
          ],
        }}
      />

      <h2>Onde ficam os testes</h2>
      <div className="term-grid">
        <Termo nome="Teste t independente">
          <p>Testes T → Teste T para Amostras Independentes. Variável dependente: Rendimento. Variável de agrupamento: Linhagem.</p>
          <p>Em "Verificação de pressupostos": teste de homogeneidade (Levene) e de normalidade (Shapiro-Wilk).</p>
        </Termo>
        <Termo nome="Teste t pareado">
          <p>Testes T → Teste T para Amostras Emparelhadas (Pareadas). Coloque o par de colunas Antes e Depois.</p>
        </Termo>
        <Termo nome="ANOVA + Tukey">
          <p>ANOVA → ANOVA a um fator. Pressupostos: homogeneidade e normalidade. Testes post-hoc: Tukey.</p>
        </Termo>
      </div>
      <p className="muted">Os nomes dos menus podem variar um pouco conforme a versão e o idioma do Jamovi.</p>
    </>
  )
}

// ───────────────────────────────────────────── 5
function Inferencial() {
  return (
    <>
      <Definicao>
        <strong>Estatística inferencial</strong> generaliza as conclusões da amostra para toda a população biológica.
      </Definicao>
      <Anotacao>
        Responde se a diferença observada no laboratório é um <strong>efeito biológico real</strong> ou apenas ruído aleatório/acaso.
      </Anotacao>
      <p>
        Você não mede todas as plantas da Linhagem A do mundo — mede uma <strong>amostra</strong>. Mesmo sem nenhuma diferença real, duas
        amostras quase nunca dão médias idênticas, só por acaso. A pergunta da inferencial é:{' '}
        <strong>essa diferença é grande demais para ser só acaso?</strong>
      </p>

      <h2>As duas hipóteses</h2>
      <Anotacao>
        hipótese nula, normalmente é negativa
        <br />
        hipótese alternativa, normalmente é positiva
      </Anotacao>
      <div className="term-grid cols-2">
        <Termo nome="H0 — hipótese nula" tag="negativa">
          <p>Não há diferença / não há efeito.</p>
          <p>Ex.: rendimento médio de A = rendimento médio de B.</p>
        </Termo>
        <Termo nome="H1 — hipótese alternativa" tag="positiva">
          <p>Há diferença / há efeito.</p>
          <p>Ex.: rendimento médio de A ≠ rendimento médio de B.</p>
        </Termo>
      </div>

      <h2>O valor-p</h2>
      <p>
        É a <strong>probabilidade de observar uma diferença tão grande quanto a encontrada (ou maior) se H0 fosse verdadeira</strong> — ou
        seja, só por acaso. p pequeno = difícil explicar pelo acaso.
      </p>
      <Anotacao>
        se p &lt; 0,05 rejeitamos H0
        <br />
        se p &gt; 0,05 não rejeitamos H0
      </Anotacao>
      <div className="decision">
        <div className="is-ok">
          <b>p &lt; 0,05 → rejeita H0</b>
          <span>Diferença estatisticamente significativa. Provável efeito real.</span>
        </div>
        <div className="is-err">
          <b>p &gt; 0,05 → não rejeita H0</b>
          <span>Sem evidência suficiente de diferença. Pode ser só acaso.</span>
        </div>
      </div>
      <p>
        O 0,05 é o <strong>nível de significância (α)</strong>: aceitamos 5% de risco de dizer que existe efeito quando ele não existe (erro
        tipo I).
      </p>
      <InterpretePValor contextos={['teste']} />
      <Callout tipo="atencao" titulo="Pegadinhas clássicas">
        <ul>
          <li>
            Diga <strong>"não rejeitamos H0"</strong>, e não "aceitamos H0" nem "provamos que são iguais".
          </li>
          <li>O p não é a probabilidade de H0 ser verdadeira.</li>
          <li>
            <strong>Significativo ≠ importante.</strong> Olhe também o tamanho da diferença (as médias).
          </li>
        </ul>
      </Callout>
    </>
  )
}

// ───────────────────────────────────────────── 6
function Pressupostos() {
  return (
    <>
      <p>
        O teste t e a ANOVA são <strong>testes paramétricos</strong>: só dão um p confiável se os dados cumprirem alguns pressupostos. Por
        isso, antes do teste, verificamos:
      </p>
      <Anotacao>
        shapiro-wilk = confirmar que dados são normais
        <br />
        teste de levene = confirmar igualdade de variância
      </Anotacao>
      <div className="term-grid cols-2">
        <Termo nome="Normalidade" tag="Shapiro-Wilk">
          <p>Os dados de cada grupo seguem a distribuição normal (formato de sino)?</p>
        </Termo>
        <Termo nome="Homocedasticidade" tag="Levene">
          <p>Os grupos têm variâncias parecidas? Homo = igual; cedasticidade = dispersão.</p>
        </Termo>
      </div>

      <h2>A pegadinha: aqui queremos p &gt; 0,05</h2>
      <p>
        Nesses testes, H0 é "está tudo certo" (dados normais / variâncias iguais). Então a leitura é <strong>invertida</strong> em relação ao
        teste principal:
      </p>
      <div className="term-grid cols-2">
        <Termo nome="Shapiro-Wilk" tag="H0: dados normais">
          <p>
            <span className="cell-ok">p &gt; 0,05</span> → normal ✓ → pode usar teste paramétrico
          </p>
          <p>
            <span className="cell-err">p &lt; 0,05</span> → não normal ✗ → teste não paramétrico
          </p>
        </Termo>
        <Termo nome="Levene" tag="H0: variâncias iguais">
          <p>
            <span className="cell-ok">p &gt; 0,05</span> → variâncias iguais ✓ → segue normal
          </p>
          <p>
            <span className="cell-err">p &lt; 0,05</span> → variâncias diferentes ✗ → correção de Welch
          </p>
        </Termo>
      </div>
      <InterpretePValor />

      <h2>Paramétrico × não paramétrico</h2>
      <Anotacao>
        teste paramétrico: quantitativo e dicotômico
        <br />
        teste não paramétrico: qualitativo e contínuo
      </Anotacao>
      <div className="term-grid">
        <Termo nome="Paramétrico" tag="t, ANOVA">
          <p>
            Variável resposta <strong>quantitativa</strong> (ex.: rendimento) comparada entre grupos de uma variável categórica — com 2
            grupos ela é <strong>dicotômica</strong> (Linhagem A/B).
          </p>
          <p>Exige normalidade e homocedasticidade. Compara médias.</p>
        </Termo>
        <Termo nome="Não paramétrico" tag="postos">
          <p>
            Para resposta <strong>qualitativa ordinal</strong> (escores) ou <strong>contínua que não é normal</strong> (Shapiro p &lt; 0,05,
            outliers fortes).
          </p>
          <p>Trabalha com a ordem (postos) dos dados em vez dos valores. Menos exigente.</p>
        </Termo>
      </div>
      <Callout tipo="extra" titulo="Complemento: equivalentes não paramétricos">
        <p>Não está na anotação, mas ajuda muito na leitura crítica:</p>
      </Callout>
      <Tabela
        dados={{
          colunas: ['Situação', 'Paramétrico', 'Não paramétrico'],
          linhas: [
            ['2 grupos independentes', 't independente', 'Mann-Whitney U'],
            ['Antes × depois', 't pareado', 'Wilcoxon'],
            ['3 ou mais grupos', 'ANOVA + Tukey', 'Kruskal-Wallis'],
          ],
        }}
      />
    </>
  )
}

// ───────────────────────────────────────────── 7
function TesteT() {
  return (
    <>
      <Definicao>
        <strong>Teste t de Student</strong> compara as <strong>médias de 2 grupos</strong>. H0: as médias são iguais. H1: as médias são
        diferentes.
      </Definicao>

      <h2>Independente ou pareado?</h2>
      <Anotacao>
        2 independentes - teste t independente
        <br />
        Medição antes x depois = teste t pareado
      </Anotacao>
      <div className="term-grid cols-2">
        <Termo nome="t independente" tag="indivíduos diferentes">
          <p>Dois grupos formados por indivíduos diferentes, sem relação entre si.</p>
          <p>Ex.: Linhagem A × Linhagem B; ratos controle × ratos tratados.</p>
        </Termo>
        <Termo nome="t pareado" tag="mesmos indivíduos">
          <p>Os mesmos indivíduos medidos duas vezes (antes × depois) ou pares naturais (olho direito × esquerdo).</p>
          <p>Analisa a diferença dentro de cada indivíduo (depois − antes). H0: essa diferença média é zero.</p>
        </Termo>
      </div>

      <h3>Como os dados ficam no Jamovi</h3>
      <div className="term-grid cols-2">
        <Tabela
          dados={{
            titulo: 'Independente: grupo + valor',
            colunas: ['Linhagem', 'Rendimento'],
            linhas: [
              ['A', '2,10'],
              ['A', '2,30'],
              ['B', '3,00'],
              ['B', '3,10'],
            ],
          }}
        />
        <Tabela
          dados={{
            titulo: 'Pareado: antes e depois lado a lado',
            colunas: ['Rato', 'Antes', 'Depois'],
            linhas: [
              ['1', '128', '110'],
              ['2', '135', '119'],
              ['3', '122', '115'],
              ['4', '140', '121'],
            ],
          }}
        />
      </div>

      <h2>Passo a passo (aplicação)</h2>
      <ol className="steps">
        <li>
          <strong>Descrever</strong>
          <p>Médias, DP e boxplot de cada grupo.</p>
        </li>
        <li>
          <strong>Checar pressupostos</strong>
          <p>Shapiro-Wilk (normalidade) e, no independente, Levene (variâncias).</p>
        </li>
        <li>
          <strong>Rodar o teste e ler t, gl e p</strong>
          <p>O sinal de t só indica a ordem da subtração (grupo 1 − grupo 2).</p>
        </li>
        <li>
          <strong>Concluir</strong>
          <p>p &lt; 0,05 → as médias diferem. Diga qual grupo é maior, com as médias.</p>
        </li>
      </ol>
      <Callout tipo="extra">
        <ul>
          <li>
            Levene p &lt; 0,05 → marque <strong>Welch</strong> (t de Welch), na mesma tela.
          </li>
          <li>
            Shapiro p &lt; 0,05 → marque <strong>Mann-Whitney U</strong> (independente) ou <strong>Wilcoxon</strong> (pareado).
          </li>
        </ul>
      </Callout>

      <h2>Exemplo guiado (leitura crítica)</h2>
      <p>Os mesmos dados do exemplo do PDF, agora com os testes. Compare os dois cenários:</p>
      <ExemploTesteT />
      <Callout tipo="dica" titulo="Modelo de conclusão">
        <p>
          "O rendimento da Linhagem B (média = 3,11; DP = 0,11) foi significativamente maior que o da Linhagem A (média = 2,22; DP = 0,12)
          — teste t independente, t(17) = −16,23; p &lt; 0,001."
        </p>
      </Callout>
    </>
  )
}

// ───────────────────────────────────────────── 8
function Anova() {
  return (
    <>
      <Definicao>
        <strong>ANOVA</strong> (análise de variância) compara as <strong>médias de 3 ou mais grupos</strong> de uma só vez. Ex.: crescimento
        bacteriano em 4 meios de cultura.
      </Definicao>
      <Anotacao>Avaliar 4 meios ou mais = anova</Anotacao>
      <p className="muted">A regra geral é 3 ou mais grupos. Com 2 grupos usa-se o teste t.</p>
      <div className="term-grid cols-2">
        <Termo nome="H0">
          <p>Todas as médias são iguais (μA = μB = μC = μD).</p>
        </Termo>
        <Termo nome="H1">
          <p>
            <strong>Pelo menos uma</strong> média é diferente — não necessariamente todas.
          </p>
        </Termo>
      </div>

      <h2>Por que não fazer vários testes t?</h2>
      <p>
        Com 4 grupos seriam 6 testes t (A–B, A–C, A–D, B–C, B–D, C–D). Cada um tem 5% de risco de falso positivo, e a chance de errar em pelo
        menos um sobe para <strong>~26%</strong>. A ANOVA testa tudo de uma vez mantendo o risco em 5%.
      </p>

      <h2>Pressupostos</h2>
      <Anotacao>Anova: Teste de homocedasticidade</Anotacao>
      <ul>
        <li>
          <strong>Normalidade</strong> → Shapiro-Wilk (p &gt; 0,05 = ok).
        </li>
        <li>
          <strong>Homocedasticidade</strong> (variâncias iguais) → Levene, que no Jamovi aparece como "teste de homogeneidade" (p &gt; 0,05 =
          ok).
        </li>
      </ul>
      <Callout tipo="extra">
        <p>
          Variâncias diferentes → ANOVA de Welch + pós-teste Games-Howell. Dados não normais → Kruskal-Wallis.
        </p>
      </Callout>

      <h2>Lendo a ANOVA</h2>
      <Tabela
        numericas={[1, 2, 3]}
        dados={{
          titulo: 'Exemplo fictício: crescimento em 4 meios',
          colunas: ['', 'F', 'gl', 'p'],
          linhas: [['Crescimento', '12,62', '3; 20', '< 0,001']],
        }}
      />
      <p>
        p &lt; 0,05 → rejeitamos H0: <strong>existe diferença em algum lugar</strong>. Mas a ANOVA <strong>não diz onde</strong>. Para isso
        serve o pós-teste.
      </p>

      <h2>Pós-teste de Tukey</h2>
      <Anotacao>Pós teste de tukey no jamovi</Anotacao>
      <p>
        Compara <strong>todos os pares</strong> de grupos controlando o erro. Com 4 grupos são 4 × 3 ÷ 2 = 6 pares. Só faz sentido quando a
        ANOVA deu p &lt; 0,05.
      </p>
      <Tabela
        numericas={[1, 2]}
        dados={{
          titulo: 'Tukey — médias: A = 12,1 · B = 12,4 · C = 18,9 · D = 17,8',
          colunas: ['Comparação', 'Diferença', 'p'],
          linhas: [
            ['A – B', '−0,3', <span className="cell-err">0,997</span>],
            ['A – C', '−6,8', <span className="cell-ok">&lt; 0,001</span>],
            ['A – D', '−5,7', <span className="cell-ok">0,003</span>],
            ['B – C', '−6,5', <span className="cell-ok">&lt; 0,001</span>],
            ['B – D', '−5,4', <span className="cell-ok">0,005</span>],
            ['C – D', '1,1', <span className="cell-err">0,864</span>],
          ],
        }}
      />
      <p>
        <strong>Leitura:</strong> A e B não diferem entre si; C e D também não. Mas A e B diferem de C e D. Os meios C e D promovem mais
        crescimento.
      </p>
      <Callout tipo="dica" titulo="Notação com letras">
        <p>
          Em artigos aparece assim: A<sup>a</sup>, B<sup>a</sup>, C<sup>b</sup>, D<sup>b</sup>. <strong>Letras iguais = não diferem</strong>{' '}
          pelo Tukey.
        </p>
      </Callout>

      <h2>No Jamovi</h2>
      <ol className="steps">
        <li>
          <strong>ANOVA → ANOVA a um fator</strong>
          <p>Variável dependente: Crescimento. Variável de agrupamento: Meio.</p>
        </li>
        <li>
          <strong>Verificação de pressupostos</strong>
          <p>Marque o teste de homogeneidade (Levene) e o de normalidade (Shapiro-Wilk).</p>
        </li>
        <li>
          <strong>Testes post-hoc → Tukey</strong>
          <p>Leia os pares com p &lt; 0,05.</p>
        </li>
      </ol>
    </>
  )
}

// ───────────────────────────────────────────── 9
function Escolha() {
  return (
    <>
      <Anotacao>
        Qual teste escolher?
        <br />2 independentes - teste t independente
        <br />
        Medição antes x depois = teste t pareado
        <br />
        Avaliar 4 meios ou mais = anova
      </Anotacao>
      <p>Três perguntas resolvem quase toda questão:</p>
      <ol className="steps">
        <li>
          <strong>Quantos grupos?</strong>
          <p>2 → teste t. 3 ou mais → ANOVA.</p>
        </li>
        <li>
          <strong>Independentes ou mesmos indivíduos?</strong>
          <p>Indivíduos diferentes → independente. Antes × depois → pareado.</p>
        </li>
        <li>
          <strong>Os pressupostos foram atendidos?</strong>
          <p>Shapiro-Wilk e Levene com p &gt; 0,05 → paramétrico. Se não → alternativa.</p>
        </li>
      </ol>
      <EscolhaTeste />
      <h2>Tabela-resumo</h2>
      <Tabela
        dados={{
          colunas: ['Situação', 'Teste', 'Exemplo'],
          linhas: [
            ['2 grupos independentes', 't independente', 'Linhagem A × B'],
            ['Mesmos indivíduos 2 vezes', 't pareado', 'Glicemia antes × depois'],
            ['3 ou mais grupos', 'ANOVA + Tukey', '4 meios de cultura'],
            ['Testar normalidade', 'Shapiro-Wilk', 'Antes do t / ANOVA'],
            ['Testar variâncias', 'Levene', 'Antes do t / ANOVA'],
          ],
        }}
      />
    </>
  )
}

// ───────────────────────────────────────────── 10
function Critica() {
  return (
    <>
      <Anotacao>objetivo dos testes: definição, aplicação, leitura crítica</Anotacao>
      <p>
        Leitura crítica é olhar uma análise (sua, de um colega ou de um artigo) e checar se o teste certo foi usado, se os pressupostos foram
        verificados e se a conclusão é coerente com o p.
      </p>

      <h2>Modelo de resposta</h2>
      <ol className="steps">
        <li>
          <strong>Hipóteses</strong>
          <p>H0: não há diferença. H1: há diferença.</p>
        </li>
        <li>
          <strong>Teste e justificativa</strong>
          <p>Quantos grupos? Independentes ou pareados?</p>
        </li>
        <li>
          <strong>Pressupostos</strong>
          <p>Shapiro-Wilk e Levene: valores de p e o que significam.</p>
        </li>
        <li>
          <strong>Resultado</strong>
          <p>Estatística (t ou F), graus de liberdade e p.</p>
        </li>
        <li>
          <strong>Decisão</strong>
          <p>Rejeita ou não rejeita H0.</p>
        </li>
        <li>
          <strong>Conclusão biológica</strong>
          <p>Em palavras: qual grupo é maior/menor e o que isso significa.</p>
        </li>
      </ol>

      <h2>Erros que você deve saber apontar</h2>
      <Checklist
        negativo
        itens={[
          <>
            Vários testes t com 3+ grupos → deveria ser <strong>ANOVA + Tukey</strong>.
          </>,
          <>
            t independente em dados antes × depois → deveria ser <strong>t pareado</strong>.
          </>,
          <>Ignorar pressupostos (Shapiro p &lt; 0,05, outlier forte) e usar teste paramétrico mesmo assim.</>,
          <>Ler o Shapiro-Wilk ao contrário (achar que p &gt; 0,05 é "não normal").</>,
          <>Concluir "todos os grupos diferem" só com a ANOVA, sem o pós-teste.</>,
          <>Dizer "provamos que são iguais" com p &gt; 0,05.</>,
          <>Confundir significância estatística com relevância biológica.</>,
          <>Apagar um outlier sem investigar nem justificar.</>,
        ]}
      />

      <h2>Exemplo de leitura crítica</h2>
      <Callout tipo="nota" titulo="Situação">
        <p>
          "Comparamos 4 meios de cultura. A ANOVA deu p = 0,02, portanto todos os meios são diferentes entre si."
        </p>
      </Callout>
      <Callout tipo="dica" titulo="Resposta">
        <p>
          A escolha da ANOVA está correta (4 grupos), mas faltou informar os pressupostos (Shapiro-Wilk e Levene). Além disso, p = 0,02 só
          indica que <strong>pelo menos um</strong> meio difere; para dizer quais, é preciso o <strong>pós-teste de Tukey</strong>. A conclusão
          "todos diferem" não é sustentada pelos dados.
        </p>
      </Callout>
    </>
  )
}

// ───────────────────────────────────────────── 11
const COLA: [string, string][] = [
  ['Descritiva', 'Resume e descreve a amostra: média, mediana, DP, histograma, boxplot.'],
  ['Inferencial', 'Generaliza para a população: o efeito é real ou acaso?'],
  ['Média × mediana', 'Média é puxada por outliers; mediana resiste.'],
  ['Desvio-padrão', 'Dispersão em torno da média. Pequeno = homogêneo.'],
  ['Boxplot', 'Linha = mediana · caixa = Q1–Q3 · ponto = outlier (nº da linha).'],
  ['Jamovi', 'Grupo = nominal/texto · resposta = contínua/decimal.'],
  ['H0 / H1', 'H0 "negativa" (sem diferença) · H1 "positiva" (com diferença).'],
  ['p-valor', 'p < 0,05 → rejeita H0 · p > 0,05 → não rejeita H0.'],
  ['Shapiro-Wilk', 'Normalidade. p > 0,05 = normal ✓ (leitura invertida!).'],
  ['Levene', 'Variâncias iguais (homocedasticidade). p > 0,05 = ok ✓.'],
  ['Paramétrico', 'Resposta quantitativa, normal, variâncias iguais. Compara médias.'],
  ['Não paramétrico', 'Ordinal ou não normal. Mann-Whitney, Wilcoxon, Kruskal-Wallis.'],
  ['t independente', '2 grupos com indivíduos diferentes.'],
  ['t pareado', 'Mesmos indivíduos: antes × depois.'],
  ['ANOVA', '3+ grupos. p < 0,05 = pelo menos um difere.'],
  ['Tukey', 'Pós-teste da ANOVA: quais pares diferem.'],
]

function Cola() {
  return (
    <>
      <p>Tudo em uma tela, para revisar antes de entrar na prova.</p>
      <dl className="cheat">
        {COLA.map(([t, d]) => (
          <div key={t} className="cheat-item">
            <dt>{t}</dt>
            <dd>{d}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}

export const SECOES: Secao[] = [
  { id: 'visao-geral', titulo: 'Visão geral da prova', resumo: 'O que cai e como cada assunto é cobrado', tema: null, Conteudo: VisaoGeral },
  { id: 'descritiva', titulo: 'Estatística descritiva', resumo: 'Média, mediana, desvio-padrão e dispersão', tema: 'descritiva', Conteudo: Descritiva },
  { id: 'graficos', titulo: 'Histograma e boxplot', resumo: 'Como ler os gráficos do PDF e lidar com outliers', tema: 'graficos', Conteudo: Graficos },
  { id: 'jamovi', titulo: 'Jamovi passo a passo', resumo: 'Inserir dados, tipos de variável e o que marcar', tema: 'jamovi', Conteudo: Jamovi },
  { id: 'inferencial', titulo: 'Inferência, hipóteses e p-valor', resumo: 'H0, H1 e a regra do p < 0,05', tema: 'inferencial', Conteudo: Inferencial },
  { id: 'pressupostos', titulo: 'Normalidade e homocedasticidade', resumo: 'Shapiro-Wilk, Levene e paramétrico × não paramétrico', tema: 'pressupostos', Conteudo: Pressupostos },
  { id: 'teste-t', titulo: 'Teste t de Student', resumo: 'Independente × pareado, com exemplo guiado', tema: 'teste-t', Conteudo: TesteT },
  { id: 'anova', titulo: 'ANOVA e pós-teste de Tukey', resumo: '3 ou mais grupos e como ler o Tukey', tema: 'anova', Conteudo: Anova },
  { id: 'escolha', titulo: 'Qual teste escolher?', resumo: 'Fluxo interativo de decisão', tema: 'escolha', Conteudo: Escolha },
  { id: 'critica', titulo: 'Leitura crítica', resumo: 'Modelo de resposta e erros comuns', tema: 'critica', Conteudo: Critica },
  { id: 'cola', titulo: 'Cola rápida', resumo: 'Resumo de bolso para a véspera', tema: null, Conteudo: Cola },
]
