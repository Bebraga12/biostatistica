# Bioestatística — revisão para a prova (16/10)

Site estático, 100% front-end e mobile-first, com duas abas:

- **Estudar** — 11 temas resumidos a partir do PDF da prova (descritiva, histograma/boxplot, Jamovi, hipóteses e p-valor, Shapiro-Wilk/Levene, teste t, ANOVA/Tukey, qual teste escolher, leitura crítica e cola rápida), com gráficos e exercícios interativos.
- **Praticar** — 86 questões (múltipla escolha, V/F e dissertativas com resposta modelo), correção na hora com explicação, simulados, revisão de erros e progresso salvo no navegador.

Stack: Vite + React + TypeScript, CSS puro. Sem backend.

## Rodar localmente

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
```

## Publicar na Vercel

**Pelo site:** suba a pasta para um repositório no GitHub → em vercel.com, *Add New → Project* → importe o repositório. A Vercel detecta o Vite sozinha (build `npm run build`, saída `dist`). Clique em *Deploy*.

**Pela linha de comando:**

```bash
npx vercel          # primeira vez: faz login e cria o projeto
npx vercel --prod   # publica em produção
```

## Onde editar o conteúdo

- Resumos: `src/estudar/secoes.tsx`
- Questões: `src/data/questoes.ts` (nas objetivas, a alternativa correta é a primeira — a ordem é embaralhada na tela)
- Dados do exemplo Linhagem A × B: `src/data/exemplo.ts`
