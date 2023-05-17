import { Modal, Table, Tabs, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { connect } from 'umi';

const AddGoodsModal = props => {
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: '商品编号',
      dataIndex: 'goodsSn',
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: '商品价格',
      dataIndex: 'goodsPrice',
      with:20,
    },
    {
      title: '商品sku',
      dataIndex: 'goodsSku',
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: '平台商品码',
      dataIndex: 'goodsItem',
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
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
