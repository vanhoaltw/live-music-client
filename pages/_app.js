import '../styles/globals.scss';
import { ToastContainer } from 'react-toastify';
import '@uiw/react-textarea-code-editor/dist.css';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { AuthProvider } from 'contexts/auth-context';
import 'lazysizes';
import Head from 'next/head';
import ModalReject from 'components/modal/ModalReject';
import ModalViewCode from 'components/modal/ModalViewCode';
import BaseSEO from 'components/seo/base';
import { Fragment } from 'react';

Modal.setAppElement('#__next');
Modal.defaultStyles = {
  content: {},
};

const Noop = ({ children }) => <Fragment>{children}</Fragment>;

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || Noop;
  return (
    <AuthProvider>
      <BaseSEO />
      <ToastContainer
        bodyClassName="font-primary text-sm text-slate-500"
        autoClose={1000}
      />
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
      <ModalViewCode />
      <ModalReject />
    </AuthProvider>
  );
}

export default MyApp;
