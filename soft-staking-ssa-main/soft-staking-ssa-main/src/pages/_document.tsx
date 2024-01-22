/* eslint-disable @next/next/no-title-in-document-head */
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';

import { ServerStyleSheet } from 'styled-components';

import { COLLECTION_NAME } from '../../constants';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <!-- Primary Meta Tags --> */}
          <link
            rel="shortcut icon"
            href="https://i.imgur.com/2XTKR66.png"
            type="image/png"
          />
          <meta name="title" content={`${COLLECTION_NAME} Staking`} />{' '}
          <meta
            name="description"
            content={`${COLLECTION_NAME} Staking - Powered by SolaLand`}
          />
          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://solalandhq.com" />
          <meta
            property="og:title"
            content={`${COLLECTION_NAME} - SolaLand Staking`}
          />
          <meta
            property="og:description"
            content={`${COLLECTION_NAME} - Powered by SolaLand`}
          />
          <meta property="og:image" content="/logo.png" /> {/* Mudar aqui */}
          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://solalandhq.com" />
          <meta
            property="twitter:title"
            content={`${COLLECTION_NAME} - SolaLand`}
          />
          <meta
            property="twitter:description"
            content={`${COLLECTION_NAME} Staking - Powered by SolaLand`}
          />
          <meta property="twitter:image" content="/logo.png" />
        </Head>
        <body>
          <div className="bg">
            <div className="light-gdr"></div>
            <div className="squirrel"></div>
          </div>
          <Main />
          <div id="modal-portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
