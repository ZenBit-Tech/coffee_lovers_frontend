import { lazy } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Wrapper } from './styles';
import { useTranslation } from 'react-i18next';
import ProfileQuestions1 from '../pages/ProfileQuestions1';
import ProfileQuestions2 from '../pages/ProfileQuestions2';

const ExampleRootPage = lazy(
  () =>
    import(/* webpackChunkName: "ExampleRootPage" */ '../pages/ExampleRootPage')
);

export function App() {
  const { t } = useTranslation();

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
        <Route path="/profile-questions-1" element={<ProfileQuestions1/>}/>
        <Route path="/profile-questions-2" element={<ProfileQuestions2/>}/>
      </Routes>
    </Wrapper>
  );
}

export default App;
