import moment from "moment"

const useTable = props => {
    const { type } = props
    const TableType = {
        shoopTable: {
            columns: [
                { title: '店铺账号', dataIndex: 'shopAccount' ,width:200},
                { title: '平台', dataIndex: 'platform' ,width:200},
                { title: '站点', dataIndex: 'site' ,width:200},
                { title: '更新时间', dataIndex: 'gmtModified',width:200,render:(txt)=>{
                    if(txt){
                        return moment(txt).format('YYYY-MM-DD')
                    }
                    return ''
                } },
            ]
        }
    }


    return TableType[type]
}
export default useTable