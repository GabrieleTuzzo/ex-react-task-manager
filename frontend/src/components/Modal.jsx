import { createPortal } from 'react-dom';

export default function Modal({
    title,
    content,
    show,
    onClose,
    onConfirm,
    confirmText = 'Conferma',
}) {
    return show
        ? createPortal(
              <div style={{ display: show ? 'block' : 'none' }}>
                  <h2>{title}</h2>
                  {content}
                  <button onClick={onConfirm}>{confirmText}</button>
                  <button onClick={onClose}>Annulla</button>
              </div>,
              document.body
          )
        : null;
}
