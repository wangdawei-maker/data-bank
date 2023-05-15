import { Button, Modal, Table, Tabs, message } from 'antd';
import { useEffect, useState } from 'react';
import { connect } from 'umi';

const AddGoodsModal = props => {
  const columns = [
    {
      title: '商品名称-goodsName',
      dataIndex: 'goodsName',
    },
    {
      title: '商品编号-goodsSn',
      dataIndex: 'goodsSn',
    },
    {
      title: '商品价格-goodsPrice',
      dataIndex: 'goodsPrice',
    },
    {
      title: '商品sku-goodsSku',
      dataIndex: 'goodsSku',
    },
    {
      title: '平台商品码-goodsItem',
      dataIndex: 'goodsItem',
    },
  ];
  const { dispatch, visible, setVisible ,addgoddsTable} = props;
  const [selectData, setSelectData] = useState<Array<Record<string, any>>>([]);
  const [tableData, setTableData] = useState<Array<Record<string, any>>>([]);
  const [pageData, setPageData] = useState<any>({ current: 1, pageSize: 10 });
  const [selectedRowKeys,setSelectedRowKeys]=useState<any>([])
  const rowSelection = {
    onChange: (newSelectedRowKeys, selectedRows) => {
      setSelectData(selectedRows);
      setSelectedRowKeys(newSelectedRowKeys)
    },
    preserveSelectedRowKeys: true,
    selectedRowKeys:selectedRowKeys
  };
  const pageChange = (c, p) => {
    fetchTableData({ pageNum: c, pageSize: p });
  };
  const items = [
    {
      key: '1',
      label: `待选`,
      children: (
        <Table
          rowSelection={{ ...rowSelection }}
          columns={columns}
          rowKey={'id'}
          dataSource={tableData}
          pagination={{
            onChange: pageChange,
            current: pageData?.current,
            pageSize: pageData?.pageSize,
            total: pageData?.total,
          }}
        />
      ),
    },
    {
      key: '2',
      label: `已选`,
      children: <Table columns={columns} dataSource={selectData} rowKey={'id'} />,
    },
  ];
  const submit = () => {
    setVisible(false);
    dispatch({ type: 'CreateOrder/save', payload: { addgoddsTable: selectData.map(item=>({...item,num:1})) } });
  };
  const fetchTableData = async obj => {
    try {
      let res = await dispatch({ type: 'CreateOrder/asyncGetItemInfo', payload: { ...obj } });
      if (res?.code === 200) {
        const { pageNum, pageSize, totalSize } = res?.data;
        setTableData(res?.data?.content);
        setPageData({ current: pageNum, pageSize: pageSize, total: totalSize });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTableData({ pageNum: 1, pageSize: 10 });
    if(addgoddsTable){
      setSelectedRowKeys(addgoddsTable.map(item=>item?.id))
      setSelectData(addgoddsTable)
    }
   
  }, []);

  return (
    <Modal
      open={visible}
      onCancel={() => setVisible(false)}
      title="新增商品"
      width={1000}
      onOk={submit}
    >
      <Tabs items={items} />
    </Modal>
  );
};
export default connect(({ CreateOrder }) => ({ ...CreateOrder }))(AddGoodsModal);
