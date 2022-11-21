// // import { DatePicker, Form, Input, Select } from 'antd';
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import { ProgressBar } from '@freelance/components';
// import {
//   prBarProfileQ2Per,
//   prBarStrColor,
//   prBarTrailColor,
// } from '@freelance/components';

// import * as St from './styles';

// const ProfileQuestions2 = () => {
//   const { t } = useTranslation();

//   return (
//     <St.Wrapper>
//       <div>{t('description.profileQp1.pr_bar_completion_per')}</div>
//       {/* <ProgressBar */}
//         percent={prBarProfileQ2Per}
//         strokeColor={prBarStrColor}
//         trailColor={prBarTrailColor}
//       />
//       {/* <St.StForm
//         name={profileQ1.profileQ1Form}
//         {...profileQ1.formItemLayout}
//         initialValues={{ remember: true }}
//         autoComplete="on"
//         form={form}
//         labelAlign="left"
//         requiredMark="optional"
//         onFinish={values =>
//           handleSubmit(onFinish(values as IProfileQuestions1))
//         }
//       >
//         <Form.Item
//           label={t('description.profileQp1.descr')}
//           name={profileQ1.profileQ1Descr}
//           rules={[
//             {
//               required: true,
//               message: `${t('description.profileQp1.mesDescr')}`,
//             },
//           ]}
//           wrapperCol={{
//             sm: { span: 12, offset: 0 },
//           }}
//         >
//           <St.StTextArea
//             placeholder={t('description.profileQp1.descr')}
//             allowClear
//             rows={4}
//           />
//         </Form.Item>
//         <Form.Item
//           label={t('description.profileQp1.avTime')}
//           name={profileQ1.profileQ1AvTime}
//           rules={[
//             {
//               required: true,
//               message: `${t('description.profileQp1.mesAvTime')}`,
//             },
//           ]}
//         >
//           <Select placeholder={t('description.profileQp1.hPD')} allowClear>
//             <Option value={profileQ1.profileQ1PartTime}>
//               {t('description.profileQp1.partTime')}
//             </Option>
//             <Option value={profileQ1.profileQ1FullTime}>
//               {t('description.profileQp1.fullTime')}
//             </Option>
//           </Select>
//         </Form.Item>
//         <Form.Item
//           wrapperCol={{
//             sm: { span: 20, offset: 2 },
//             lg: { span: 3, offset: 15 },
//           }}
//         >
//           <St.StSubButton size="large" type="primary" htmlType="submit">
//             {t('description.router.toProfileQuestions2')}
//           </St.StSubButton>
//         </Form.Item>
//       </St.StForm> */}
//       <Link to="/">{t('description.router.toProfileQuestions2')}</Link>
//     </St.Wrapper>
//   );
// };

// export default ProfileQuestions2;
