const useTable = props => {
  const { type } = props;
  const TableType = {
    goodsTable: {
      columns: [
        { title: '商品名称', dataIndex: 'goodsName', width: 200 },
        { title: '商品编号', dataIndex: 'goodsSn', width: 200 },
        { title: '商品价格', dataIndex: 'goodsPrice', width: 200 },
        { title: '商品sku', dataIndex: 'goodsSku', width: 200 },
        { title: '平台商品码', dataIndex: 'goodsItem', width: 200 },
        { title: '商品折扣优惠', dataIndex: 'itemPromotionDiscount', width: 200 },
        { title: '系统skucode', dataIndex: 'skuCode', width: 200 },
        { title: 'vat币种', dataIndex: 'vatCurrencyCode', width: 200 },
        { title: 'vat(增值税)金额', dataIndex: 'vatAmount', width: 200 },
        { title: '商品成交费', dataIndex: 'goodsFee', width: 200 },
        {
          title: '是否组合商品',
          dataIndex: 'isCombination',
          width: 200,
          render: val => {
            switch (val) {
              case true:
                return '是';
              case false:
                return '否';
              default:
                return '';
            }
          },
        },
      ],
    },
  };

  return TableType[type];
};
export default useTable;
