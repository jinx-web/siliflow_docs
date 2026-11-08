import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  metadataBase: new URL('https://www.siliflow.in'),
  title: {
    template: '%s - SiliFlow Studio Docs',
    default: 'SiliFlow Studio Documentation'
  },
  description: 'Official documentation for SiliFlow Studio: Modern Verilog/SystemVerilog IDE, instant F5 simulation, and interactive embedded waveform viewer.',
  alternates: {
    canonical: '/docs',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.siliflow.in/docs',
    title: 'SiliFlow Studio Documentation',
    description: 'Official documentation for SiliFlow Studio: Modern Verilog/SystemVerilog IDE, instant F5 simulation, and interactive embedded waveform viewer.',
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
    title: 'SiliFlow Studio Documentation',
    description: 'Official documentation for SiliFlow Studio: Modern Verilog/SystemVerilog IDE, instant F5 simulation, and interactive embedded waveform viewer.',
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
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontWeight: 800, letterSpacing: '-0.02em', fontSize: '1.05rem' }}>
        <img
          src="/docs/logo.png"
          alt="SiliFlow logo"
          width={24}
          height={24}
          style={{ borderRadius: '5px', objectFit: 'contain' }}
        />
        <span>SILIFLOW <span style={{ opacity: 0.65, fontWeight: 500, fontSize: '0.95rem' }}>DOCS</span></span>
      </span>
    }
    projectLink="https://github.com/jinx-web/siliflow_docs"
  />
)

const footer = (
  <Footer>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', fontSize: '0.85rem', opacity: 0.85 }}>
      <span>© {new Date().getFullYear()} SiliFlow Technologies. Built for silicon engineers & students.</span>
      <a href="https://www.siliflow.in" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>
        siliflow.in ↗
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
