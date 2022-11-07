import { Formik, Field  } from 'formik';
import { useTranslation } from 'react-i18next';

import "antd/dist/antd.css";


interface FormModel{
  email: string,
  password: string
}

export function LoginForm() {
  const { t } = useTranslation(); 
  
  return (
      <Formik<FormModel>
        initialValues={
          {email: "",
          password: ""}
        }
        onSubmit={(values) => { 
          console.log(values);
        }}>
        {({handleSubmit, values, handleChange}) => (
        <form
          onSubmit={handleSubmit}>
        
            <Field
              type="email"
              name="email"
              placeholder={t('loginPage.loginPage_email')}
              value={values.email} onChange={handleChange}
            />
        
            <Field
              type="password"
              name="password"
              placeholder={t('loginPage.loginPage_password')}
              value={values.password} onChange={handleChange}
            />          
          
          <button
            className="ant-btn ant-btn-primary"
            type='submit'>
            {t('loginPage.loginPage_name')}
          </button>
          </form>) 
        }
      </Formik>
  );
}

export default LoginForm;
