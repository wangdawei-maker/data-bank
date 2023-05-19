import { connect, history } from 'umi';
import useTable from './tabstate';
import { Table, Form, Col, Button, Row, Input, Select,DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import moment from 'moment';
const orderManager = props => {
  const { dispatch } = props;
  const [form] = Form.useForm();
  const [salesModelOption, setSalesModelOption] = useState<any>([]); //销售模式下拉数据
  const [statusOption, setStatusOption] = useState<any>([]); //订单状态下拉数据
  const [tableData, setTableData] = useState<any>([]); //table数据
  const [pageData, setPageData] = useState<any>({ current: 1, pageSize: 10 }); //分页信息
  const [loading, setLoading] = useState(false);
  const onFinish = val => {
    console.log(val);
    fetchData(val);
  };
  //获取平台和销售模式
  const getSourceEnums = async (obj: any) => {
    try {
      let res = await dispatch({ type: 'CreateOrder/asyncSourceEnums', payload: obj });
      if (res?.code === 200) {
        setSalesModelOption(
          res?.data.map(item => ({ label: item?.platform, value: item?.sourceType })),
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  //获取订单状态下拉数据
  const getOrderStatusInfo = async () => {
    try {
      let res = await dispatch({ type: 'CreateOrder/asyncGetOrderStatusInfo', payload: {} });
      if (res.code === 200) {
        let data = res?.data;
        let arr: Array<{ label: string; value: any }> = [];
        for (let i in data) {
          arr.push({ label: data[i], value: i });
        }
        setStatusOption(arr);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const fetchData = async obj => {
    try {
      setLoading(true);
      if(obj?.gmtCreate){
        obj.gmtCreate=moment(obj?.gmtCreate).format('YYYY-MM-DD HH:MM:SS')
      }
      if(obj?.gmtModified){
        obj.gmtModified=moment(obj?.gmtModified).format('YYYY-MM-DD HH:MM:SS')
      }
      let res = await dispatch({
        type: 'orderManager/asyncGetList',
        payload: { pageNum: pageData?.current, pageSize: pageData?.pageSize, ...obj },
        
      });
      if (res.code === 200) {
        const { pageNum, pageSize, totalSize, content } = res?.data;
        let newdata = content.map(item => {
          const { jsonParam } = item;
          const { site, shopAccount, status } = jsonParam;
          return { ...item, site, shopAccount, status };
        });
        setTableData(newdata);
        setPageData({ current: pageNum, pageSize: pageSize, total: totalSize });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const reload = () => {
    let fromval = form.getFieldsValue();
    fetchData({ ...fromval, pageNum: pageData.current, pageSize: pageData.pageSize });
  };
  const getDetail = record => {
    history.push({
      pathname: '/CreateOrder',
      query: { actionType: 'detail', platOrderSn: record?.platOrderSn },
    });
    console.log("打印record"+record);
  };
  const pageChange = (c, p) => {
    fetchData({ pageNum: c, pageSize: p });
  };
  const createOrder = () => {
    history.push({ pathname: '/CreateOrder', query: { actionType: 'add' } });
  };
  useEffect(() => {
    fetchData({ pageNum: 1, pageSize: 10 });
    getOrderStatusInfo();
    getSourceEnums({});
  }, []);
  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Row>
          <Col span={7} >
            <Form.Item
              name="sourceType"
              label="销售模式"
              rules={[{ required: false }]}
              labelCol={{ span: 7 }}
            >
              <Select options={salesModelOption} />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
              name="sourceType"
              label="销售站点"
              rules={[{ required: false }]}
              labelCol={{ span: 7 }}
            >
              <Select options={salesModelOption} />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
              name="platOrderSn"
              label="平台订单号"
              rules={[{ required: false }]}
              labelCol={{ span: 7 }}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={7} >
            <Form.Item
              name="gmtCreate"
              label="订单创建时间"
              rules={[{ required: false }]}
              labelCol={{ span: 7}}
            >
              <DatePicker style={{width:'100%'}}></DatePicker>
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item
              name="gmtModified"
              label="订单结束时间"
              rules={[{ required: false }]}
              labelCol={{ span: 7 }}
            >
              <DatePicker  style={{width:'100%'}}></DatePicker>
            </Form.Item>
          </Col>

          <Col offset={3}>
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

          <Col offset={4} pull={4}>
            <Button
              type="primary"
              onClick={createOrder}
              style={{ marginBottom: '10px', marginTop: '-10px' }}
            >
              创建订单
            </Button>
          </Col>
        </Row>
      </Form>
      <Table
        dataSource={tableData}
        rowKey={'id'}
        {...useTable({ type: 'orderTable', salesModelOption, statusOption, getDetail })}
        pagination={{
          onChange: pageChange,
          current: pageData?.current,
          pageSize: pageData?.pageSize,
          total: pageData?.total,
          showTotal: total => `共${total}条数据`,
        }}
        loading={loading}
        scroll={{
          x: useTable({
            type: 'orderTable',
          }).columns.reduce((total, item) => total + item?.width, 0),
        }}
      />
    </div>
  );
};

export default connect(orderManager => ({ ...orderManager }))(orderManager);
