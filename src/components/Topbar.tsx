import { useEffect, useState, type ReactNode } from 'react'
import { Icon } from './Icon'

type Props = {
  titulo: string
  subtitulo?: string
  onVoltar?: () => void
  voltarLabel?: string
  acao?: ReactNode
}

export function Topbar({ titulo, subtitulo, onVoltar, voltarLabel = 'Voltar', acao }: Props) {
  const [rolou, setRolou] = useState(false)

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={'topbar' + (rolou ? ' is-scrolled' : '')}>
      <div className={'topbar-inner' + (onVoltar ? ' has-back' : '')}>
        {onVoltar && (
          <button type="button" className="icon-btn" onClick={onVoltar} aria-label={voltarLabel}>
            <Icon name="chevronLeft" />
          </button>
        )}
        <h1 className="topbar-title">
          {subtitulo && <span className="topbar-sub">{subtitulo}</span>}
          {titulo}
        </h1>
        {acao}
      </div>
    </header>
  )
}
