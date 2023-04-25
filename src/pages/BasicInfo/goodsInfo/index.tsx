import { connect } from "umi"
import { Button, Table } from 'antd'
import useTable from "./tabState"
import { useState } from "react"
import AddModal from "./addModal"
const goodsInfo = props => {
    const [visible, setVisible] = useState<boolean>(false)

    const addGoods = () => {
        setVisible(true)
    }


    return <div>
        <div style={{ float: 'right', marginBottom: '10px' }}><Button type="primary" onClick={addGoods}>新增</Button></div>
        <Table dataSource={[]}{...useTable({ type: 'goodsTable' })} scroll={{ x: 1300 }} />
        {visible && <AddModal visible={visible} setVisible={setVisible} />}
    </div>
}
export default connect(({ goodsInfo }) => ({ goodsInfo }))(goodsInfo)