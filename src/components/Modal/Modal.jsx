import { Component } from 'react';
import { ModalWrapper, Overlay } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = event => {
    if (event.code === 'Escape') this.props.onClose();
  };

  handleBackdrop = event => {
    if (event.target === event.currentTarget) this.props.onClose();
  };

  render() {
    return (
      <Overlay onClick={this.handleBackdrop}>
        <ModalWrapper>{this.props.children}</ModalWrapper>
      </Overlay>
    );
  }
}

export default Modal;
