
const useTable = props => {
    const { type } = props
    const TableType = {
        userTable: {
            columns: [
                { title: '买家姓名', dataIndex: 'buyerName',width: 200 },
                { title: '收货人姓名', dataIndex: 'receiverName' ,width: 200},
                { title: '收货人国家简称', dataIndex: 'receiverCountry',width: 200 },
                { title: '省份/直辖市', dataIndex: 'receiverState' ,width: 200},
                { title: '城市', dataIndex: 'receiverCity',width: 200 },
                { title: '收货人邮编', dataIndex: 'receiverPostCode',width: 200 },
                { title: '收货人手机号', dataIndex: 'receiverPhone',width: 200 },
                { title: '收货人邮箱', dataIndex: 'receiverEmail' ,width: 200},
                { title: '地址', dataIndex: 'receiverAddress1' ,width: 200},
            ]
        }
    }


    return TableType[type]
}
export default useTable