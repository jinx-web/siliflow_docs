import { Inter, Instrument_Serif } from 'next/font/google'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './docs-trace.css'
import { BackHomeLink } from './back-home-link'
import { SteppedTraceEnhancer } from './stepped-trace'

const inter = Inter({ subsets: ['latin'] })
const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
})

export const metadata = {
  metadataBase: new URL('https://siliflow.in'),
  title: {
    template: '%s - SiliFlow Studio Docs',
    default: 'SiliFlow Studio v1.2 Documentation'
  },
  description: 'Official documentation for SiliFlow Studio v1.2: Verilog/SystemVerilog IDE, dual simulation, wellen waveforms, Yosys synthesis, STA, CDC/RDC, and register maps.',
  alternates: {
    canonical: '/docs',
  },
  openGraph: {
    type: 'website',
    url: 'https://siliflow.in/docs',
    title: 'SiliFlow Studio v1.2 Documentation',
    description: 'Official documentation for SiliFlow Studio v1.2: Verilog/SystemVerilog IDE, dual simulation, wellen waveforms, Yosys synthesis, STA, CDC/RDC, and register maps.',
    siteName: 'SiliFlow',
    images: [
      {
        url: '/docs/logo.png',
        width: 200,
        height: 200,
        alt: 'SiliFlow Studio Documentation',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'SiliFlow Studio v1.2 Documentation',
    description: 'Official documentation for SiliFlow Studio v1.2: Verilog/SystemVerilog IDE, dual simulation, wellen waveforms, Yosys synthesis, STA, CDC/RDC, and register maps.',
    images: ['/docs/logo.png'],
  },
  icons: {
    icon: [
      { url: '/docs/favicon.ico', sizes: 'any' },
      { url: '/docs/icon.png', type: 'image/png' },
    ],
    apple: '/docs/apple-icon.png',
  }
}

const navbar = (
  <Navbar
    logo={
        <span
          className={inter.className}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: 600,
            letterSpacing: '-0.025em',
            fontSize: '17px',
          }}
        >
          <img
            src="/docs/logo.webp"
            alt="SiliFlow logo"
            width={24}
            height={24}
            style={{ objectFit: 'contain' }}
          />
          <span>
            SILI
            <em
              className={instrument.className}
              style={{ fontStyle: 'italic', fontWeight: 400 }}
            >
              flow
            </em>
            {' '}
            <span style={{ opacity: 0.6, fontWeight: 500, fontSize: '0.82rem', letterSpacing: '0.04em' }}>
              DOCS
            </span>
          </span>
        </span>
    }
        projectLink="https://github.com/jinx-web/siliflow_docs"
  >
        <BackHomeLink />
      </Navbar>
)

const footer = (
  <Footer>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', fontSize: '0.85rem', opacity: 0.85 }}>
      <span>© {new Date().getFullYear()} SiliFlow Technologies. Built for silicon engineers & students.</span>
      <a href="/" style={{ textDecoration: 'underline', color: 'inherit' }}>
        ← Back to siliflow.in
      </a>
    </div>
  </Footer>
)

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/docs/favicon.ico" sizes="any" />
        <link rel="icon" href="/docs/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/docs/apple-icon.png" />
      </Head>
      <body>
        <SteppedTraceEnhancer />
        <Layout
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/jinx-web/siliflow_docs/tree/main"
          footer={footer}
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 2 }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
