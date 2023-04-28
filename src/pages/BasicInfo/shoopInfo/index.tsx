import { connect } from 'umi';
import { Button, Table, Form, Input, Row, Col } from 'antd';
import useTable from './tabState';
import { useState, useEffect } from 'react';
import AddModal from './addModal';
const shoopInfo = props => {
  const { dispatch } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>([]);
  const [pageData, setPageData] = useState<any>({ current: 1, pageSize: 10 });
  const [loading, setLoading] = useState(false)
  const addGoods = () => {
    setVisible(true);
  };
  const onFinish = async val => {
    console.log(val);
    fetchData(val)
  };
  const pageChange = (c, p) => {
    fetchData({ pageNum: c, pageSize: p });
  };
  const fetchData = async obj => {
    try {
      setLoading(true)
      let res = await dispatch({
        type: 'CreateOrder/asyncGetShopInfo',
        payload: { pageNum: pageData?.current, pageSize: pageData?.pageSize, ...obj },
      });
      if(res.code===200){
        const { pageNum, pageSize, totalSize } = res?.data;
        setTableData(res?.data?.content)
        setPageData({ current: pageNum, pageSize: pageSize, total: totalSize });
      }
    } catch (e) {
      console.log(e);
    }finally {
      setLoading(false)
    }
  };
  const reload=()=>{
    let fromval=form.getFieldsValue()
    fetchData({...fromval,pageNum: pageData.current, pageSize: pageData.pageSize})
  }
  useEffect(() => {
    fetchData({ pageNum: 1, pageSize: 10 });
  }, []);

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Row>
          <Col span={6}>
            <Form.Item name={'goodsName'} label="店铺名称">
              <Input />
            </Form.Item>
          </Col>
          <Col offset={1}>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                查询
              </Button>
            </Form.Item>
          </Col>
          <Col style={{ marginLeft: '10px' }}>
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
        {...useTable({ type: 'shoopTable' })}
        scroll={{ x: 1300 }}
        pagination={{
          onChange: pageChange,
          current: pageData?.current,
          pageSize: pageData?.pageSize,
          total: pageData?.total,
        }}
        loading={loading}
      />
      {visible && <AddModal visible={visible} setVisible={setVisible} reload={reload}/>}
    </div>
  );
};
export default connect(({ CreateOrder }) => ({ ...CreateOrder }))(shoopInfo);
