import { Modal, Form, Row, Col, Select, Input } from "antd"
import { connect } from "umi"

const AddModal = props => {
    const { visible, setVisible, dispatch } = props

    return <Modal open={visible} onCancel={() => setVisible(false)} width={1100} title={'新增店铺'}>
        <Form layout='vertical'>
            <Row>
                <Col span={20} push={3}>
                    <Form.Item name="shoopName" label="店铺名称" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Modal>
}

export default connect(({ goodsInfo }) => ({ goodsInfo }))(AddModal)