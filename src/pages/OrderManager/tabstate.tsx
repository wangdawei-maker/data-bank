const useTable = props => {
  const { type,salesModelOption,statusOption,getDetail } = props;
  const TableType = {
    orderTable: {
      columns: [
        { title: '销售模式', dataIndex: 'sourceType', width: 200,render:(txt)=>{
          return salesModelOption.filter(item=>item.value==txt)[0]?.label
        } },
        { title: '销售站点', dataIndex: 'site', width: 200 },
        { title: '店铺账号', dataIndex: 'shopAccount', width: 200 },
        { title: '创建人', dataIndex: 'operator', width: 200 },
        { title: '平台订单号', dataIndex: 'platOrderSn', width: 200 },
        { title: '订单状态', dataIndex: 'status', width: 200 ,render:(txt)=>{
          return statusOption.filter(item=>item.value==txt)[0]?.label
        }},
        // {title:'操作',render:(record)=>{
        //   return <div> <a onClick={()=>getDetail(record)}>详情</a></div>
        // }}
      ],
    },
  };

  return TableType[type];
};
export default useTable;
