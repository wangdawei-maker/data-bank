import { Button, Col, Form, Input, message, Row, Select, Space, DatePicker } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { MinusOutlined } from '@ant-design/icons';
import './index.less';
import GoodsTable from './components/goodsTable';
import { connect } from 'umi';
import { useState,useEffect } from 'react';

const CreateOrder = props => {
  const { dispatch } = props;
  const [form] = Form.useForm(); //form实例
  const [salesPlatformOption, setSalesPlatformOption] = useState<any>([]); //销售平台下拉数据
  const [salesSiteOption, setSalesSiteOption] = useState<any>([]); //销售站点下拉数据
  const [salesModelOption, setSalesModelOption] = useState<any>([]); //销售模式下拉数据
  const [buyerInfoOption, setBuyerInfoOption] = useState<any>([]); //买家信息下拉
  const [currencyTypeOption, setcurrencyTypeOption] = useState<any>([]); //订单币种下拉数据
  const [deliveryCompanyOption, setDeliveryCompanyOption] = useState<any>([]); //物流公司下拉数据
  const [storeAccountOption,setStoreAccountOption]=useState([])//店铺账号下拉数据
  const onFinish = val => {
    console.log(val);
  };

  const onFill = () => {
    form.submit();
  };
  const getSourceEnums = async obj => {
    try {
      let res = await dispatch({ type: 'CreateOrder/asyncSourceEnums', payload: obj });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value);
  };

  const onGenderChange = () => {};

  
  useEffect(()=>{
    getSourceEnums({})
  },[])


  return (
    <div className="creatOrder">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div style={{ marginLeft: '10%' }}>
          <Space>
            <MinusOutlined rotate={90} className="line" />
          </Space>
          <span className="base-info">基础信息</span>
          <Row style={{ marginTop: 20 }}>
            <Col md={4}>
              <Form.Item name="salesPlatform" label="销售平台" rules={[{ required: true }]}>
                <Select options={salesPlatformOption}/>
              </Form.Item>
            </Col>
            <Col md={{ offset: 1, span: 4 }}>
              <Form.Item name="salesSite" label="销售站点" rules={[{ required: true }]}>
                <Select options={salesSiteOption}/>
              </Form.Item>
            </Col>
            <Col md={{ offset: 2, span: 9 }}>
              <Form.Item name="salesModel" label="销售模式" rules={[{ required: true }]}>
                <Select placeholder="请选择销售模式"  options={salesModelOption}/>
                
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              <Form.Item name="storeAccount" label="店铺账号" rules={[{ required: true }]}>
                <Select placeholder="请选择店铺账号" options={storeAccountOption} allowClear/>
              </Form.Item>
            </Col>
            <Col md={{ offset: 2, span: 9 }}>
              <Form.Item name="buyerInfo" label="买家信息" rules={[{ required: true }]}>
                <Select placeholder="请选择买家信息" options={buyerInfoOption}/>
              </Form.Item>
            </Col>
          </Row>
          <Space>
            <MinusOutlined rotate={90} className="line" />
          </Space>
          <span className="base-info">订单信息</span>
          <Row style={{ marginTop: 20 }}>
            <Col md={9}>
              <Form.Item
                name="platformOrder"
                label="平台订单号-platOrderSn"
                rules={[{ required: true }, { type: 'string', min: 6 }]}
              >
                <Input placeholder="可手输订单，为空时系统随机生成" />
              </Form.Item>
            </Col>
            <Col md={{ offset: 2, span: 4 }}>
              <Form.Item
                name="currencyType"
                label="订单币种-currencyType"
                rules={[{ required: true }]}
              >
                <Select placeholder="默认为站点币种，可选择" options={currencyTypeOption}/>
              </Form.Item>
            </Col>
            <Col md={{ offset: 1, span: 4 }}>
              <Form.Item name="orderStatus" label="订单状态-status" rules={[{ required: true }]}>
                <Select placeholder="请选择订单状态" onChange={onGenderChange} allowClear>
                  <Select.Option value="male">male</Select.Option>
                  <Select.Option value="female">female</Select.Option>
                  <Select.Option value="other">other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              <Form.Item
                name="deliveryCompany"
                label="物流公司-deliveryCompany"
                rules={[{ required: false }]}
              >
                <Select placeholder="请选择物流公司"options={deliveryCompanyOption} /> 
              </Form.Item>
            </Col>
            <Col md={{ offset: 2, span: 9 }}>
              <Form.Item
                label="最晚发货时间-latestDeliveryTime"
                rules={[{ required: true }]}
                name="latestDeliveryTime"
              >
                <Space direction="vertical" size={12}>
                  <DatePicker showTime onOk={onOk} />
                </Space>
              </Form.Item>
            </Col>
          </Row>
          <Space>
            <MinusOutlined rotate={90} className="line" />
          </Space>
          <span className="base-info">商品信息</span>
          <Row style={{ marginTop: 20 }}>
            <Col span={20}>
              <GoodsTable />
            </Col>
          </Row>
        </div>
        {/* <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onFill}>
              Fill
            </Button>
          </Space>
        </Form.Item> */}
      </Form>
    </div>
  );
};
export default connect(({ CreateOrder }) => ({ CreateOrder }))(CreateOrder);
