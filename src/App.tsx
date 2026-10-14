import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react'
import { Icon } from './components/Icon'
import { Estudar } from './estudar/Estudar'
import { useHash, useRoute } from './lib/router'
import { Praticar } from './praticar/Praticar'

export default function App() {
  const hash = useHash()
  const route = useRoute()

  // A aba Estudar lembra o tema aberto enquanto você está em Praticar (e vice-versa,
  // já que as duas ficam montadas): trocar de aba não perde o lugar.
  const [secao, setSecao] = useState<string | null>(null)
  if (route.tab === 'estudar' && route.secao !== secao) setSecao(route.secao)

  useScrollPorRota(hash)

  const irPara = (tab: 'estudar' | 'praticar') => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const destino = tab === 'estudar' ? (route.tab === 'estudar' || !secao ? '/estudar' : `/estudar/${secao}`) : '/praticar'
    if (route.tab === tab && tab === 'praticar') window.scrollTo({ top: 0, behavior: 'smooth' })
    window.location.hash = destino
  }

  return (
    <>
      <main>
        <div hidden={route.tab !== 'estudar'}>
          <Estudar secaoId={secao} />
        </div>
        <div hidden={route.tab !== 'praticar'}>
          <Praticar tema={route.tab === 'praticar' ? route.tema : null} />
        </div>
      </main>

      <nav className="tabbar" aria-label="Abas">
        <div className="tabbar-inner">
          <a className="tab" href="#/estudar" onClick={irPara('estudar')} aria-current={route.tab === 'estudar' ? 'page' : undefined}>
            <span className="tab-pill">
              <Icon name="book" />
            </span>
            Estudar
          </a>
          <a className="tab" href="#/praticar" onClick={irPara('praticar')} aria-current={route.tab === 'praticar' ? 'page' : undefined}>
            <span className="tab-pill">
              <Icon name="checkSquare" />
            </span>
            Praticar
          </a>
        </div>
      </nav>
    </>
  )
}

/** Guarda a posição de rolagem de cada tela e a restaura ao voltar para ela. */
function useScrollPorRota(chave: string) {
  const posicoes = useRef(new Map<string, number>())
  const atual = useRef(chave)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    const salvar = () => posicoes.current.set(atual.current, window.scrollY)
    window.addEventListener('scroll', salvar, { passive: true })
    return () => window.removeEventListener('scroll', salvar)
  }, [])

  useLayoutEffect(() => {
    atual.current = chave
    window.scrollTo(0, posicoes.current.get(chave) ?? 0)
  }, [chave])
}
