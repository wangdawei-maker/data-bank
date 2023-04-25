import React, { useContext, useEffect, useRef, useState } from 'react';
// import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table,InputNumber } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { connect } from 'umi';
import AddGoodsModal from './addGoodsModal';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

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

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `请输入${title}`,
          },
        ]}
      >
        <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} min={0}/>
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const GoodsTable: React.FC = (props:any) => {
  const { addgoddsTable } = props;
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      platformSku: 'Edward King 0',
      systemSku: '32',
      num: 1,
    },
    {
      key: '1',
      platformSku: 'Edward King 1',
      systemSku: '32',
      num: 2,
    },
  ]);
  const [visible, setVisible] = useState(false);

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter(item => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: '序号',
      width: '10%',
    },
    {
      title: '平台sku',
      dataIndex: 'platformSku',
    },
    {
      title: '系统sku',
      dataIndex: 'systemSku',
    },
    {
      title: '数量',
      dataIndex: 'num',
      editable: true,
    },
    {
      title: '操作',
      render: (_, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="确定删除?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
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
   
  useEffect(()=>{
    setDataSource(addgoddsTable)
  },[addgoddsTable])

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
      />
      <AddGoodsModal visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default connect(({ CreateOrder }) => ({ ...CreateOrder }))(GoodsTable);
