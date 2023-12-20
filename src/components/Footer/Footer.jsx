import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: 'center', position: 'fixed', bottom: 0, width: '100%' }}>
      Desenvolvido por <a href="https://github.com/drianodev" target="_blank" rel="noopener noreferrer">Adriano</a>
    </AntFooter>
  );
};

export default Footer;
