import { Button, Col, Form, Input, message, Row, Select, Space, DatePicker } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { MinusOutlined } from '@ant-design/icons';
import './index.less';
import GoodsTable from './components/goodsTable';
import { connect } from 'umi';




const CreateOrder = () => {
  const [form] = Form.useForm();

  const onFinish = (val) => {
    console.log(val)
  };


  const onFill = () => {
    form.submit()
  };



  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value);
  };



  const onGenderChange = () => { };
  return (
    <div className='creatOrder'>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <div style={{ marginLeft: 50 }}>
          <Space>
            <MinusOutlined rotate={90} className='line' />
          </Space>
          <span className="base-info">基础信息-商品信息</span>
          <Row style={{ marginTop: 20 }}>
            <Col span={20}>
              <Form.Item name="goodsName" label="商品名称-goodsName" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={9} offset={1} pull={1}>
              <Form.Item name="goodsSn" label="商品编号-goodsSn" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4} offset={1}>
              <Form.Item name="goodsTotalPrice" label="商品价格-goodsTotalPrice" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4} offset={1}>
              <Form.Item name="goodsSku" label="商品sku-goodsSku" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4} offset={1} pull={1}>
              <Form.Item name="goodsItem" label="平台商品码-goodsItem" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4} offset={1} pull={1}>
              <Form.Item name="itemPromotionDiscount" label="商品折扣优惠价格-itemPromotionDiscount" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={9} offset={1} >
              <Form.Item name="skuCode" label="系统skucode" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4} offset={1} pull={1}>
              <Form.Item name="vatCurrencyCode" label="vat币种-vatCurrencyCode" rules={[{ required: true }]}>
                <Select />
              </Form.Item>
            </Col>
            <Col span={4} offset={1} pull={1}>
              <Form.Item name="vatAmount" label="vat增值税(金额)-vatAmount" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4} offset={1} >
              <Form.Item name="goodsFee" label="商品成交费-goodsFee" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4} offset={1} >
              <Form.Item name="combineProducts" label="是否组合商品" rules={[{ required: true }]}>
                <Select options={[{ label: '是', value: 1 }, { label: '否', value: 0 }]} />
              </Form.Item>
            </Col>
          </Row>
          <Space>
            <MinusOutlined rotate={90} className='line' />
          </Space>
          <span className="base-info">基础信息-用户信息</span>
          <Row style={{ marginTop: 20 }}>
            <Col span={20}>
              <Form.Item name="buyerName" label="买家姓名" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4} offset={1} pull={1}>
              <Form.Item name="consigneeName" label="收货人姓名" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4} offset={1} pull={1}>
              <Form.Item name="consigneeCountry" label="收货人国家简称" rules={[{ required: true }]}>
                <Select />
              </Form.Item>
            </Col>
            <Col span={4} offset={1} >
              <Form.Item name="province" label="省份/直辖市" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4} offset={1} >
              <Form.Item name="city" label="城市" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4} offset={1} pull={1}>
              <Form.Item name="consigneeZipCode" label="收货人邮编" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4} offset={1} pull={1}>
              <Form.Item name="consignee" label="收货人手机号" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={4} offset={1} >
              <Form.Item name="consignee" label="收货人邮箱" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item name="address" label="地址" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Space>
            <MinusOutlined rotate={90} className='line' />
          </Space>
          <span className="base-info">基础信息-店铺信息</span>
          <Row style={{ marginTop: 20 }}>
            <Col span={20}>
              <Form.Item name="shopName" label="店铺名称" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Space>
            <MinusOutlined rotate={90} className='line' />
          </Space>
          <span className="base-info">基础信息</span>
          <Row style={{ marginTop: 20 }}>
            <Col md={4}>
              <Form.Item name="salesPlatform" label="销售平台" rules={[{ required: true }]}>
                <Select />
              </Form.Item>
            </Col>
            <Col md={{ offset: 1, span: 4 }}>
              <Form.Item name="salesSite" label="销售站点" rules={[{ required: true }]}>
                <Select />
              </Form.Item>
            </Col>
            <Col md={{ offset: 2, span: 9 }}>
              <Form.Item name="salesModel" label="销售模式" rules={[{ required: true }]}>
                <Select placeholder="请选择销售模式" onChange={onGenderChange} allowClear>
                  <Select.Option value="male">male</Select.Option>
                  <Select.Option value="female">female</Select.Option>
                  <Select.Option value="other">other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              <Form.Item name="storeAccount" label="店铺账号" rules={[{ required: true }]}>
                <Select placeholder="请选择店铺账号" onChange={onGenderChange} allowClear>
                  <Select.Option value="male">male</Select.Option>
                  <Select.Option value="female">female</Select.Option>
                  <Select.Option value="other">other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={{ offset: 2, span: 9 }}>
              <Form.Item name="buyer-info" label="买家信息" rules={[{ required: true }]}>
                <Select placeholder="请选择买家信息" onChange={onGenderChange} allowClear>
                  <Select.Option value="male">male</Select.Option>
                  <Select.Option value="female">female</Select.Option>
                  <Select.Option value="other">other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Space>
            <MinusOutlined rotate={90} className='line' />
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
                <Select placeholder="默认为站点币种，可选择" onChange={onGenderChange} allowClear>
                  <Select.Option value="male">male</Select.Option>
                  <Select.Option value="female">female</Select.Option>
                  <Select.Option value="other">other</Select.Option>
                </Select>
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
                name="delivery-company"
                label="物流公司-deliveryCompany"
                rules={[{ required: false }]}
              >
                <Select placeholder="请选择物流公司" onChange={onGenderChange} allowClear>
                  <Select.Option value="male">male</Select.Option>
                  <Select.Option value="female">female</Select.Option>
                  <Select.Option value="other">other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={{ offset: 2, span: 9 }}>
              <Form.Item label="最晚发货时间-latestDeliveryTime" rules={[{ required: false }]}>
              <Space direction="vertical" size={12}>
      <DatePicker showTime  onOk={onOk} />
    </Space>
              </Form.Item>
            </Col>
          </Row>
          <Space>
            <MinusOutlined rotate={90} className='line' />
          </Space>
          <span className="base-info">商品信息</span>
          <Row style={{ marginTop: 20 }}>
            <Col span={20}>
              <GoodsTable/>
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
}
export default connect(({ CreateOrder }) => ({ CreateOrder }))(CreateOrder)