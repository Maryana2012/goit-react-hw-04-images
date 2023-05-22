import { useEffect } from "react";
import PropTypes from 'prop-types';
import css from '../Modal/Modal.module.css'

export default function Modal({ children, onClose }) {
    
useEffect(() => {
    window.addEventListener('keydown', handleKeyDown); 
      return ()=> { window.removeEventListener('keydown', handleKeyDown );}
})

const  handleKeyDown = e => {
    if (e.code === 'Escape') {
        onClose();
    }
}
const handleBackdpropClick = e => {
    if(e.currentTarget === e.target) {
        onClose();
    }
}
    
return (
             <div className={css.Overlay}
                  onClick={handleBackdpropClick}>
                <div className={css.Modal}>{ children}</div>
            </div>
    )
}

Modal.propTypes = {
    children: PropTypes.object.isRequired,
    onClose:PropTypes.func
}