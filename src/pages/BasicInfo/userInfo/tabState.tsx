
const useTable = props => {
    const { type } = props
    const TableType = {
        goodsTable: {
            columns: [
                { title: '买家姓名', index: 'buyerName' },
                { title: '收货人姓名', index: 'receiverName' },
                { title: '收货人国家简称', index: 'receiverCountry' },
                { title: '省份/直辖市', index: 'receiverState' },
                { title: '城市', index: 'receiverCity' },
                { title: '收货人邮编', index: 'receiverPostCode' },
                { title: '收货人手机号', index: 'receiverPhone' },
                { title: '收货人邮箱', index: 'receiverEmail' },
                { title: '地址', index: 'receiverAddress1' },
            ]
        }
    }


    return TableType[type]
}
export default useTable