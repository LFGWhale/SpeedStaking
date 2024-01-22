import ReactModal from 'react-modal';

import { ButtonContainer, Container, Info } from './styles';

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  handleStartStaking: () => void;
}

const Modal = ({ isOpen, toggleModal, handleStartStaking }: ModalProps) => {
  const CheckIcon = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"
        fill="rgba(255, 255, 255, 1)"
      />
    </svg>
  );

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      className="modal-content"
      overlayClassName="modal-overlay"
      bodyOpenClassName={null}
    >
      <Container>
        <CheckIcon width={48} height={48} />
        <h1>Start staking</h1>
        <Info>
          <p>
            You&apos;re about to start staking. Are you sure you want to do
            that?
          </p>
          <p>
            After starting, your vault will be locked, and you won&apos;t be
            able to vault/withdraw more tokens until you end staking.
          </p>
        </Info>
        <ButtonContainer>
          <button className="cancel-button" onClick={toggleModal}>
            cancel
          </button>
          <button onClick={handleStartStaking}>Confirm</button>
        </ButtonContainer>
      </Container>
    </ReactModal>
  );
};

export { Modal };
