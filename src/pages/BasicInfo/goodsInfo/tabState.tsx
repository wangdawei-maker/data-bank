
const useTable = props => {
    const { type } = props
    const TableType = {
        goodsTable: {
            columns: [
                { title: '商品名称', index: 'goodsName' },
                { title: '商品编号', index: 'goodsSn' },
                { title: '商品价格', index: 'goodsTotalPrice' },
                { title: '商品sku', index: 'goodsSku' },
                { title: '平台商品码', index: 'goodsItem' },
                { title: '商品折扣优惠', index: 'ItemPromotionDiscount' },
                { title: '系统skucode', index: 'systemSkuCode' },
                { title: 'vat币种', index: 'vatCurrencyCode' },
                { title: 'vat(增值税)金额', index: 'vatAmount' },
                { title: '商品成交费', index: 'goodsFee' },
                { title: '是否组合商品', index: 'isCombinationProducts' },
            ]
        }
    }


    return TableType[type]
}
export default useTable