import { Logo } from '../Logo';
import { Container } from './styles';

const Footer = () => {
  return (
    <Container>
      <a href="https://solalandhq.com" target="_blank" rel="noreferrer">
        <h2>Powered by</h2>
        <Logo width={100} height={40} />
      </a>
    </Container>
  );
};

export { Footer };
