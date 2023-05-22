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
    
// const { children } = props;
         return (
             <div className={css.Overlay}
                  onClick={handleBackdpropClick}>
                <div className={css.Modal}>{ children}</div>
            </div>
    )
}

// export default class Modal extends Component{
// componentDidMount() {
//         window.addEventListener('keydown', this.handleKeyDown );
//     }

// componentWillUnmount() {
//         window.removeEventListener('keydown', this.handleKeyDown );
// }

// handleKeyDown = (e) => {
//     if (e.code === 'Escape') {
//         this.props.onClose();
//     }
// }

// handleBackdpropClick = e => {
//     if(e.currentTarget === e.target) {
//         this.props.onClose();
//     }
// }

// render() {
    //      const { children } = this.props;
    //      return (
    //          <div className={css.Overlay}
    //               onClick={this.handleBackdpropClick}>
    //             <div className={css.Modal}>{ children}</div>
    //         </div>
    // )
// }
    
// }
Modal.propTypes = {
    children: PropTypes.object.isRequired,
}