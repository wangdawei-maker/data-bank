
const useTable = props => {
    const { type } = props
    const TableType = {
        shoopTable: {
            columns: [
                { title: '店铺名称', index: 'goodsName' },
                { title: '更新时间', index: 'goodsSn' },
            ]
        }
    }


    return TableType[type]
}
export default useTable