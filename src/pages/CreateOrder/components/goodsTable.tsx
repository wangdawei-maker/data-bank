import React, { useContext, useEffect, useState } from 'react';
// import type { InputRef } from 'antd';
import { Button, Form, Popconfirm, Table, InputNumber,Tooltip } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { connect } from 'umi';
import AddGoodsModal from './addGoodsModal';

const EditableContext = React.createContext<FormInstance<any> | null>(null);


interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const form = useContext(EditableContext)!;
  const save = async () => {
    try {
      const values = await form.validateFields();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `请输入${title}`,
          },
        ]}
        // initialValue={children[1]}
        initialValue={1}
      >
        <InputNumber onPressEnter={save} onBlur={save} min={1} />
      </Form.Item >
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const GoodsTable: React.FC = (props: any) => {
  const { addgoddsTable, dispatch,orderForm } = props;
  const [dataSource, setDataSource] = useState<any>([]);
  const [visible, setVisible] = useState<boolean>(false);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter(item => item.key !== key);
    setDataSource(newData);
    dispatch({ type: 'CreateOrder/save', payload: { addgoddsTable: newData } });
  };

  const defaultColumns = [
    {
      title: '序号',
      dataIndex: 'key',
      with: 200,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      with: 200,
    },
    {
      title: '商品编号',
      dataIndex: 'goodsSn',
      with: 200,
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
      title: '系统sku',
      dataIndex: 'skuCode',
      with: 200,
      
    },
    {
      title: '商品价格',
      dataIndex: 'goodsPrice',
      with: 200,
    },
    {
      title: '商品sku',
      dataIndex: 'goodsSku',
      with: 200,
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
      with: 200,
    },
    {
      title: '数量',
      dataIndex: 'num',
      editable: true,
      with: 200,
    },
    {
      title: '操作',
      render: (_, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="确定删除?" onConfirm={() => handleDelete(record.key)}>
            <a>删除</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleSave = row => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    dispatch({type:'CreateOrder/save',payload:{addgoddsTable:newData}})
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  useEffect(() => {
    setDataSource(addgoddsTable.map((item,index)=>({...item,key:index+1})));
  }, [addgoddsTable]);

  return (
    <div>
      <div>
        <Button
          type="primary"
          style={{ marginBottom: '10px', float: 'right' }}
          onClick={() => setVisible(true)}
        >
          新增
        </Button>
      </div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        rowKey={'goodsSn'}
        scroll={{ x: 960 }}
      />
      {visible && <AddGoodsModal visible={visible} setVisible={setVisible} orderForm={orderForm}/>}
    </div>
  );
};

export default connect(({ CreateOrder }) => ({ ...CreateOrder }))(GoodsTable);
