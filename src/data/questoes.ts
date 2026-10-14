import type { TemaId } from './temas'

export type Tabela = { titulo?: string; colunas: string[]; linhas: string[][] }

type Base = {
  id: string
  tema: TemaId
  enunciado: string
  tabela?: Tabela
  /** Conteúdo de complemento: vai além da anotação da prova. */
  extra?: boolean
}

export type QuestaoMC = Base & { tipo: 'mc'; opcoes: string[]; correta: number; explicacao: string }
export type QuestaoVF = Base & { tipo: 'vf'; correta: boolean; explicacao: string }
export type QuestaoAberta = Base & { tipo: 'aberta'; resposta: string; pontos: string[] }
export type Questao = QuestaoMC | QuestaoVF | QuestaoAberta

// Nas objetivas a alternativa correta é escrita primeiro (correta: 0);
// a ordem é embaralhada na hora de mostrar.
export const QUESTOES: Questao[] = [
  // ───────────────────────── Estatística descritiva
  {
    id: 'd1', tema: 'descritiva', tipo: 'mc',
    enunciado: 'Qual é o principal objetivo da estatística descritiva?',
    opcoes: [
      'Resumir e descrever os dados obtidos no experimento',
      'Generalizar as conclusões para toda a população',
      'Decidir se a diferença entre grupos é real ou acaso',
      'Calcular o valor-p de uma hipótese',
    ],
    correta: 0,
    explicacao: 'A descritiva **resume e descreve a amostra** (média, mediana, desvio-padrão, gráficos). Generalizar para a população e testar hipóteses (valor-p) é papel da estatística **inferencial**.',
  },
  {
    id: 'd2', tema: 'descritiva', tipo: 'mc',
    enunciado: 'Uma amostra tem os valores 2, 3, 3, 4 e 18. Qual medida representa melhor o valor "típico" do grupo?',
    opcoes: ['A mediana (3)', 'A média (6)', 'O máximo (18)', 'A amplitude (16)'],
    correta: 0,
    explicacao: 'O 18 é um valor extremo que **puxa a média** para 6 — maior que quase todos os dados. A **mediana** (valor do meio) resiste a outliers e continua representando bem o grupo.',
  },
  {
    id: 'd3', tema: 'descritiva', tipo: 'mc',
    enunciado: 'O desvio-padrão indica:',
    opcoes: [
      'O quanto os dados se espalham em torno da média',
      'O valor central dos dados',
      'O valor que mais se repete',
      'A diferença entre o maior e o menor valor',
    ],
    correta: 0,
    explicacao: 'Desvio-padrão é medida de **dispersão**: a distância típica dos dados até a média, na mesma unidade da variável. Valor central = média/mediana; o que mais se repete = moda; maior − menor = amplitude.',
  },
  {
    id: 'd4', tema: 'descritiva', tipo: 'vf',
    enunciado: 'A média é pouco afetada por valores extremos (outliers).',
    correta: false,
    explicacao: 'Falso. A média soma todos os valores, então um único valor extremo pode deslocá-la bastante. Quem **resiste** a outliers é a **mediana**.',
  },
  {
    id: 'd5', tema: 'descritiva', tipo: 'mc',
    enunciado: 'Dois grupos têm a mesma média (3,0). O grupo X tem DP = 0,1 e o grupo Y tem DP = 0,9. O que se pode afirmar?',
    opcoes: [
      'X é mais homogêneo: seus dados estão mais concentrados perto da média',
      'Y tem média maior que X',
      'Os dois grupos são idênticos',
      'X tem mais outliers que Y',
    ],
    correta: 0,
    explicacao: 'Com a mesma média, **DP menor = dados mais concentrados** (menos variabilidade). O grupo Y é bem mais disperso.',
  },
  {
    id: 'd6', tema: 'descritiva', tipo: 'vf',
    enunciado: 'Média, mediana e desvio-padrão são medidas da estatística descritiva.',
    correta: true,
    explicacao: 'Verdadeiro. Média e mediana descrevem o **centro** dos dados; o desvio-padrão descreve a **dispersão**.',
  },
  {
    id: 'd7', tema: 'descritiva', tipo: 'mc',
    enunciado: 'Quais destas são medidas de dispersão?',
    opcoes: ['Desvio-padrão e variância', 'Média e mediana', 'Moda e média', 'Mediana e moda'],
    correta: 0,
    explicacao: 'Dispersão = **variabilidade**: desvio-padrão, variância, amplitude e amplitude interquartil (AIQ). Média, mediana e moda são de **tendência central**.',
  },
  {
    id: 'd8', tema: 'descritiva', tipo: 'mc',
    enunciado: 'A variância de um conjunto de dados é 0,25. Qual é o desvio-padrão?',
    opcoes: ['0,5', '0,0625', '0,25', '2,5'],
    correta: 0,
    explicacao: 'O desvio-padrão é a **raiz quadrada da variância**: √0,25 = 0,5. (Variância = DP².)',
  },

  // ───────────────────────── Histograma e boxplot
  {
    id: 'g1', tema: 'graficos', tipo: 'mc',
    enunciado: 'Em um boxplot, a linha dentro da caixa representa:',
    opcoes: ['A mediana', 'A média', 'O desvio-padrão', 'A moda'],
    correta: 0,
    explicacao: 'A linha central é a **mediana**. A caixa vai do **Q1 (25%)** ao **Q3 (75%)**, os bigodes vão até os valores mais extremos que não são outliers, e pontos isolados são **outliers**.',
  },
  {
    id: 'g2', tema: 'graficos', tipo: 'mc',
    enunciado: 'No boxplot do Jamovi aparece um ponto isolado com a etiqueta "9" acima da caixa da Linhagem A. O que isso significa?',
    opcoes: [
      'A observação da linha 9 da planilha é um outlier (valor atípico)',
      'A Linhagem A tem 9 observações',
      'A média da Linhagem A é 9',
      'O valor-p do teste é 0,9',
    ],
    correta: 0,
    explicacao: 'Com **Etiqueta outliers** marcada, o Jamovi escreve o **número da linha** do outlier. Esse dado precisa ser conferido: pode ser erro de digitação/medição ou um valor biológico real.',
  },
  {
    id: 'g3', tema: 'graficos', tipo: 'mc',
    enunciado: 'Para que serve principalmente um histograma?',
    opcoes: [
      'Mostrar a forma da distribuição: quantos dados caem em cada faixa de valores',
      'Comparar dois valores-p',
      'Testar a hipótese nula',
      'Mostrar apenas a média de cada grupo',
    ],
    correta: 0,
    explicacao: 'Cada barra mostra a **frequência** de dados numa faixa. Com isso vemos a **forma** da distribuição: simétrica em sino, assimétrica, com valores isolados etc.',
  },
  {
    id: 'g4', tema: 'graficos', tipo: 'vf',
    enunciado: 'Um histograma simétrico, em formato de sino, sugere que os dados seguem distribuição normal.',
    correta: true,
    explicacao: 'Verdadeiro — **sugere**. A confirmação formal da normalidade é feita com o teste de **Shapiro-Wilk**.',
  },
  {
    id: 'g5', tema: 'graficos', tipo: 'mc',
    enunciado: 'No exemplo do PDF (Rendimento × Linhagem), o que os boxplots mostram sobre a Linhagem B em relação à A?',
    opcoes: [
      'Rendimento maior e mais concentrado, sem outliers',
      'Rendimento menor que o da Linhagem A',
      'Um outlier na linha 9',
      'A mesma mediana da Linhagem A',
    ],
    correta: 0,
    explicacao: 'A caixa da Linhagem B fica em torno de **3,1**, acima da Linhagem A (~**2,2**), é estreita (pouca variação) e não tem outliers. O outlier da linha 9 pertence à **Linhagem A**.',
  },
  {
    id: 'g6', tema: 'graficos', tipo: 'mc',
    enunciado: 'Em um boxplot, uma caixa muito comprida (grande distância entre Q1 e Q3) indica:',
    opcoes: [
      'Grande variabilidade nos 50% centrais dos dados',
      'Que a média é alta',
      'Que os dados são normais',
      'Que não há outliers',
    ],
    correta: 0,
    explicacao: 'O comprimento da caixa é a **amplitude interquartil (AIQ = Q3 − Q1)**, onde estão os 50% centrais dos dados. Caixa comprida = dados **mais dispersos**.',
  },
  {
    id: 'g7', tema: 'graficos', tipo: 'vf',
    enunciado: 'Um outlier deve sempre ser apagado da planilha antes da análise.',
    correta: false,
    explicacao: 'Falso. Primeiro **investigue**: se for erro de digitação ou de medição, corrija (ou exclua com justificativa). Se for um valor biológico real, não se apaga — relata-se e considera-se um teste **não paramétrico**, menos sensível a outliers.',
  },
  {
    id: 'g8', tema: 'graficos', tipo: 'aberta',
    enunciado: 'Observando o histograma e o boxplot do exemplo do PDF (Rendimento das Linhagens A e B), descreva o que os gráficos mostram.',
    resposta: 'A Linhagem B tem rendimento maior (em torno de 3,1) que a Linhagem A (em torno de 2,2). A Linhagem B é simétrica e concentrada, sem outliers. A Linhagem A tem a maioria dos valores perto de 2,2, mas apresenta um outlier — a observação da linha 9, com rendimento próximo de 5,8 — que aparece isolado no histograma e como ponto no boxplot. Esse outlier puxa a média de A para cima (a mediana quase não muda), pode comprometer a normalidade e deve ser investigado (erro de digitação ou valor real?).',
    pontos: [
      'B tem rendimento maior que A',
      'B é concentrada/simétrica e sem outliers',
      'A tem um outlier (linha 9, ~5,8)',
      'O outlier afeta a média (não a mediana) e a normalidade',
      'O outlier precisa ser investigado',
    ],
  },

  // ───────────────────────── Jamovi
  {
    id: 'j1', tema: 'jamovi', tipo: 'mc',
    enunciado: 'No Jamovi, como deve ser configurada a variável "Linhagem" (valores A e B)?',
    opcoes: [
      'Medida nominal, dados do tipo texto',
      'Medida contínua, dados do tipo decimal',
      'Medida contínua, dados do tipo texto',
      'Medida ordinal, dados do tipo decimal',
    ],
    correta: 0,
    explicacao: 'Linhagem é uma **categoria sem ordem** (grupo) → medida **nominal**, dados **texto**. É a "tabela 1" da anotação.',
  },
  {
    id: 'j2', tema: 'jamovi', tipo: 'mc',
    enunciado: 'Como deve ser configurada a variável "Rendimento" (valores como 3,15)?',
    opcoes: [
      'Medida contínua, dados do tipo decimal',
      'Medida nominal, dados do tipo texto',
      'Medida nominal, dados do tipo inteiro',
      'Medida ordinal, dados do tipo texto',
    ],
    correta: 0,
    explicacao: 'Rendimento é **número com casas decimais** → medida **contínua**, dados **decimal** ("tabela 2" da anotação).',
  },
  {
    id: 'j3', tema: 'jamovi', tipo: 'mc',
    enunciado: 'Na tela de Estatística Descritiva, onde você coloca "Linhagem" para ver os resultados separados de A e B?',
    opcoes: ['No campo "Separar por"', 'No campo "Variáveis"', 'Em "Tabelas de frequências"', 'Não é possível separar por grupo'],
    correta: 0,
    explicacao: 'A variável resposta (Rendimento) vai em **Variáveis** e a de grupo (Linhagem) em **Separar por** — assim cada estatística e gráfico sai por linhagem.',
  },
  {
    id: 'j4', tema: 'jamovi', tipo: 'mc',
    enunciado: 'Qual opção da Estatística Descritiva do Jamovi verifica se os dados seguem distribuição normal?',
    opcoes: ['Shapiro-Wilk, em "Normalidade"', 'Assimetria, em "Distribuição"', 'Percentis', 'Etiqueta outliers'],
    correta: 0,
    explicacao: 'Em **Normalidade → Shapiro-Wilk**. Assimetria e curtose descrevem a forma, mas o teste formal de normalidade é o Shapiro-Wilk.',
  },
  {
    id: 'j5', tema: 'jamovi', tipo: 'vf',
    enunciado: 'Para saber qual linha da planilha contém um outlier, marca-se "Etiqueta outliers" junto do Gráfico de caixa.',
    correta: true,
    explicacao: 'Verdadeiro. Em **Gráficos → Box plots**, marcando **Gráfico de caixa** e **Etiqueta outliers**, o número da linha aparece ao lado do ponto.',
  },
  {
    id: 'j6', tema: 'jamovi', tipo: 'mc',
    enunciado: 'No exemplo do PDF, quais opções foram marcadas em "Tendência Central"?',
    opcoes: ['Média e Mediana', 'Moda e Soma', 'Desvio-padrão e Variância', 'Mínimo e Máximo'],
    correta: 0,
    explicacao: 'Foram marcadas **Média** e **Mediana**. **Desvio-padrão, Mínimo e Máximo** foram marcados em **Dispersão**.',
  },
  {
    id: 'j7', tema: 'jamovi', tipo: 'mc',
    enunciado: 'Na planilha do Jamovi, cada linha deve representar:',
    opcoes: [
      'Uma observação (ex.: uma planta, um animal, uma placa)',
      'Uma variável',
      'Um grupo inteiro',
      'Um teste estatístico',
    ],
    correta: 0,
    explicacao: 'Regra de ouro: **linha = observação** (unidade experimental) e **coluna = variável**. Por isso há uma coluna "Linhagem" e outra "Rendimento".',
  },
  {
    id: 'j8', tema: 'jamovi', tipo: 'mc',
    enunciado: 'No Jamovi, onde se pede o pós-teste de Tukey?',
    opcoes: [
      'Na ANOVA (ANOVA a um fator), em "Testes post-hoc"',
      'Na Estatística Descritiva',
      'No Teste T para amostras pareadas',
      'Em Tabelas de frequências',
    ],
    correta: 0,
    explicacao: 'Tukey é **pós-teste da ANOVA**: **ANOVA → ANOVA a um fator → Testes post-hoc → Tukey**.',
  },
  {
    id: 'j9', tema: 'jamovi', tipo: 'mc',
    enunciado: 'Para um teste t pareado (antes × depois) no Jamovi, como os dados devem estar organizados?',
    opcoes: [
      'Uma coluna "Antes" e outra "Depois", cada linha um indivíduo',
      'Uma coluna com o grupo e outra com o valor',
      'Cada indivíduo em uma coluna',
      'Todas as medidas em uma única célula',
    ],
    correta: 0,
    explicacao: 'No pareado, cada linha é **um indivíduo** com as duas medidas lado a lado (**Antes** e **Depois**). Já no t independente e na ANOVA usa-se uma coluna de grupo e uma de valor.',
  },

  // ───────────────────────── Inferencial, hipóteses e p-valor
  {
    id: 'i1', tema: 'inferencial', tipo: 'mc',
    enunciado: 'A estatística inferencial serve para:',
    opcoes: [
      'Generalizar as conclusões da amostra para toda a população biológica',
      'Apenas construir gráficos',
      'Organizar a planilha de dados',
      'Calcular somente a média e a mediana',
    ],
    correta: 0,
    explicacao: 'A inferencial usa a amostra para concluir sobre a **população** — e responde se a diferença observada é **efeito real** ou **acaso**.',
  },
  {
    id: 'i2', tema: 'inferencial', tipo: 'mc',
    enunciado: 'Plantas tratadas cresceram, em média, 2 cm a mais que as do controle. Que pergunta a estatística inferencial responde?',
    opcoes: [
      'Essa diferença é um efeito biológico real ou apenas ruído aleatório (acaso)?',
      'Qual foi a maior planta?',
      'Quantas plantas foram medidas?',
      'Qual a média de cada grupo?',
    ],
    correta: 0,
    explicacao: 'Duas amostras quase nunca têm médias idênticas, mesmo sem efeito nenhum. A inferencial verifica se a diferença é **grande demais para ser só acaso**. (Média e contagem são descritiva.)',
  },
  {
    id: 'i3', tema: 'inferencial', tipo: 'mc',
    enunciado: 'Em um experimento "controle × tratamento", qual é a hipótese nula (H0)?',
    opcoes: [
      'Não há diferença entre os grupos (o tratamento não tem efeito)',
      'O tratamento tem efeito',
      'O tratamento é melhor que o controle',
      'O valor-p é menor que 0,05',
    ],
    correta: 0,
    explicacao: 'H0 é a hipótese **"negativa"**: **não há diferença/efeito**. A alternativa (H1), "positiva", diz que existe diferença.',
  },
  {
    id: 'i4', tema: 'inferencial', tipo: 'vf',
    enunciado: 'A hipótese alternativa (H1) normalmente afirma que existe diferença ou efeito.',
    correta: true,
    explicacao: 'Verdadeiro. H1 é a hipótese **"positiva"**. O teste avalia se há evidência suficiente para **rejeitar H0** em favor de H1.',
  },
  {
    id: 'i5', tema: 'inferencial', tipo: 'mc',
    enunciado: 'Um teste resultou em p = 0,003. Com nível de significância de 0,05, qual é a decisão?',
    opcoes: [
      'Rejeitar H0: a diferença é estatisticamente significativa',
      'Não rejeitar H0',
      'Aceitar H0',
      'O teste é inválido',
    ],
    correta: 0,
    explicacao: '**p < 0,05 → rejeitamos H0.** Uma diferença desse tamanho seria muito improvável se fosse só acaso.',
  },
  {
    id: 'i6', tema: 'inferencial', tipo: 'mc',
    enunciado: 'Um teste resultou em p = 0,27. Qual é a conclusão correta?',
    opcoes: [
      'Não rejeitamos H0: não há evidência de diferença significativa',
      'Rejeitamos H0',
      'Provamos que os grupos são idênticos',
      'O efeito é real',
    ],
    correta: 0,
    explicacao: '**p > 0,05 → não rejeitamos H0.** Isso **não prova** que os grupos são iguais — só que os dados não mostram evidência suficiente de diferença.',
  },
  {
    id: 'i7', tema: 'inferencial', tipo: 'vf',
    enunciado: 'Se p > 0,05, podemos afirmar com certeza que os grupos são iguais.',
    correta: false,
    explicacao: 'Falso. "Não rejeitar H0" ≠ "provar H0". Pode haver diferença real que a amostra (pequena ou muito variável) não conseguiu detectar.',
  },
  {
    id: 'i8', tema: 'inferencial', tipo: 'mc',
    enunciado: 'O que significa o valor-p?',
    opcoes: [
      'A probabilidade de obter uma diferença tão grande quanto a observada (ou maior) se H0 fosse verdadeira',
      'A probabilidade de H0 ser verdadeira',
      'O tamanho da diferença entre as médias',
      'A porcentagem de dados normais',
    ],
    correta: 0,
    explicacao: 'O p mede o quanto os dados seriam **surpreendentes se só houvesse acaso** (H0 verdadeira). p pequeno → difícil explicar pelo acaso → rejeita H0. Ele **não** é a probabilidade de H0 ser verdadeira.',
  },
  {
    id: 'i9', tema: 'inferencial', tipo: 'mc',
    enunciado: 'Qual é o nível de significância (α) mais usado?',
    opcoes: ['0,05 (5%)', '0,5 (50%)', '0,95 (95%)', '5,0'],
    correta: 0,
    explicacao: 'O padrão é **α = 0,05**: aceitamos 5% de risco de concluir que há efeito quando não há (erro tipo I). Daí a regra p < 0,05.',
  },
  {
    id: 'i10', tema: 'inferencial', tipo: 'vf',
    enunciado: 'Um resultado com p < 0,05 é sempre biologicamente importante.',
    correta: false,
    explicacao: 'Falso. Significativo quer dizer "provavelmente não é acaso", não que a diferença seja **grande** ou **relevante**. Olhe também o tamanho da diferença (as médias).',
  },
  {
    id: 'i11', tema: 'inferencial', tipo: 'aberta',
    enunciado: 'Defina hipótese nula e hipótese alternativa e explique como o valor-p é usado para decidir entre elas.',
    resposta: 'A hipótese nula (H0) é a "negativa": afirma que não existe diferença ou efeito (ex.: a média do tratado é igual à do controle). A hipótese alternativa (H1) é a "positiva": afirma que existe diferença/efeito. O teste calcula o valor-p — a probabilidade de observar uma diferença tão grande quanto a encontrada se H0 fosse verdadeira, só pelo acaso. Com α = 0,05: se p < 0,05, rejeitamos H0 e concluímos que a diferença é estatisticamente significativa (provável efeito real); se p > 0,05, não rejeitamos H0 — não há evidência suficiente de diferença (o que não prova que os grupos são iguais).',
    pontos: [
      'H0 = não há diferença/efeito',
      'H1 = há diferença/efeito',
      'Valor-p = chance de ver essa diferença se H0 for verdadeira',
      'p < 0,05 → rejeita H0',
      'p > 0,05 → não rejeita H0 (não prova igualdade)',
    ],
  },

  // ───────────────────────── Pressupostos
  {
    id: 'p1', tema: 'pressupostos', tipo: 'mc',
    enunciado: 'Para que serve o teste de Shapiro-Wilk?',
    opcoes: [
      'Verificar se os dados seguem distribuição normal',
      'Comparar as médias de 3 grupos',
      'Verificar a igualdade das variâncias',
      'Comparar medidas antes e depois',
    ],
    correta: 0,
    explicacao: '**Shapiro-Wilk = normalidade.** Confirma se os dados podem ser considerados normais — pressuposto do teste t e da ANOVA.',
  },
  {
    id: 'p2', tema: 'pressupostos', tipo: 'mc',
    enunciado: 'Para que serve o teste de Levene?',
    opcoes: [
      'Verificar se os grupos têm variâncias iguais (homocedasticidade)',
      'Verificar normalidade',
      'Comparar medidas antes e depois',
      'Calcular a mediana',
    ],
    correta: 0,
    explicacao: '**Levene = igualdade de variâncias** (homocedasticidade), pressuposto do teste t independente e da ANOVA.',
  },
  {
    id: 'p3', tema: 'pressupostos', tipo: 'mc',
    enunciado: 'Veja a saída do Jamovi. Qual é a interpretação correta?',
    tabela: { titulo: 'Teste de normalidade (Shapiro-Wilk)', colunas: ['', 'W', 'p'], linhas: [['Rendimento', '0,962', '0,418']] },
    opcoes: [
      'Os dados podem ser considerados normais → pode usar teste paramétrico',
      'Os dados não são normais',
      'As variâncias são diferentes',
      'Há diferença significativa entre os grupos',
    ],
    correta: 0,
    explicacao: 'No Shapiro-Wilk, **H0 = os dados são normais**. Como **p = 0,418 > 0,05**, não rejeitamos H0 → normalidade ok. Pegadinha clássica: nos testes de pressuposto, **p > 0,05 é o resultado "bom"**.',
  },
  {
    id: 'p4', tema: 'pressupostos', tipo: 'mc',
    enunciado: 'O Shapiro-Wilk de um grupo deu p = 0,002. O que isso indica?',
    opcoes: [
      'Os dados não são normais → considerar um teste não paramétrico',
      'Os dados são normais → pode usar o teste t',
      'As variâncias são iguais',
      'O tratamento teve efeito',
    ],
    correta: 0,
    explicacao: 'p < 0,05 no Shapiro-Wilk → **rejeita a normalidade**. Investigue outliers e considere um teste **não paramétrico** (ex.: Mann-Whitney no lugar do t independente).',
  },
  {
    id: 'p5', tema: 'pressupostos', tipo: 'mc',
    enunciado: 'Veja o resultado do teste de Levene. O que ele indica?',
    tabela: { titulo: 'Teste de homogeneidade de variâncias (Levene)', colunas: ['F', 'gl1', 'gl2', 'p'], linhas: [['1,24', '1', '18', '0,280']] },
    opcoes: [
      'Variâncias iguais (homocedasticidade): pressuposto atendido',
      'Variâncias diferentes',
      'Os dados não são normais',
      'Há diferença entre as médias',
    ],
    correta: 0,
    explicacao: 'No Levene, **H0 = variâncias iguais**. p = 0,280 > 0,05 → não rejeitamos H0 → **homocedasticidade ok**.',
  },
  {
    id: 'p6', tema: 'pressupostos', tipo: 'vf',
    enunciado: 'Homocedasticidade significa que os grupos têm variâncias semelhantes (iguais).',
    correta: true,
    explicacao: 'Verdadeiro. **Homo** = igual; **cedasticidade** = dispersão. É o que o teste de **Levene** verifica.',
  },
  {
    id: 'p7', tema: 'pressupostos', tipo: 'vf',
    enunciado: 'No teste de Shapiro-Wilk, p < 0,05 indica que os dados são normais.',
    correta: false,
    explicacao: 'Falso — é o contrário. **p < 0,05 → NÃO normal**; **p > 0,05 → normal**. No Shapiro-Wilk, H0 é "os dados são normais".',
  },
  {
    id: 'p8', tema: 'pressupostos', tipo: 'mc',
    enunciado: 'Testes paramétricos, como o teste t e a ANOVA, exigem principalmente:',
    opcoes: [
      'Variável resposta quantitativa, com distribuição normal e variâncias homogêneas',
      'Variável resposta qualitativa',
      'Presença de outliers',
      'Nenhum pressuposto',
    ],
    correta: 0,
    explicacao: 'Paramétricos comparam **médias** e assumem dados **quantitativos**, **normais** (Shapiro-Wilk) e com **variâncias iguais** (Levene).',
  },
  {
    id: 'p9', tema: 'pressupostos', tipo: 'mc',
    enunciado: 'Quando os dados não seguem distribuição normal, ou a variável é qualitativa ordinal (escores), usam-se:',
    opcoes: ['Testes não paramétricos', 'Testes paramétricos', 'Apenas a estatística descritiva', 'Sempre ANOVA com Tukey'],
    correta: 0,
    explicacao: 'Os **não paramétricos** trabalham com **postos (ranks)** em vez dos valores brutos: não exigem normalidade e servem para dados ordinais ou contínuos não normais.',
  },
  {
    id: 'p10', tema: 'pressupostos', tipo: 'mc', extra: true,
    enunciado: 'Qual é o teste não paramétrico equivalente ao teste t independente?',
    opcoes: ['Mann-Whitney U', 'Wilcoxon', 'Kruskal-Wallis', 'Tukey'],
    correta: 0,
    explicacao: 't independente ↔ **Mann-Whitney U**; t pareado ↔ **Wilcoxon**; ANOVA ↔ **Kruskal-Wallis**. Tukey é pós-teste da ANOVA.',
  },
  {
    id: 'p11', tema: 'pressupostos', tipo: 'mc', extra: true,
    enunciado: 'Qual é o teste não paramétrico equivalente à ANOVA de um fator?',
    opcoes: ['Kruskal-Wallis', 'Mann-Whitney U', 'Levene', 'Shapiro-Wilk'],
    correta: 0,
    explicacao: 'Para **3 ou mais grupos** sem normalidade usa-se **Kruskal-Wallis**. Levene e Shapiro-Wilk não comparam grupos: verificam pressupostos.',
  },
  {
    id: 'p12', tema: 'pressupostos', tipo: 'mc',
    enunciado: 'A anotação diz "teste paramétrico: quantitativo e dicotômico". No exemplo do PDF, o que é quantitativo e o que é dicotômico?',
    opcoes: [
      'Rendimento é quantitativo (resposta); Linhagem A/B é dicotômica (2 grupos)',
      'Linhagem é quantitativa; Rendimento é dicotômico',
      'As duas variáveis são dicotômicas',
      'As duas variáveis são qualitativas',
    ],
    correta: 0,
    explicacao: 'A **variável resposta** (Rendimento) é **quantitativa**; a **variável de grupo** (Linhagem) tem **duas categorias** (A ou B) → **dicotômica**. Situação clássica do teste t independente.',
  },

  // ───────────────────────── Teste t
  {
    id: 't1', tema: 'teste-t', tipo: 'mc',
    enunciado: 'O teste t de Student é usado para comparar:',
    opcoes: ['As médias de 2 grupos', 'As médias de 4 ou mais grupos', 'As variâncias de vários grupos', 'Se os dados são normais'],
    correta: 0,
    explicacao: 'O teste t compara **duas médias**. Para 3 ou mais grupos: ANOVA. Variâncias: Levene. Normalidade: Shapiro-Wilk.',
  },
  {
    id: 't2', tema: 'teste-t', tipo: 'mc',
    enunciado: 'Você quer comparar o rendimento da Linhagem A com o da Linhagem B (plantas diferentes em cada linhagem). Qual teste?',
    opcoes: ['Teste t independente', 'Teste t pareado', 'ANOVA', 'Shapiro-Wilk'],
    correta: 0,
    explicacao: '**2 grupos independentes** (indivíduos diferentes em cada grupo) → **teste t independente**.',
  },
  {
    id: 't3', tema: 'teste-t', tipo: 'mc',
    enunciado: 'A glicemia de 15 ratos foi medida antes e depois de um tratamento. Qual teste?',
    opcoes: ['Teste t pareado', 'Teste t independente', 'ANOVA', 'Levene'],
    correta: 0,
    explicacao: '**Mesmos indivíduos medidos duas vezes (antes × depois)** → **teste t pareado**. Cada rato é controle dele mesmo.',
  },
  {
    id: 't4', tema: 'teste-t', tipo: 'vf',
    enunciado: 'No teste t pareado, os mesmos indivíduos são medidos duas vezes (por exemplo, antes e depois).',
    correta: true,
    explicacao: 'Verdadeiro. O pareado analisa a **diferença dentro de cada indivíduo** (depois − antes).',
  },
  {
    id: 't5', tema: 'teste-t', tipo: 'mc',
    enunciado: 'Veja a saída de um teste t independente. Qual é a conclusão?',
    tabela: { titulo: 'Teste t para amostras independentes', colunas: ['t', 'gl', 'p'], linhas: [['−4,82', '18', '< 0,001']] },
    opcoes: [
      'Há diferença significativa entre as médias dos dois grupos (rejeita H0)',
      'Não há diferença entre os grupos',
      'Os dados não são normais',
      'É obrigatório fazer o pós-teste de Tukey',
    ],
    correta: 0,
    explicacao: 'p < 0,001 (bem menor que 0,05) → **rejeita H0** → as médias diferem. O sinal negativo de t só indica a ordem da subtração (grupo 1 − grupo 2). Tukey é pós-teste de ANOVA, não do teste t.',
  },
  {
    id: 't6', tema: 'teste-t', tipo: 'mc', extra: true,
    enunciado: 'Antes de um teste t independente, o teste de Levene deu p = 0,01. O que fazer?',
    opcoes: [
      'Variâncias diferentes → usar o teste t de Welch',
      'Variâncias iguais → seguir com o t de Student',
      'Dados normais → usar ANOVA',
      'Usar o teste t pareado',
    ],
    correta: 0,
    explicacao: 'Levene p < 0,05 → **variâncias diferentes**. O t de Student assume variâncias iguais; a **correção de Welch** (opção "Welch" no Jamovi) não exige isso.',
  },
  {
    id: 't7', tema: 'teste-t', tipo: 'mc',
    enunciado: 'No teste t pareado, a hipótese nula (H0) é:',
    opcoes: [
      'A média das diferenças (depois − antes) é zero',
      'Os grupos têm variâncias diferentes',
      'Os dados são normais',
      'O tratamento teve efeito',
    ],
    correta: 0,
    explicacao: 'O pareado calcula, para cada indivíduo, **depois − antes**. H0: em média essa diferença é **zero** (o tratamento não mudou nada).',
  },
  {
    id: 't8', tema: 'teste-t', tipo: 'vf',
    enunciado: 'Para comparar um grupo controle e um grupo tratado formados por animais diferentes, usa-se o teste t pareado.',
    correta: false,
    explicacao: 'Falso. Animais diferentes em cada grupo = **grupos independentes** → **teste t independente**. O pareado é para os **mesmos indivíduos** (ou pares naturais).',
  },
  {
    id: 't9', tema: 'teste-t', tipo: 'mc',
    enunciado: 'Comparando as Linhagens A e B, com o outlier da linha 9 na Linhagem A, o teste t deu p = 0,157, mas o Shapiro-Wilk da Linhagem A deu p < 0,001. Qual é a leitura crítica correta?',
    opcoes: [
      'A normalidade foi violada; o teste t não é confiável aqui — investigar o outlier e/ou usar Mann-Whitney',
      'As linhagens não diferem, pois p > 0,05',
      'O Shapiro-Wilk confirma que os dados são normais',
      'Deve-se fazer ANOVA',
    ],
    correta: 0,
    explicacao: 'Shapiro p < 0,05 → **A não é normal** (por causa do outlier). O outlier inflou o desvio-padrão de A e "escondeu" a diferença. Com **Mann-Whitney** (p ≈ 0,003) — ou excluindo o outlier, se for um erro comprovado (t: p < 0,001) — a diferença aparece.',
  },
  {
    id: 't10', tema: 'teste-t', tipo: 'aberta',
    enunciado: 'Explique a diferença entre o teste t independente e o teste t pareado e dê um exemplo de cada.',
    resposta: 'Os dois comparam duas médias. O teste t independente compara dois grupos formados por indivíduos diferentes, sem relação entre si — ex.: rendimento da Linhagem A × Linhagem B, ou ratos controle × ratos tratados. O teste t pareado compara duas medidas feitas nos mesmos indivíduos (ou em pares naturais) — ex.: glicemia dos mesmos ratos antes e depois de um tratamento. No pareado analisa-se a diferença dentro de cada indivíduo (depois − antes), o que elimina a variação entre indivíduos.',
    pontos: [
      'Ambos comparam 2 médias',
      'Independente: indivíduos diferentes em cada grupo + exemplo',
      'Pareado: mesmos indivíduos (antes × depois) + exemplo',
      'Pareado analisa a diferença dentro de cada indivíduo',
    ],
  },

  // ───────────────────────── ANOVA
  {
    id: 'a1', tema: 'anova', tipo: 'mc',
    enunciado: 'A ANOVA é usada para:',
    opcoes: [
      'Comparar as médias de 3 ou mais grupos',
      'Comparar duas medidas do mesmo indivíduo',
      'Testar se os dados são normais',
      'Descrever os dados com gráficos',
    ],
    correta: 0,
    explicacao: 'ANOVA (análise de variância) compara **3 ou mais médias** de uma só vez. Ex.: 4 meios de cultura.',
  },
  {
    id: 'a2', tema: 'anova', tipo: 'mc',
    enunciado: 'Um pesquisador quer avaliar o crescimento bacteriano em 4 meios de cultura diferentes. Qual teste?',
    opcoes: ['ANOVA', 'Teste t independente', 'Teste t pareado', 'Shapiro-Wilk'],
    correta: 0,
    explicacao: '"Avaliar 4 meios ou mais = ANOVA" (anotação). Mais de 2 grupos → **ANOVA** e, se significativa, pós-teste de **Tukey**.',
  },
  {
    id: 'a3', tema: 'anova', tipo: 'mc',
    enunciado: 'A ANOVA comparando 4 meios de cultura deu p = 0,001. O que se pode concluir?',
    opcoes: [
      'Pelo menos um meio difere dos demais; o Tukey mostra quais',
      'Todos os meios são diferentes entre si',
      'Nenhum meio difere',
      'Os dados são normais',
    ],
    correta: 0,
    explicacao: 'A ANOVA só diz que **existe diferença em algum lugar** (H1: pelo menos uma média difere). **Quais** pares diferem, quem diz é o **Tukey**.',
  },
  {
    id: 'a4', tema: 'anova', tipo: 'mc',
    enunciado: 'Para que serve o pós-teste de Tukey?',
    opcoes: [
      'Identificar quais pares de grupos diferem, após uma ANOVA significativa',
      'Testar a normalidade',
      'Testar a homocedasticidade',
      'Substituir a ANOVA quando há só 2 grupos',
    ],
    correta: 0,
    explicacao: 'O Tukey faz **todas as comparações par a par** controlando o erro tipo I. É usado **depois** de uma ANOVA com p < 0,05.',
  },
  {
    id: 'a5', tema: 'anova', tipo: 'mc',
    enunciado: 'Antes da ANOVA, verifica-se a homocedasticidade. Qual teste faz isso?',
    opcoes: ['Levene', 'Tukey', 'Teste t pareado', 'Mann-Whitney'],
    correta: 0,
    explicacao: 'Homocedasticidade = igualdade de variâncias → **teste de Levene** (no Jamovi: "Teste de homogeneidade").',
  },
  {
    id: 'a6', tema: 'anova', tipo: 'mc',
    enunciado: 'Por que não fazer vários testes t (A×B, A×C, B×C...) em vez de uma única ANOVA?',
    opcoes: [
      'Cada teste extra aumenta a chance de um falso positivo (erro tipo I)',
      'O teste t só funciona com dados não normais',
      'O Jamovi não permite',
      'Não há problema nenhum em fazer vários testes t',
    ],
    correta: 0,
    explicacao: 'Com 4 grupos seriam 6 testes t; com 5% de erro em cada, a chance de pelo menos um falso positivo sobe para ~**26%**. A ANOVA (+ Tukey) mantém o erro em 5%.',
  },
  {
    id: 'a7', tema: 'anova', tipo: 'vf',
    enunciado: 'Se a ANOVA não for significativa (p > 0,05), normalmente não se faz o pós-teste de Tukey.',
    correta: true,
    explicacao: 'Verdadeiro. Se a ANOVA não encontrou diferença, não há o que "localizar" com o pós-teste.',
  },
  {
    id: 'a8', tema: 'anova', tipo: 'mc',
    enunciado: 'Veja a saída do Tukey (4 meios de cultura). Quais pares diferem significativamente?',
    tabela: {
      titulo: 'Comparações post-hoc — Tukey',
      colunas: ['Comparação', 'Diferença', 'p'],
      linhas: [
        ['A – B', '−0,3', '0,997'],
        ['A – C', '−6,8', '< 0,001'],
        ['A – D', '−5,7', '0,003'],
        ['B – C', '−6,5', '< 0,001'],
        ['B – D', '−5,4', '0,005'],
        ['C – D', '1,1', '0,864'],
      ],
    },
    opcoes: ['A–C, A–D, B–C e B–D', 'Apenas A–B e C–D', 'Todos os pares', 'Nenhum par'],
    correta: 0,
    explicacao: 'Diferem os pares com **p < 0,05**: A–C, A–D, B–C e B–D. A e B são parecidos entre si (p = 0,997), assim como C e D (p = 0,864). Ou seja: C e D promovem crescimento diferente de A e B.',
  },
  {
    id: 'a9', tema: 'anova', tipo: 'mc',
    enunciado: 'Com 4 grupos, quantas comparações par a par o Tukey faz?',
    opcoes: ['6', '4', '8', '12'],
    correta: 0,
    explicacao: 'Pares = k(k − 1) / 2 = 4 × 3 / 2 = **6** (A–B, A–C, A–D, B–C, B–D, C–D).',
  },
  {
    id: 'a10', tema: 'anova', tipo: 'mc',
    enunciado: 'Na ANOVA, qual é a hipótese nula (H0)?',
    opcoes: [
      'Todas as médias dos grupos são iguais',
      'Todas as médias são diferentes',
      'Pelo menos uma média é diferente',
      'As variâncias são diferentes',
    ],
    correta: 0,
    explicacao: 'H0: **μ1 = μ2 = μ3 = …** (todas iguais). H1: **pelo menos uma** média difere — não necessariamente todas.',
  },
  {
    id: 'a11', tema: 'anova', tipo: 'vf', extra: true,
    enunciado: 'Se o Levene indicar variâncias diferentes na ANOVA, uma alternativa é a ANOVA de Welch (com pós-teste de Games-Howell).',
    correta: true,
    explicacao: 'Verdadeiro. No Jamovi (ANOVA a um fator) escolha **"Não assumir iguais (Welch)"** e, nos post-hoc, **Games-Howell**. O Tukey assume variâncias iguais.',
  },
  {
    id: 'a12', tema: 'anova', tipo: 'aberta',
    enunciado: 'Descreva o passo a passo para analisar no Jamovi um experimento com 4 meios de cultura, dos pressupostos até o pós-teste.',
    resposta: 'Organizar os dados com uma coluna "Meio" (nominal, texto) e uma coluna com a resposta, ex.: "Crescimento" (contínua, decimal). Fazer a estatística descritiva (média, DP, boxplot) separada por meio. Verificar os pressupostos: normalidade com Shapiro-Wilk e homocedasticidade com Levene (p > 0,05 = pressuposto atendido). Rodar a ANOVA a um fator (H0: todas as médias iguais). Se p < 0,05, rejeitar H0 — pelo menos um meio difere — e fazer o pós-teste de Tukey para ver quais pares diferem (pares com p < 0,05). Concluir em termos biológicos: quais meios favorecem mais o crescimento.',
    pontos: [
      'Organizar dados (meio = nominal; resposta = contínua)',
      'Descritiva por grupo',
      'Pressupostos: Shapiro-Wilk e Levene',
      'ANOVA: H0 = médias iguais; p < 0,05 → rejeita',
      'Tukey para ver quais pares diferem',
      'Conclusão biológica',
    ],
  },

  // ───────────────────────── Qual teste escolher
  {
    id: 'e1', tema: 'escolha', tipo: 'mc',
    enunciado: 'Qual teste usar? Comparar a pressão arterial dos mesmos pacientes antes e depois de tomar um medicamento.',
    opcoes: ['Teste t pareado', 'Teste t independente', 'ANOVA', 'Shapiro-Wilk'],
    correta: 0,
    explicacao: 'Mesmos pacientes, duas medidas (antes × depois) → **t pareado**.',
  },
  {
    id: 'e2', tema: 'escolha', tipo: 'mc',
    enunciado: 'Qual teste usar? Comparar a altura de plantas submetidas a 5 doses de fertilizante (plantas diferentes em cada dose).',
    opcoes: ['ANOVA (+ Tukey)', 'Teste t independente', 'Teste t pareado', 'Levene'],
    correta: 0,
    explicacao: '5 grupos independentes → **ANOVA**; se significativa, **Tukey** para ver quais doses diferem.',
  },
  {
    id: 'e3', tema: 'escolha', tipo: 'mc',
    enunciado: 'Qual teste usar? Comparar o peso corporal de camundongos machos e fêmeas.',
    opcoes: ['Teste t independente', 'Teste t pareado', 'ANOVA', 'Tukey'],
    correta: 0,
    explicacao: '2 grupos formados por animais diferentes → **t independente**.',
  },
  {
    id: 'e4', tema: 'escolha', tipo: 'mc', extra: true,
    enunciado: 'Qual teste usar? Comparar 2 grupos independentes, mas o Shapiro-Wilk deu p = 0,001 e há outliers fortes.',
    opcoes: ['Mann-Whitney U (não paramétrico)', 'Teste t independente', 'ANOVA', 'Teste t pareado'],
    correta: 0,
    explicacao: 'Sem normalidade → equivalente **não paramétrico** do t independente: **Mann-Whitney U** (no Jamovi, basta marcar na mesma tela do teste t).',
  },
  {
    id: 'e5', tema: 'escolha', tipo: 'mc',
    enunciado: 'Qual teste usar? Comparar a carga parasitária entre 3 tratamentos, com dados normais e variâncias homogêneas.',
    opcoes: ['ANOVA seguida de Tukey', 'Teste t independente entre cada par', 'Teste t pareado', 'Mann-Whitney'],
    correta: 0,
    explicacao: '3 grupos + pressupostos atendidos → **ANOVA**; se p < 0,05, **Tukey**. Fazer vários testes t aumentaria o erro tipo I.',
  },
  {
    id: 'e6', tema: 'escolha', tipo: 'mc',
    enunciado: 'Qual teste usar? Comparar a acuidade visual do olho direito e do olho esquerdo dos mesmos pacientes.',
    opcoes: ['Teste t pareado', 'Teste t independente', 'ANOVA', 'Levene'],
    correta: 0,
    explicacao: 'Os dois olhos são do **mesmo paciente** (pares naturais) → as medidas não são independentes → **t pareado**.',
  },
  {
    id: 'e7', tema: 'escolha', tipo: 'mc',
    enunciado: 'Qual teste usar? Verificar se os dados de rendimento seguem distribuição normal.',
    opcoes: ['Shapiro-Wilk', 'Levene', 'Tukey', 'Teste t'],
    correta: 0,
    explicacao: 'Normalidade → **Shapiro-Wilk**.',
  },
  {
    id: 'e8', tema: 'escolha', tipo: 'mc',
    enunciado: 'Qual teste usar? Verificar se 3 grupos têm variâncias iguais antes de uma ANOVA.',
    opcoes: ['Levene', 'Shapiro-Wilk', 'Tukey', 'Teste t pareado'],
    correta: 0,
    explicacao: 'Igualdade de variâncias (homocedasticidade) → **Levene**.',
  },

  // ───────────────────────── Leitura crítica
  {
    id: 'c1', tema: 'critica', tipo: 'mc',
    enunciado: 'Um trabalho comparou 4 grupos fazendo testes t entre todos os pares. Qual é a principal crítica?',
    opcoes: [
      'Deveria usar ANOVA + Tukey: vários testes t inflam o erro tipo I',
      'Deveria usar Shapiro-Wilk em vez do teste t',
      'Deveria fazer só estatística descritiva',
      'Não há crítica',
    ],
    correta: 0,
    explicacao: 'Múltiplos testes t aumentam a chance de falso positivo. O correto é **ANOVA** e, se significativa, **Tukey**.',
  },
  {
    id: 'c2', tema: 'critica', tipo: 'mc',
    enunciado: 'Um estudo obteve p = 0,04 e concluiu: "provamos que o tratamento funciona em todas as pessoas". Qual crítica é correta?',
    opcoes: [
      'p < 0,05 indica diferença significativa nas médias, mas não "prova" nem garante efeito em todos os indivíduos',
      'p = 0,04 não é significativo',
      'O correto seria p > 0,05',
      'A conclusão está perfeita',
    ],
    correta: 0,
    explicacao: 'O p indica que a diferença **provavelmente não é acaso**, mas a conclusão é sobre **médias** e tem incerteza (5% de risco). "Provar" e "todas as pessoas" é exagero.',
  },
  {
    id: 'c3', tema: 'critica', tipo: 'mc',
    enunciado: 'Um estudo usou teste t independente para comparar o peso dos mesmos animais antes e depois de uma dieta. Qual é o erro?',
    opcoes: [
      'Deveria usar o teste t pareado, pois as medidas são dos mesmos indivíduos',
      'Deveria usar ANOVA',
      'Deveria usar o teste de Levene',
      'Não há erro',
    ],
    correta: 0,
    explicacao: 'Antes × depois nos **mesmos indivíduos** → **t pareado**. O independente ignora o pareamento e perde poder.',
  },
  {
    id: 'c4', tema: 'critica', tipo: 'mc',
    enunciado: 'Os dados de um grupo têm um outlier extremo e o Shapiro-Wilk deu p = 0,01, mas o autor aplicou o teste t sem comentar. Qual é a crítica?',
    opcoes: [
      'A normalidade foi violada: investigar o outlier e/ou usar um teste não paramétrico',
      'Está correto, o teste t não tem pressupostos',
      'Deveria usar ANOVA',
      'Deveria fazer Tukey',
    ],
    correta: 0,
    explicacao: 'Shapiro p < 0,05 → dados **não normais**. Antes de concluir: conferir o outlier (erro de digitação?) e considerar o **Mann-Whitney**.',
  },
  {
    id: 'c5', tema: 'critica', tipo: 'mc',
    enunciado: 'Um aluno comparou 4 meios de cultura, obteve ANOVA com p = 0,02 e concluiu: "todos os meios são diferentes entre si". O que está errado?',
    opcoes: [
      'A ANOVA só indica que pelo menos um meio difere; faltou o Tukey para saber quais',
      'Nada, a conclusão está correta',
      'Com p = 0,02 não se rejeita H0',
      'Deveria usar teste t pareado',
    ],
    correta: 0,
    explicacao: 'ANOVA significativa ≠ todos diferentes. O **Tukey** mostra **quais pares** diferem — pode ser só um meio diferente dos outros.',
  },
  {
    id: 'c6', tema: 'critica', tipo: 'mc',
    enunciado: 'Um relatório diz: "Shapiro-Wilk p = 0,63; portanto os dados não são normais e usamos Mann-Whitney". Qual é a crítica?',
    opcoes: [
      'Interpretou o Shapiro ao contrário: p > 0,05 indica normalidade, então o teste t seria adequado',
      'Está correto',
      'Deveria usar Levene',
      'Deveria usar ANOVA',
    ],
    correta: 0,
    explicacao: 'No Shapiro-Wilk, **p > 0,05 → não rejeita a normalidade** → dados normais. O teste paramétrico (t) poderia ser usado.',
  },
  {
    id: 'c7', tema: 'critica', tipo: 'aberta',
    enunciado: 'Por que é importante verificar normalidade e homocedasticidade antes de aplicar um teste t ou uma ANOVA?',
    resposta: 'Porque o teste t e a ANOVA são testes paramétricos: comparam médias assumindo que os dados de cada grupo seguem distribuição normal e que os grupos têm variâncias semelhantes. Se esses pressupostos forem violados (outliers fortes, distribuição muito assimétrica, variâncias muito diferentes), o valor-p pode ficar errado e levar a conclusões falsas — achar diferença onde não há ou deixar de detectar uma diferença real. Por isso verificamos a normalidade com Shapiro-Wilk e a homocedasticidade com Levene (p > 0,05 = pressuposto atendido). Se não forem atendidos, usamos alternativas: correção de Welch (variâncias diferentes) ou testes não paramétricos (Mann-Whitney, Wilcoxon, Kruskal-Wallis).',
    pontos: [
      't e ANOVA são paramétricos e têm pressupostos',
      'Violação → p-valor e conclusão não confiáveis',
      'Normalidade → Shapiro-Wilk; variâncias → Levene',
      'p > 0,05 nesses testes = pressuposto ok',
      'Alternativas: Welch ou não paramétricos',
    ],
  },
  {
    id: 'c8', tema: 'critica', tipo: 'aberta',
    enunciado: 'Escreva a conclusão de um teste t independente em que a Linhagem B (média 3,11) rendeu mais que a Linhagem A (média 2,22), com t(17) = −16,23 e p < 0,001, e pressupostos atendidos.',
    resposta: 'Os pressupostos foram atendidos (Shapiro-Wilk e Levene com p > 0,05), então foi usado o teste t independente. Como p < 0,001 (menor que 0,05), rejeitamos H0: há diferença estatisticamente significativa entre as linhagens. O rendimento médio da Linhagem B (3,11) foi significativamente maior que o da Linhagem A (2,22) [t(17) = −16,23; p < 0,001], indicando um efeito real da linhagem sobre o rendimento, e não apenas acaso.',
    pontos: [
      'Citar os pressupostos atendidos',
      'p < 0,05 → rejeita H0',
      'Dizer qual grupo é maior (B > A), com as médias',
      'Reportar t, gl e p',
      'Conclusão biológica (efeito real, não acaso)',
    ],
  },
]

export const QUESTOES_POR_ID = new Map(QUESTOES.map((q) => [q.id, q]))
