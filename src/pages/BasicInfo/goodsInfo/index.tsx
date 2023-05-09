import { connect } from 'umi';
import { Button, Col, Form, Input, Row, Select, Table } from 'antd';
import useTable from './tabState';
import { useEffect, useState } from 'react';
import AddModal from './addModal';
const goodsInfo = props => {
  const { dispatch } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>([]);
  const [pageData, setPageData] = useState<any>({ current: 1, pageSize: 10 });
  const [loading, setLoading] = useState(false);
  const [currencyTypeOption, setcurrencyTypeOption] = useState();
  const addGoods = () => {
    setVisible(true);
  };
  const onFinish = async val => {
    console.log(val);
    fetchData(val);
  };
  const fetchData = async obj => {
    try {
      setLoading(true);
      let res = await dispatch({
        type: 'CreateOrder/asyncGetItemInfo',
        payload: { pageNum: pageData?.current, pageSize: pageData?.pageSize, ...obj },
      });
      if (res.code === 200) {
        const { pageNum, pageSize, totalSize } = res?.data;
        setTableData(res?.data?.content);
        setPageData({ current: pageNum, pageSize: pageSize, total: totalSize });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
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
  const pageChange = (c, p) => {
    fetchData({ pageNum: c, pageSize: p });
  };
  const reload = () => {
    let fromval = form.getFieldsValue();
    fetchData({ ...fromval, pageNum: pageData.current, pageSize: pageData.pageSize });
  };
  useEffect(() => {
    fetchData({ pageNum: 1, pageSize: 10 });
    getCurrencyTypes();
  }, []);
  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Row>
          <Col span={6}>
            <Form.Item
              name="goodsName"
              label="商品名称"
              rules={[{ required: false }]}
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
              name="goodsSn"
              label="商品编号"
              rules={[{ required: false }]}
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
              name="goodsTotalPrice"
              label="商品价格"
              rules={[{ required: false }]}
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="goodsSku"
              label="商品sku"
              rules={[{ required: false }]}
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
              name="goodsItem"
              label="平台商品码"
              rules={[{ required: false }]}
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
              name="itemPromotionDiscount"
              label="商品折扣优惠价格"
              rules={[{ required: false }]}
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="skuCode"
              label="系统skucode"
              rules={[{ required: false }]}
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
              name="vatCurrencyCode"
              label="vat币种"
              rules={[{ required: false }]}
              labelCol={{ span: 8 }}
            >
              <Select options={currencyTypeOption} />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
              name="vatAmount"
              label="vat增值税(金额)"
              rules={[{ required: false }]}
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="goodsFee"
              label="商品成交费"
              rules={[{ required: false }]}
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item name="combineProducts" label="是否组合商品" labelCol={{ span: 8 }}>
              <Select
                options={[
                  { label: '是', value: 1 },
                  { label: '否', value: 0 },
                ]}
              />
            </Form.Item>
          </Col>
          <Col offset={5}>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                查询
              </Button>
            </Form.Item>
          </Col>
          <Col style={{ marginLeft: '35px' }}>
            <Form.Item>
              <Button htmlType="reset">重置</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div style={{ marginBottom: '10px' }}>
        <Button type="primary" onClick={addGoods}>
          新增
        </Button>
      </div>
      <Table
        rowKey={'id'}
        dataSource={tableData}
        {...useTable({ type: 'goodsTable' })}
        pagination={{
          onChange: pageChange,
          current: pageData?.current,
          pageSize: pageData?.pageSize,
          total: pageData?.total,
        }}
        loading={loading}
        scroll={{
          x: useTable({
            type: 'goodsTable',
          }).columns.reduce((total, item) => total + item?.width, 0),
        }}
      />
      {visible && <AddModal visible={visible} setVisible={setVisible} reload={reload} />}
    </div>
  );
};
export default connect(({ CreateOrder }) => ({ ...CreateOrder }))(goodsInfo);
