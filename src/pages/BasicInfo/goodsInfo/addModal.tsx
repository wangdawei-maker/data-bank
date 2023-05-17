import { Modal, Form, Row, Col, Select, Input, message, InputNumber, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { connect } from 'umi';

const AddModal = props => {
  const [form] = Form.useForm();
  const sourceType = Form.useWatch('sourceType', form);
  const site = Form.useWatch('site', form);
  const { visible, setVisible, dispatch, reload } = props;
  const [currencyTypeOption, setcurrencyTypeOption] = useState();
  const [salesSiteOption, setSalesSiteOption] = useState<any>([]); //销售站点下拉数据
  const [salesModelOption, setSalesModelOption] = useState<any>([]); //销售模式下拉数据
  const [shopInfoBySelectiveOption, setShopInfoBySelectiveOption] = useState<any>([]); //店铺账号下拉数据
  // const [fetching, setFetching] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
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
        setSalesSiteOption(res?.data?.map(item => ({ label: item?.citeEn, value: item?.citeEn })));
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
        setSalesModelOption(res?.data.map(item => ({ label: item?.platform, value:item?.sourceType })));
      }
    } catch (e) {
      console.log(e);
    }
  };
  //搜索文本框值变化时回调
  // const debounceFetcher = async val => {
  //   setFetching(true);
  //   try {
  //     let res = await dispatch({
  //       type: 'CreateOrder/asyncGetShopInfo',
  //       payload: { shopAccount: val, pageNum: 1, pageSize: 30 },
  //     });
  //     if (res?.code === 200) {
  //       setStoreAccountOption(
  //         res?.data?.content?.map(item => ({ ...item, label: item.shopAccount, value: item.id })),
  //       );
  //     } else {
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     setFetching(false);
  //   }
  // };
  //根据条件查询店铺信息
  const getShopInfoBySelective = async (obj: any) => {
    try {
      let res = await dispatch({
        type: 'CreateOrder/asyncGetShopInfoBySelective',
        payload: { site: site, sourceType: sourceType },
      });
      if (res?.code === 200) {
        setShopInfoBySelectiveOption(
          res?.data?.map(item => ({
            ...item,
            label: item.shopAccount,
            value: item.shopAccount,
          })),
        );
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };

  //监听销售模式来获取销售站点下拉列表
  useEffect(() => {
    if (sourceType) {
      getPlatformSite({ sourceType });
      getShopInfoBySelective({ sourceType });
    }
  }, [sourceType]);
  //监听站点数据来获取买家信息下拉列表
  useEffect(() => {
    if (site) {
      if (firstRender) {
        setFirstRender(false);
      } else {
        form.setFieldValue('userId', undefined); //每次获取前先清空上一次的买家信息
        form.setFieldValue('shopAccount', undefined);//每次获取前先清空上一次的店铺账号
      }
      getShopInfoBySelective({site});
    }
  }, [site]);
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
            <Form.Item name="goodsName" label="商品名称" rules={[{ required: true }]}>
              <Input placeholder="请输入商品名称"/>
            </Form.Item>
          </Col>
          <Col span={9} offset={2} pull={1}>
            <Form.Item name="goodsSn" label="商品编号" rules={[{ required: true }]}>
              <Input placeholder="请输入商品编号"/>
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item
              name="goodsPrice"
              label="商品价格"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} placeholder="请输入商品价格"/>
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item name="goodsSku" label="商品sku" rules={[{ required: true }]}>
              <Input placeholder="请输入商品sku"/>
            </Form.Item>
          </Col>
          <Col span={4} offset={2} pull={1}>
            <Form.Item name="goodsItem" label="平台商品码" rules={[{ required: true }]}>
              <Input placeholder="请输入平台商品码"/>
            </Form.Item>
          </Col>
          <Col span={4} offset={1} pull={1}>
            <Form.Item
              name="itemPromotionDiscount"
              label={
                <div style={{ whiteSpace: 'nowrap' }}>商品折扣优惠价格</div>
              }
              rules={[{ required: true }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} placeholder="请输入商品折扣优惠价格"/>
            </Form.Item>
          </Col>
          <Col span={9} offset={1}>
            <Form.Item name="skuCode" label="系统skucode" rules={[{ required: true }]}>
              <Input placeholder="请输入系统skucode"/>
            </Form.Item>
          </Col>
          <Col span={4} offset={2} pull={1}>
            <Form.Item
              name="vatCurrencyCode"
              label="vat币种"
              rules={[{ required: true }]}
            >
              <Select options={currencyTypeOption} placeholder="请选择vat币种" allowClear/>
            </Form.Item>
          </Col>
          <Col span={4} offset={1} pull={1}>
            <Form.Item
              name="vatAmount"
              label={<div style={{ whiteSpace: 'nowrap' }}>vat增值税(金额)</div>}
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入vat增值税(金额)"/>
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item name="goodsFee" label="商品成交费" rules={[{ required: true }]}>
              <InputNumber min={0} style={{ width: '100%' }} placeholder="请输入商品成交费"/>
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item name="isCombination" label="是否组合商品" rules={[{ required: true }]}>
              <Select
                options={[
                  { label: '是', value: 1 },
                  { label: '否', value: 0 },
                ]}
                placeholder="请选择是否组合商品"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item name="itemShippingCharge" label="邮费" rules={[{ required: true }]}>
              <InputNumber min={0} style={{ width: '100%' }} placeholder="请输入邮费"/>
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item name="taxRate" label="税费" rules={[{ required: true }]}>
              <InputNumber min={0} style={{ width: '100%' }} placeholder="请输入税费"/>
            </Form.Item>
          </Col>
          <Col span={4} offset={2}>
            <Form.Item name="sourceType" label="销售模式" rules={[{ required: true }]}>
              <Select placeholder="请选择销售模式" options={salesModelOption} allowClear/>
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item name="site" label="销售站点" rules={[{ required: true }]}>
              <Select options={salesSiteOption} placeholder="请选择销售站点" allowClear/>
            </Form.Item>
          </Col>
          {/* <Col span={9} offset={1}>
            <Form.Item name="storeMail" label="店铺账号" rules={[{ required: true }]}>
              <Select
                placeholder="请选择店铺账号"
                options={shopInfoBySelectiveOption}
                allowClear
                showSearch
                filterOption={false}
                notFoundContent={fetching ? <Spin size="small" /> : null}
                onSearch={debounceFetcher}
              />
            </Form.Item>
          </Col> */}
          <Col span={9} offset={1}>
                <Form.Item name="storeMail" label="店铺账号" rules={[{ required: true }]}>
                <Select placeholder="请选择店铺账号" options={shopInfoBySelectiveOption} 
                allowClear
                />
                </Form.Item>
              </Col>
          <Col span={9} offset={2}>
            <Form.Item name="platType" label="平台类型" rules={[{ required: true }]} initialValue={'scp'}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default connect(({ CreateOrder }) => ({ ...CreateOrder }))(AddModal);
