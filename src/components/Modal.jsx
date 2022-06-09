import { Modal as BootstrapModal } from "react-bootstrap";

const Modal = ({ title, children, ...props  }) => {
    return (
        <BootstrapModal {...props}>
            <BootstrapModal.Header closeButton >
                { title && <BootstrapModal.Title>{ title }</BootstrapModal.Title> }
            </BootstrapModal.Header>
            <BootstrapModal.Body>
                { children }
            </BootstrapModal.Body>
        </BootstrapModal>
    );
}

export default Modal;