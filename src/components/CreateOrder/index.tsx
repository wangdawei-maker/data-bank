// import { Button, Col, Form, Input, message, Row, Select, Space, DatePicker, Table } from 'antd';
// import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
// import { MinusOutlined } from '@ant-design/icons';
// import type { ColumnsType } from 'antd/es/table';
// import './index.less';
// import SaleSite from './data';

// interface DataType {
//   key: React.Key;
//   name: string;
//   age: number;
//   address: string;
// }

// const columns: ColumnsType<DataType> = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     filters: [
//       {
//         text: 'Joe',
//         value: 'Joe',
//       },
//       {
//         text: 'Jim',
//         value: 'Jim',
//       },
//       {
//         text: 'Submenu',
//         value: 'Submenu',
//         children: [
//           {
//             text: 'Green',
//             value: 'Green',
//           },
//           {
//             text: 'Black',
//             value: 'Black',
//           },
//         ],
//       },
//     ],

//     sorter: (a, b) => a.name.length - b.name.length,
//     sortDirections: ['descend'],
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     defaultSortOrder: 'descend',
//     sorter: (a, b) => a.age - b.age,
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     filters: [
//       {
//         text: 'London',
//         value: 'London',
//       },
//       {
//         text: 'New York',
//         value: 'New York',
//       },
//     ],
//   },
// ];

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//   },
//   {
//     key: '4',
//     name: 'Jim Red',
//     age: 32,
//     address: 'London No. 2 Lake Park',
//   },
// ];

// export default function App() {
//   const [form] = Form.useForm();

//   const onFinish = () => {
//     message.success('Submit success!');
//   };

//   const onFinishFailed = () => {
//     message.error('Submit failed!');
//   };

//   const onFill = () => {
//     form.setFieldsValue({
//       url: 'https://taobao.com/',
//     });
//   };

//   const onChange = (
//     value: DatePickerProps['value'] | RangePickerProps['value'],
//     dateString: [string, string] | string,
//   ) => {
//     console.log('Selected Time: ', value);
//     console.log('Formatted Selected Time: ', dateString);
//   };

//   const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
//     console.log('onOk: ', value);
//   };

//   const Time: React.FC = () => (
//     <Space direction="vertical" size={12}>
//       <DatePicker showTime onChange={onChange} onOk={onOk} />
//     </Space>
//   );

//   const onGenderChange = () => {};
//   return (
//     <Form
//       form={form}
//       layout="vertical"
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//       autoComplete="off"
//       // style={{ maxWidth: 400 }}
//     >
//       <div style={{ marginLeft: 50 }}>
//         <Space>
//           <MinusOutlined rotate={90} style={{ fontSize: 20, color: '#fcaf17' }} />
//         </Space>

//         <span id="base-info">基础信息</span>
//         <Row style={{ marginTop: 20 }}>
//           <Col md={4}>
//             <Form.Item name="sales-platform" label="销售平台" rules={[{ required: true }]}>
//               <SaleSite></SaleSite>
//             </Form.Item>
//           </Col>
//           <Col md={{ offset: 1, span: 4 }}>
//             <Form.Item name="sales-site" label="销售站点" rules={[{ required: true }]}>
//               <Select placeholder="请选择销售站点" onChange={onGenderChange} allowClear>
//                 <Select.Option value="male">male</Select.Option>
//                 <Select.Option value="female">female</Select.Option>
//                 <Select.Option value="other">other</Select.Option>
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col md={{ offset: 2, span: 9 }}>
//             <Form.Item name="sales-model" label="销售模式" rules={[{ required: true }]}>
//               <Select placeholder="请选择销售模式" onChange={onGenderChange} allowClear>
//                 <Select.Option value="male">male</Select.Option>
//                 <Select.Option value="female">female</Select.Option>
//                 <Select.Option value="other">other</Select.Option>
//               </Select>
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row>
//           <Col md={9}>
//             <Form.Item name="store-account" label="店铺账号" rules={[{ required: true }]}>
//               <Select placeholder="请选择店铺账号" onChange={onGenderChange} allowClear>
//                 <Select.Option value="male">male</Select.Option>
//                 <Select.Option value="female">female</Select.Option>
//                 <Select.Option value="other">other</Select.Option>
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col md={{ offset: 2, span: 9 }}>
//             <Form.Item name="buyer-info" label="买家信息" rules={[{ required: true }]}>
//               <Select placeholder="请选择买家信息" onChange={onGenderChange} allowClear>
//                 <Select.Option value="male">male</Select.Option>
//                 <Select.Option value="female">female</Select.Option>
//                 <Select.Option value="other">other</Select.Option>
//               </Select>
//             </Form.Item>
//           </Col>
//         </Row>
//         <Space>
//           <MinusOutlined rotate={90} style={{ fontSize: 20, color: '#fcaf17' }} />
//         </Space>
//         <span id="base-info">订单信息</span>
//         <Row style={{ marginTop: 20 }}>
//           <Col md={9}>
//             <Form.Item
//               name="url"
//               label="平台订单号-platOrderSn"
//               rules={[{ required: true }, { type: 'string', min: 6 }]}
//             >
//               <Input placeholder="可手输订单，为空时系统随机生成" />
//             </Form.Item>
//           </Col>
//           <Col md={{ offset: 2, span: 4 }}>
//             <Form.Item
//               name="currency-type"
//               label="订单币种-currencyType"
//               rules={[{ required: true }]}
//             >
//               <Select placeholder="默认为站点币种，可选择" onChange={onGenderChange} allowClear>
//                 <Select.Option value="male">male</Select.Option>
//                 <Select.Option value="female">female</Select.Option>
//                 <Select.Option value="other">other</Select.Option>
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col md={{ offset: 1, span: 4 }}>
//             <Form.Item name="order-status" label="订单状态-status" rules={[{ required: true }]}>
//               <Select placeholder="请选择订单状态" onChange={onGenderChange} allowClear>
//                 <Select.Option value="male">male</Select.Option>
//                 <Select.Option value="female">female</Select.Option>
//                 <Select.Option value="other">other</Select.Option>
//               </Select>
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row>
//           <Col md={9}>
//             <Form.Item
//               name="delivery-company"
//               label="物流公司-deliveryCompany"
//               rules={[{ required: false }]}
//             >
//               <Select placeholder="请选择物流公司" onChange={onGenderChange} allowClear>
//                 <Select.Option value="male">male</Select.Option>
//                 <Select.Option value="female">female</Select.Option>
//                 <Select.Option value="other">other</Select.Option>
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col md={{ offset: 2, span: 9 }}>
//             <Form.Item label="最晚发货时间-latestDeliveryTime">
//               <Time />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Space>
//           <MinusOutlined rotate={90} style={{ fontSize: 20, color: '#fcaf17' }} />
//         </Space>
//         <span id="base-info">商品信息</span>
//         <Row style={{ marginTop: 20 }}>
//           <Col>
//             <div id="table-info"></div>
//             <Table style={{ width: 1050 }} columns={columns} dataSource={data} />;
//           </Col>
//         </Row>
//       </div>
//       <Form.Item>
//         <Space>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//           <Button htmlType="button" onClick={onFill}>
//             Fill
//           </Button>
//         </Space>
//       </Form.Item>
//     </Form>
//   );
// }
