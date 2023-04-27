import { connect } from 'umi';
import { Button, Col, Form, Input, Row, Select, Table } from 'antd';
import useTable from './tabState';
import { useEffect, useState } from 'react';
import AddModal from './addModal';
const userInfo = props => {
  const { dispatch } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>([]);
  const [receiverCountryOption, setReceiverCountryOption] = useState<any>([]);
  const [pageData, setPageData] = useState<any>({ current: 1, pageSize: 10 });
  const [loading, setLoading] = useState(false)
  const addGoods = () => {
    setVisible(true);
  };
  const onFinish = async val => {
    console.log(val);
    fetchData(val);
  };
  const fetchData = async obj => {
    try {
      setLoading(true)
      let res = await dispatch({
        type: 'CreateOrder/asyncGetUserInfo',
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
      setLoading(false)
    }
  };
  const pageChange = (c, p) => {
    fetchData({ pageNum: c, pageSize: p });
  };
  const getNationInfo = async () => {
    try {
      let res = await dispatch({ type: 'CreateOrder/asyncGetNationInfo', payload: {} })
      if (res?.code === 200) {
        setReceiverCountryOption(res?.data?.map(item => ({ label: item, value: item })))
      }
    }
    catch (e) {
      console.log(e)
    }
  }
  const reload=()=>{
    let fromval=form.getFieldsValue()
    fetchData({...fromval,pageNum: pageData.current, pageSize: pageData.pageSize})
  }

  useEffect(() => {
    fetchData({ pageNum: 1, pageSize: 10 });
    getNationInfo()
  }, []);
  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Row>
          <Col span={6}>
            <Form.Item
              name="buyerName"
              label="买家姓名"
              rules={[{ required: false }]}
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
              name="receiverName"
              label="收货人姓名"
              rules={[{ required: false }]}
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
              name="receiverCountry"
              label="收货人国家简称"
              rules={[{ required: false }]}
              labelCol={{ span: 8 }}
            >
              <Select options={receiverCountryOption} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="receiverState"
              label="省份/直辖市"
              rules={[{ required: false }]}
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
              name="receiverCity"
              label="城市"
              rules={[{ required: false }]}
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
              name="receiverPostCode"
              label="收货人邮编"
              rules={[{ required: false }]}
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="receiverPhone"
              label="收货人手机号"
              rules={[{ required: false }]}
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
              name="receiverEmail"
              label="收货人邮箱"
              rules={[{ required: false }]}
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
              name="receiverAddress1"
              label="地址1"
              rules={[{ required: false }]}
              labelCol={{ span: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col offset={19}>
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
        dataSource={tableData}
        {...useTable({ type: 'goodsTable' })}
        scroll={{ x: 1300 }}
        pagination={{
          onChange: pageChange,
          current: pageData?.current,
          pageSize: pageData?.pageSize,
          total: pageData?.total,
        }}
        loading={loading}
      />
      {visible && <AddModal visible={visible} setVisible={setVisible} reload={reload} receiverCountryOption={receiverCountryOption}/>}
    </div>
  );
};
export default connect(({ CreateOrder }) => ({ ...CreateOrder }))(userInfo);
