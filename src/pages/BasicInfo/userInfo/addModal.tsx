import { Modal, Form, Row, Col, Select, Input, message } from 'antd';
import { connect } from 'umi';

const AddModal = props => {
  const [form] = Form.useForm()
  const { visible, setVisible, dispatch, reload ,receiverCountryOption} = props;
  const onFinish = async val => {
    try {
      let res = await dispatch({ type: 'CreateOrder/asyncAddUser', payload: { ...val } })
      if (res.code === 200) {
        message.success('新增成功!')
        reload()
        setVisible(false)
      }
    }
    catch (e) {
      console.log(e)
    }
  }
  return (
    <Modal open={visible} onCancel={() => setVisible(false)} width={1100} title={'新增用户'} onOk={() => form.submit()}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row style={{ marginTop: 20 }}>
          <Col span={6} offset={2} pull={1}>
            <Form.Item name="buyerName" label="买家姓名" rules={[{ required: true }]}>
              <Input placeholder="请输入买家姓名"/>
            </Form.Item>
          </Col>
          <Col span={6} offset={1} pull={1}>
            <Form.Item name="receiverName" label="收货人姓名" rules={[{ required: true }]}>
              <Input placeholder="请输入收货人姓名"/>
            </Form.Item>
          </Col>
          <Col span={6} offset={1} pull={1}>
            <Form.Item name="receiverCountry" label="收货人国家简称" rules={[{ required: true }]}>
              <Select placeholder="请选择收货人国家简称" options={receiverCountryOption} allowClear/>
            </Form.Item>
          </Col>
          <Col span={6} offset={2} pull={1}>
            <Form.Item name="receiverState" label="省份/直辖市" rules={[{ required: true }]}>
              <Input placeholder="请输入省份/直辖市"/>
            </Form.Item>
          </Col>
          <Col span={6} offset={1} pull={1}>
            <Form.Item name="receiverCity" label="城市" rules={[{ required: true }]}>
              <Input placeholder="请输入城市"/>
            </Form.Item>
          </Col>
          <Col span={6} offset={1} pull={1}>
            <Form.Item name="receiverPostCode" label="收货人邮编" rules={[{ required: true }]}>
              <Input placeholder="请输入收货人邮编"/>
            </Form.Item>
          </Col>
          <Col span={6} offset={2} pull={1}>
            <Form.Item name="receiverPhone" label="收货人手机号" rules={[{ required: true }]}>
              <Input placeholder="请输入收货人手机号"/>
            </Form.Item>
          </Col>
          <Col span={6} offset={1} pull={1}>
            <Form.Item name="receiverEmail" label="收货人邮箱" rules={[{ required: true }]}>
              <Input placeholder="请输入收货人邮箱"/>
            </Form.Item>
          </Col>
          <Col span={6} offset={1} pull={1}>
            <Form.Item name="receiverAddress1" label="地址1" rules={[{ required: true }]}>
              <Input placeholder="请输入地址1"/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default connect(({ CreateOrder }) => ({ ...CreateOrder }))(AddModal);
