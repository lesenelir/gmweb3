import Layout from '@/pages/layout.tsx'
import { ThemeProvider } from '@/components/utils/ThemeProvider.tsx'

function App() {
  return (
    <ThemeProvider defaultTheme={'light'} storageKey={'theme'}>
      <Layout>
        {/* Home body */}
        <div className={'p-4 min-h-body flex flex-col items-center justify-center'}>
          <p className={'text-6xl font-semibold'}>Build DApp</p>
          <p className={'text-6xl font-semibold'}>Template Website</p>
          <p className={'mt-4 text-lg'}>This project is just a learning project for fun.</p>
          <div className="rounded-md border px-4 py-3 font-mono text-sm mt-4">
            npx gmweb3
          </div>
        </div>
      </Layout>
    </ThemeProvider>
  )
}

export default App
