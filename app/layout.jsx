import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    template: '%s - SiliFlow Studio Docs',
    default: 'SiliFlow Studio Documentation'
  },
  description: 'Official documentation for SiliFlow Studio: Modern Verilog/SystemVerilog IDE, instant F5 simulation, and interactive embedded waveform viewer.'
}

const navbar = (
  <Navbar
    logo={
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 800, letterSpacing: '-0.02em', fontSize: '1.05rem' }}>
        <span style={{ color: '#00E5FF' }}>⚡</span> SILIFLOW STUDIO DOCS
      </span>
    }
    projectLink="https://github.com/siliflow/siliflow"
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/siliflow/siliflow/tree/main/docs"
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

