import { Modal, Form, Row, Col, Select, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { connect } from 'umi';

const AddModal = props => {
  const [form] = Form.useForm();
  const sourceType = Form.useWatch('sourceType', form);
  const [salesSiteOption, setSalesSiteOption] = useState<any>([]); //销售站点下拉数据
  const [salesModelOption, setSalesModelOption] = useState<any>([]); //销售模式下拉数据
  // const [platformOption, setPlatformOption] = useState<any>([]); //销售平台下拉数据
  const { visible, setVisible, dispatch, reload } = props;
  const onFinish = async val => {
    try {
      let res = await dispatch({ type: 'CreateOrder/asyncAddShop', payload: { ...val } });
      if (res.code === 200) {
        message.success('新增成功!');
        reload();
        setVisible(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  //获取销售平台(监听销售模式)
  // const getPlatform = async (obj: any) => {
  //   form.setFieldValue('platform', undefined);
  //   try {
  //     let res = await dispatch({ type: 'CreateOrder/asyncGetPlatformSite', payload: { ...obj } });
  //     if (res?.code === 200) {
  //       let mapdata = [...new Set(res?.data?.map(item => item?.platformName))];
  //       setPlatformOption(mapdata?.map(item => ({ label: item, value: item })));
  //     } else {
  //       setPlatformOption([]);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
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
  //监听销售模式来获取销售站点下拉列表
  useEffect(() => {
    if (sourceType) {
      getPlatformSite({ sourceType });
      // getPlatform({ sourceType });
    }
  }, [sourceType]);
  useEffect(() => {
    getSourceEnums({});
  }, []);
  return (
    <Modal
      open={visible}
      onCancel={() => setVisible(false)}
      width={1100}
      title={'新增店铺'}
      onOk={() => form.submit()}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row>
          <Col span={8} offset={2}>
            <Form.Item name="shopAccount" label="店铺账号" rules={[{ required: true }]}>
              <Input placeholder="请输入店铺账号"/>
            </Form.Item>
          </Col>
          <Col span={8} offset={1}>
            <Form.Item name="sellingPartId" label="销售方id" rules={[{ required: true }]}>
              <Input placeholder="请输入销售方id"/>
            </Form.Item>
          </Col>
          <Col span={8} offset={2}>
            <Form.Item name="prmAccount" label="prm账号" rules={[{ required: true }]}>
              <Input placeholder="请输入prm账号"/>
            </Form.Item>
          </Col>
          <Col span={8} offset={1}>
            <Form.Item name="sourceType" label="销售模式" rules={[{ required: true }]}>
              <Select placeholder="请选择销售模式" options={salesModelOption} allowClear/>
            </Form.Item>
          </Col>
          <Col span={8} offset={2}>
            <Form.Item name="site" label="销售站点" rules={[{ required: true }]}>
              <Select placeholder="请选择销售站点" options={salesSiteOption} allowClear/>
            </Form.Item>
          </Col>
          {/* <Col span={4} offset={1}>
            <Form.Item name="platform" label="销售平台" rules={[{ required: true }]}>
              <Select options={platformOption} />
            </Form.Item>
          </Col> */}
        </Row>
      </Form>
    </Modal>
  );
};

export default connect(({ CreateOrder }) => ({ ...CreateOrder }))(AddModal);
