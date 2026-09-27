import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css'

export interface ModalProps{
    children: React.ReactNode
    onClose: () => void
}

export default function Modal ({ children, onClose}: ModalProps){
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
    window.addEventListener("keydown", handler);
    return ()=> window.removeEventListener('keydown', handler);
}, [onClose]);

return createPortal(
    <div
  className={css.backdrop}
  role="dialog"
  aria-modal="true"
  onClick={onClose}
>
  <div className={css.modal} onClick={(e) => e.stopPropagation()}>
    {children}
  </div>
</div>,
document.body
)

}