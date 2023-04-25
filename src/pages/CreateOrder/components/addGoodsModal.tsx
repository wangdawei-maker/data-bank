import { Modal, Table, Tabs } from 'antd';
import { useState } from 'react';
import { connect } from 'umi';
const data = [
  {
    goodsName: 'sdx',
    goodsSn: '001',
    goodsPrice: '12',
    goodsSku: 'vcx',
    goodsItem: 'code1',
    platformSku: 'sku1',
    systemSku: 'systemSku1',
    num: 1,
  },
  {
    goodsName: 'xxxs',
    goodsSn: '002',
    goodsPrice: '112',
    goodsSku: 'vxx',
    goodsItem: 'code2',
    platformSku: 'sku2',
    systemSku: 'systemSku2',
    num: 1,
  },
  {
    goodsName: 'oiu',
    goodsSn: '003',
    goodsPrice: '152',
    goodsSku: 'xwx',
    goodsItem: 'code3',
    platformSku: 'sku3',
    systemSku: 'systemSku3',
    num: 1,
  },
];
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
  const { dispatch, visible, setVisible } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectData, setSelectData] = useState<Array<Record<string, any>>>([]);
  const rowSelection = {
    onChange: (newSelectedRowKeys, selectedRows) => {
      setSelectedRowKeys(newSelectedRowKeys);
      setSelectData(selectedRows);
    },
  };
  const items = [
    {
      key: '1',
      label: `待选`,
      children: (
        <Table
          rowSelection={{ ...rowSelection }}
          columns={columns}
          rowKey={'goodsSn'}
          dataSource={data}
        />
      ),
    },
    {
      key: '2',
      label: `已选`,
      children: <Table columns={columns} dataSource={selectData} rowKey={'goodsSn'} />,
    },
  ];
  const submit = () => {
    setVisible(false);
    dispatch({ type: 'CreateOrder/save', payload: { addgoddsTable: selectData } });
  };

  return (
    <Modal
      open={visible}
      onCancel={() => setVisible(false)}
      title="选择引用数据"
      width={1000}
      onOk={submit}
    >
      <Tabs items={items} />
    </Modal>
  );
};
export default connect(({ CreateOrder }) => ({ ...CreateOrder }))(AddGoodsModal);
