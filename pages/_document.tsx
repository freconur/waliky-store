import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Anton&family=Comfortaa:wght@300;400;500;600;700&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Gabarito:wght@400;500;600;700;800;900&family=Martian+Mono:wght@100;200;300;400;500;600;700;800&family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Sans+JP:wght@400;500;600;700;800;900&family=Nunito:wght@400;500;600;700;800;900;1000&family=Pacifico&family=Poppins:wght@400;500;600;700;800;900&family=Signika+Negative:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </Head>
        <body className="my-body-class">
          <Main />
          <div id="portal-modal"></div>
          <div id="pin-modal"></div>
          <div id="confirm-modal"></div>
          <NextScript />

        </body>
      </Html>
    )
  }
}

export default MyDocument