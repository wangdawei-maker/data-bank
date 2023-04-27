import { Modal, Form, Row, Col, Select, Input, message } from "antd"
import { connect } from "umi"

const AddModal = props => {
    const [form]=Form.useForm()
    const { visible, setVisible, dispatch,reload } = props
    const onFinish=async val=>{
        try {
            let res = await dispatch({ type: 'CreateOrder/asyncAddShop', payload: { ...val } })
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
    return <Modal open={visible} onCancel={() => setVisible(false)} width={1100} title={'新增店铺'} onOk={()=>form.submit()}>
        <Form layout='vertical' form={form} onFinish={onFinish}>
            <Row>
                <Col span={20} push={3}>
                    <Form.Item name="shopAccount" label="店铺名称" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Modal>
}

export default connect(({ CreateOrder }) => ({ ...CreateOrder }))(AddModal)