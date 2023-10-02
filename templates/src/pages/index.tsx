import Layout from '@/pages/layout.tsx'
import { ThemeProvider } from '@/components/utils/ThemeProvider.tsx'

function App() {
  return (
    <ThemeProvider defaultTheme={'light'} storageKey={'theme'}>
      <Layout>
        {/* Home body */}
        <div className={'p-4'}>
          home page2
        </div>
      </Layout>
    </ThemeProvider>
  )
}

export default App
