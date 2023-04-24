
const UseTable = (props) => {
    const { type } = props
    const tableType = {
        goodsTable: {
            columns: [
                {
                    title: '序号',
                    dataIndex: 'name',
                },
                {
                    title: '平台sku',
                    dataIndex: 'age',
                },
                {
                    title: '系统sku',
                    dataIndex: 'address',

                },
            ],
        }

    }
    return tableType[type]
}
export default UseTable