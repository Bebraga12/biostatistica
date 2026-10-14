import { useMemo, useSyncExternalStore } from 'react'

export type Route =
  | { tab: 'estudar'; secao: string | null }
  | { tab: 'praticar'; tema: string | null }

// Rotas em hash (#/estudar/anova, #/praticar) — funcionam em qualquer hospedagem
// estática e fazem o botão "voltar" do celular navegar entre telas.
function parse(hash: string): Route {
  const [tab, param] = hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  if (tab === 'praticar') return { tab: 'praticar', tema: param ?? null }
  return { tab: 'estudar', secao: tab === 'estudar' ? (param ?? null) : null }
}

function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}

export function useHash() {
  return useSyncExternalStore(subscribe, () => window.location.hash)
}

export function useRoute(): Route {
  const hash = useHash()
  return useMemo(() => parse(hash), [hash])
}

export function navigate(path: string, { replace = false } = {}) {
  if (replace) {
    history.replaceState(null, '', '#' + path)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  } else {
    window.location.hash = path
  }
}
