import { lazy } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import { Wrapper } from './styles'
import { useTranslation } from 'react-i18next'

const ExampleRootPage = lazy(
  () =>
    import(
      /* webpackChunkName: "ExampleRootPage" */ '../pages/ExampleRootPage'
    ),
)

export function App() {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<ExampleRootPage />} />
        <Route
          path="/page-2"
          element={
            <Wrapper>
              <Link to="/">{t('router.toRoot')}</Link>
            </Wrapper>
          }
        />
      </Routes>
    </Wrapper>
  )
}

export default App
