import { Avatar, Card, Col, Row, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { DefInput, SmallCard } from '@freelance/components';
import Search from 'antd/lib/transfer/search';

import {
  StyledCardHeader,
  StyledHeader,
  StyledInformation,
  StyledName,
} from './styles';
import { SmallCardContainer } from './styles';

const TalentListPage = () => {
  const TalentData = [
    {
      position: 'friont_end',
      category: 'marketing',
      time: '3h',
      rate: '20$',
      name: 'Ivan',
    },
    {
      position: 'friont_end',
      category: 'marketing',
      time: '3h',
      rate: '20$',
      name: 'Ivan',
    },
  ];

  return (
    <>
      <StyledHeader>
        <StyledInformation>Talent based on your job post</StyledInformation>
        <Row justify="end" gutter={6}>
          <Col className="gutter-row" span={6}>
            <Search placeholder="Search" />
          </Col>
          <Col className="gutter-row" span={6}>
            <DefInput placeholder="Filter" />
          </Col>
        </Row>
      </StyledHeader>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        {TalentData.map(el => (
          <Card
            title={
              <StyledCardHeader>
                <Avatar size={130} icon={<UserOutlined />} />
                <StyledName>{el.name}</StyledName>
              </StyledCardHeader>
            }
            style={{ width: 600 }}
          >
            <SmallCardContainer>
              <SmallCard text={el.category} />
              <SmallCard text={el.position} />
              <SmallCard text={el.time} />
              <SmallCard text={el.rate} />
            </SmallCardContainer>
          </Card>
        ))}
      </Space>
    </>
  );
};

export default TalentListPage;
