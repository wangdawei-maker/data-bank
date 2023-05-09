import { Modal, Form, Row, Col, Select, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { connect } from 'umi';

const AddModal = props => {
  const [form] = Form.useForm();
  const sourceType = Form.useWatch('sourceType', form);
  const [salesSiteOption, setSalesSiteOption] = useState<any>([]); //销售站点下拉数据
  const [salesModelOption, setSalesModelOption] = useState<any>([]); //销售模式下拉数据
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
  //监听销售模式来获取销售站点下拉列表
  useEffect(() => {
    if (sourceType) {
      getPlatformSite({ sourceType });
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
          <Col span={9} offset={2}>
            <Form.Item name="shopAccount" label="店铺名称" rules={[{ required: true }]}>
              <Input />
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
        </Row>
      </Form>
    </Modal>
  );
};

export default connect(({ CreateOrder }) => ({ ...CreateOrder }))(AddModal);
