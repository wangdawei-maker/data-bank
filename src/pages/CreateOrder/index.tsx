import { Button, Col, Form, Input, message, Row, Select, Space, DatePicker, Spin } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import './index.less';
import GoodsTable from './components/goodsTable';
import { connect } from 'umi';
import { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';
import moment from 'moment';
const CreateOrder = props => {
  const { dispatch, addgoddsTable } = props;
  const [form] = Form.useForm(); //form实例
  const site = Form.useWatch('site', form);
  const sourceType = Form.useWatch('sourceType', form);
  const [salesSiteOption, setSalesSiteOption] = useState<any>([]); //销售站点下拉数据
  const [salesModelOption, setSalesModelOption] = useState<any>([]); //销售模式下拉数据
  const [buyerInfoOption, setBuyerInfoOption] = useState<any>([]); //买家信息下拉
  const [currencyTypeOption, setcurrencyTypeOption] = useState<any>([]); //订单币种下拉数据
  const [deliveryCompanyOption, setDeliveryCompanyOption] = useState<any>([]); //物流公司下拉数据
  const [storeAccountOption, setStoreAccountOption] = useState<any>([]); //店铺账号下拉数据
  const [deliveryStoreOption, setdeliveryStoreOption] = useState<any>([]); //发货仓下拉数据
  const [statusOption, setStatusOption] = useState<any>([]); //订单状态下拉数据
  const [fetching, setFetching] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  //表单提交
  const onFinish = async val => {
    try {
      setBtnLoading(true);
      if (addgoddsTable.length) {
        let obj = cloneDeep(val);
        if (obj.latestDeliveryTime) {
          obj.latestDeliveryTime = moment(val).format('yyyy-MM-DD HH:mm:ss');
        }
        obj.itemList = addgoddsTable.map(item => item => ({
          itemId: item?.id,
          itemNum: item?.num,
        }));
        let res = await dispatch({ type: 'CreateOrder/asyncCreateOrder', payload: { ...obj } });
        if (res?.code === 200) {
          message.success('创建成功!');
          form.resetFields();
        }
      } else {
        message.warn('请完善商品信息');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setBtnLoading(false);
    }
  };

  //获取平台和销售模式
  const getSourceEnums = async (obj: any) => {
    try {
      let res = await dispatch({ type: 'CreateOrder/asyncSourceEnums', payload: obj });
      if (res?.code === 200) {
        //这里拿到的map格式需要转化成option需要的array形式
        let data: object = res?.data;
        let array: Array<{ label: any; value: any }> = [];
        if (data) {
          for (let i in data) {
            array.push({ label: data[i], value: i });
          }
          setSalesModelOption(array);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  //根据站点获取用户列表下拉
  const getUserInfoBySite = async (obj: any) => {
    try {
      form.setFieldValue('buyerInfo', undefined); //每次获取前先清空上一次的买家信息
      let res = await dispatch({ type: 'CreateOrder/asyncGetUserInfoBySite', payload: { ...obj } });
      if (res?.code === 200) {
        let options = res?.data.map(item => ({
          ...item,
          label: `${item?.receiverCountry}-${item?.buyerName}`,
          value: item.userId,
        }));
        setBuyerInfoOption(options);
      } else {
        setBuyerInfoOption([]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  //获取订单币种下拉
  const getCurrencyTypes = async () => {
    try {
      let res = await dispatch({ type: 'CreateOrder/asyncGetCurrencyTypes', payload: {} });
      if (res?.code === 200) {
        setcurrencyTypeOption(res?.data.map(item => ({ label: item, value: item })));
      }
    } catch (e) {
      console.log(e);
    }
  };
  //获取物流公司下拉(监听销售模式)
  const getDfDeliveryCompany = async (obj: any) => {
    form.setFieldValue('deliveryCompany', undefined);
    try {
      let res = await dispatch({
        type: 'CreateOrder/asyncGetDfDeliveryCompany',
        payload: { ...obj },
      });
      if (res?.code === 200) {
        let arr = res?.data[obj?.sourceType]?.map(item => ({ label: item, value: item }));
        setDeliveryCompanyOption(arr);
      } else {
        setDeliveryCompanyOption([]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  //获取发货仓下拉(监听销售模式)
  const getDfDeliveryStore = async (obj: any) => {
    form.setFieldValue('deliveryStore', undefined);
    try {
      let res = await dispatch({
        type: 'CreateOrder/asyncGetDfDeliveryStore',
        payload: { ...obj },
      });
      if (res?.code === 200) {
        let arr = res?.data[obj?.sourceType]?.map(item => ({ label: item, value: item }));
        setdeliveryStoreOption(arr);
      } else {
        setdeliveryStoreOption([]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  //获取销售站点(监听销售模式)
  const getPlatformSite = async (obj: any) => {
    form.setFieldValue('site', undefined);
    try {
      let res = await dispatch({ type: 'CreateOrder/asyncGetPlatformSite', payload: { ...obj } });
      if (res?.code === 200) {
        setSalesSiteOption(res?.data);
      } else {
        setSalesSiteOption([]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  //搜索文本框值变化时回调
  const debounceFetcher = async val => {
    setFetching(true);
    try {
      let res = await dispatch({
        type: 'CreateOrder/asyncGetShopInfo',
        payload: { shopAccount: val, pageNum: 1, pageSize: 30 },
      });
      if (res?.code === 200) {
        setStoreAccountOption(
          res?.data?.content?.map(item => ({ ...item, label: item.shopAccount, value: item.id })),
        );
      } else {
      }
    } catch (e) {
      console.log(e);
    } finally {
      setFetching(false);
    }
  };
  //获取订单状态下拉数据
  const getOrderStatusInfo = async () => {
    try {
      let res = await dispatch({ type: 'CreateOrder/asyncGetOrderStatusInfo', payload: {} });
      if (res.code === 200) {
        let data = res?.data;
        let arr: Array<{ label: string; value: any }> = [];
        for (let i in data) {
          arr.push({ label: data[i], value: i });
        }
        setStatusOption(arr);
      }
    } catch (e) {
      console.log(e);
    }
  };
  //获取页面需要的下拉数据
  const getDefultSelect = () => {
    getSourceEnums({});
    getCurrencyTypes();
    getOrderStatusInfo();
  };
  //监听站点数据来获取买家信息下拉列表
  useEffect(() => {
    if (site) {
      getUserInfoBySite({ site });
    }
  }, [site]);
  //监听销售模式来获取销售站点下拉列表
  useEffect(() => {
    if (sourceType) {
      getPlatformSite({ sourceType });
      getDfDeliveryCompany({ sourceType });
      getDfDeliveryStore({ sourceType });
    }
  }, [sourceType]);
  useEffect(() => {
    getDefultSelect();
  }, []);

  return (
    <div className="creatOrder">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div style={{ marginLeft: '10%' }}>
          <Space>
            <MinusOutlined rotate={90} className="line" />
          </Space>
          <span className="base-info">基础信息</span>
          <Row style={{ marginTop: 20 }}>
            <Col md={{ span: 9 }}>
              <Form.Item name="sourceType" label="销售模式" rules={[{ required: true }]}>
                <Select placeholder="请选择销售模式" options={salesModelOption} />
              </Form.Item>
            </Col>
            <Col md={{ span: 9, offset: 2 }}>
              <Form.Item name="site" label="销售站点" rules={[{ required: true }]}>
                <Select options={salesSiteOption} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              <Form.Item name="shopAccount" label="店铺账号" rules={[{ required: true }]}>
                <Select
                  placeholder="请选择店铺账号"
                  options={storeAccountOption}
                  allowClear
                  showSearch
                  // filterOption={false}
                  notFoundContent={fetching ? <Spin size="small" /> : null}
                  onSearch={debounceFetcher}
                />
              </Form.Item>
            </Col>
            <Col md={{ offset: 2, span: 9 }}>
              <Form.Item name="userId" label="买家信息" rules={[{ required: true }]}>
                <Select placeholder="请选择买家信息" options={buyerInfoOption} />
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
                name="platOrderSn"
                label="平台订单号-platOrderSn"
                rules={[{ required: false }, { type: 'string', min: 6 }]}
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
                <Select placeholder="默认为站点币种，可选择" options={currencyTypeOption} />
              </Form.Item>
            </Col>
            <Col md={{ offset: 1, span: 4 }}>
              <Form.Item name="status" label="订单状态-status" rules={[{ required: true }]}>
                <Select placeholder="请选择订单状态" allowClear options={statusOption} />
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
                <Select placeholder="请选择物流公司" options={deliveryCompanyOption} />
              </Form.Item>
            </Col>
            <Col md={{ span: 4, offset: 2 }}>
              <Form.Item
                name="deliveryStore"
                label="发货仓-deliveryStore"
                rules={[{ required: false }]}
              >
                <Select placeholder="请选择发货仓" options={deliveryStoreOption} />
              </Form.Item>
            </Col>
            <Col md={{ offset: 1, span: 5 }}>
              <Form.Item
                label={<div style={{ whiteSpace: 'nowrap' }}>最晚发货时间-latestDeliveryTime</div>}
                rules={[{ required: true, message: '请选择' }]}
                name="latestDeliveryTime"
              >
                <DatePicker showTime />
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
        <div style={{ marginLeft: '45%', marginTop: '20px' }}>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={btnLoading}>
                提交
              </Button>
            </Space>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
export default connect(({ CreateOrder }) => ({ ...CreateOrder }))(CreateOrder);
