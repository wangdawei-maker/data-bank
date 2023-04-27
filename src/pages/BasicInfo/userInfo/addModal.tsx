import { Modal, Form, Row, Col, Select, Input } from 'antd';
import { connect } from 'umi';

const AddModal = props => {
  const { visible, setVisible, dispatch } = props;

  return (
    <Modal open={visible} onCancel={() => setVisible(false)} width={1100} title={'新增用户'}>
      <Form layout="vertical">
        <Row style={{ marginTop: 20 }}>
          <Col span={20} push={2}>
            <Form.Item name="buyerName" label="买家姓名" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={4} offset={3} pull={1}>
            <Form.Item name="receiverName" label="收货人姓名" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={4} offset={1} pull={1}>
            <Form.Item name="receiverCountry" label="收货人国家简称" rules={[{ required: true }]}>
              <Select />
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item name="receiverState" label="省份/直辖市" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item name="receiverCity" label="城市" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={4} offset={3} pull={1}>
            <Form.Item name="receiverPostCode" label="收货人邮编" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={4} offset={1} pull={1}>
            <Form.Item name="receiverPhone" label="收货人手机号" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item name="receiverEmail" label="收货人邮箱" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col offset={2} span={20}>
            <Form.Item name="receiverAddress1" label="地址1" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default connect(({ CreateOrder }) => ({ ...CreateOrder }))(AddModal);
