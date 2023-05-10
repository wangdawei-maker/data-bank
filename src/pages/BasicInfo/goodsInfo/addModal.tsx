import { Modal, Form, Row, Col, Select, Input, message, InputNumber, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { connect } from 'umi';

const AddModal = props => {
  const [form] = Form.useForm();
  const sourceType = Form.useWatch('sourceType', form);
  const { visible, setVisible, dispatch, reload } = props;
  const [currencyTypeOption, setcurrencyTypeOption] = useState();
  const [salesSiteOption, setSalesSiteOption] = useState<any>([]); //销售站点下拉数据
  const [salesModelOption, setSalesModelOption] = useState<any>([]); //销售模式下拉数据
  const [storeAccountOption, setStoreAccountOption] = useState<any>([]); //店铺账号下拉数据
  const [platformOption, setPlatformOption] = useState<any>([]); //销售平台下拉数据
  const [fetching, setFetching] = useState(false);
  const onFinish = async val => {
    try {
      let res = await dispatch({ type: 'CreateOrder/asyncAddItem', payload: { ...val } });
      if (res.code === 200) {
        message.success('新增成功!');
        reload();
        setVisible(false);
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
  //获取销售站点(监听销售模式)
  const getPlatformSite = async (obj: any) => {
    form.setFieldValue('site', undefined);
    try {
      let res = await dispatch({ type: 'CreateOrder/asyncGetPlatformSite', payload: { ...obj } });
      if (res?.code === 200) {
        setSalesSiteOption(res?.data?.map(item => ({ label: item?.citeCn, value: item?.citeEn })));
      } else {
        setSalesSiteOption([]);
      }
    } catch (e) {
      console.log(e);
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
    //获取销售平台(监听销售模式)
    const getPlatform = async (obj: any) => {
      form.setFieldValue('platform', undefined);
      try {
        let res = await dispatch({ type: 'CreateOrder/asyncGetPlatformSite', payload: { ...obj } });
        if (res?.code === 200) {
          let mapdata = [...new Set(res?.data?.map(item => item?.platformName))];
          setPlatformOption(mapdata?.map(item => ({ label: item, value: item })));
        } else {
          setPlatformOption([]);
        }
      } catch (e) {
        console.log(e);
      }
    };
  //监听销售模式来获取销售站点下拉列表
  useEffect(() => {
    if (sourceType) {
      getPlatformSite({ sourceType });
      getPlatform({sourceType})
    }
  }, [sourceType]);
  useEffect(() => {
    getCurrencyTypes();
    getSourceEnums({});
  }, []);
  return (
    <Modal
      open={visible}
      onCancel={() => setVisible(false)}
      width={1100}
      title={'新增商品'}
      onOk={() => form.submit()}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row>
          <Col span={20} push={1}>
            <Form.Item name="goodsName" label="商品名称-goodsName" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={9} offset={2} pull={1}>
            <Form.Item name="goodsSn" label="商品编号-goodsSn" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item
              name="goodsPrice"
              label="商品价格-goodsTotalPrice"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item name="goodsSku" label="商品sku-goodsSku" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={4} offset={2} pull={1}>
            <Form.Item name="goodsItem" label="平台商品码-goodsItem" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={4} offset={1} pull={1}>
            <Form.Item
              name="itemPromotionDiscount"
              label={
                <div style={{ whiteSpace: 'nowrap' }}>商品折扣优惠价格-itemPromotionDiscount</div>
              }
              rules={[{ required: true }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={9} offset={1}>
            <Form.Item name="skuCode" label="系统skucode" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={4} offset={2} pull={1}>
            <Form.Item
              name="vatCurrencyCode"
              label="vat币种-vatCurrencyCode"
              rules={[{ required: true }]}
            >
              <Select options={currencyTypeOption} />
            </Form.Item>
          </Col>
          <Col span={4} offset={1} pull={1}>
            <Form.Item
              name="vatAmount"
              label={<div style={{ whiteSpace: 'nowrap' }}>vat增值税(金额)-vatAmount</div>}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item name="goodsFee" label="商品成交费-goodsFee" rules={[{ required: true }]}>
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item name="isCombination" label="是否组合商品" rules={[{ required: true }]}>
              <Select
                options={[
                  { label: '是', value: 1 },
                  { label: '否', value: 0 },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item name="itemShippingCharge" label="邮费" rules={[{ required: true }]}>
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item name="taxRate" label="税费" rules={[{ required: true }]}>
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={4} offset={2}>
            <Form.Item name="sourceType" label="销售模式" rules={[{ required: true }]}>
              <Select placeholder="请选择销售模式" options={salesModelOption} />
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item name="site" label="销售站点" rules={[{ required: true }]}>
              <Select options={salesSiteOption} />
            </Form.Item>
          </Col>
          <Col span={9} offset={1}>
            <Form.Item name="storeMail" label="店铺账号" rules={[{ required: true }]}>
              <Select
                placeholder="请选择店铺账号"
                options={storeAccountOption}
                allowClear
                showSearch
                filterOption={false}
                notFoundContent={fetching ? <Spin size="small" /> : null}
                onSearch={debounceFetcher}
              />
            </Form.Item>
          </Col>
          <Col span={4} offset={2}>
            <Form.Item name="platType" label="平台类型" rules={[{ required: true }]} initialValue={'scp'}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item name="platform" label="销售平台" rules={[{ required: true }]}>
              <Select options={platformOption} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default connect(({ CreateOrder }) => ({ ...CreateOrder }))(AddModal);
