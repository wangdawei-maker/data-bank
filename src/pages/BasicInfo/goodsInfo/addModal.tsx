import { Modal, Form, Row, Col, Select, Input, message } from "antd"
import { useEffect, useState } from "react"
import { connect } from "umi"

const AddModal = props => {
    const [form] = Form.useForm();
    const { visible, setVisible, dispatch, reload } = props
    const [currencyTypeOption, setcurrencyTypeOption] = useState()
    const onFinish = async val => {
        try {
            let res = await dispatch({ type: 'CreateOrder/asyncAddItem', payload: { ...val } })
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
    useEffect(() => {
        getCurrencyTypes()
    }, [])
    return <Modal open={visible} onCancel={() => setVisible(false)} width={1100} title={'新增商品'} onOk={() => form.submit()}>
        <Form layout='vertical' onFinish={onFinish} form={form}>
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
                    <Form.Item name="goodsPrice" label="商品价格-goodsTotalPrice" rules={[{ required: true }]}>
                        <Input />
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
                    <Form.Item name="itemPromotionDiscount" label={<div style={{ whiteSpace: 'nowrap' }}>商品折扣优惠价格-itemPromotionDiscount</div>} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={9} offset={1} >
                    <Form.Item name="skuCode" label="系统skucode" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={4} offset={2} pull={1}>
                    <Form.Item name="vatCurrencyCode" label="vat币种-vatCurrencyCode" rules={[{ required: true }]}>
                        <Select options={currencyTypeOption} />
                    </Form.Item>
                </Col>
                <Col span={4} offset={1} pull={1}>
                    <Form.Item name="vatAmount" label={<div style={{ whiteSpace: 'nowrap' }}>vat增值税(金额)-vatAmount</div>} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={4} offset={1} >
                    <Form.Item name="goodsFee" label="商品成交费-goodsFee" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={4} offset={1} >
                    <Form.Item name="isCombination" label="是否组合商品" rules={[{ required: true }]}>
                        <Select options={[{ label: '是', value: 1 }, { label: '否', value: 0 }]} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Modal>
}

export default connect(({ CreateOrder }) => ({ ...CreateOrder }))(AddModal)