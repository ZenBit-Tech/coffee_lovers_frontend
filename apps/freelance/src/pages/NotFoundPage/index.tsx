import React from 'react';
import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { routes } from '@freelance/components';

const NotFoundPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return <Result
        status="404"
        title="404"
        subTitle={t('notFound.title')}
        extra={<Button onClick={() => navigate(routes.jobs)} type="primary">{t('notFound.buttonText')}</Button>}
    />
};

export default NotFoundPage;