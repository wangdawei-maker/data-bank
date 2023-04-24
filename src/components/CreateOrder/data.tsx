// import { useEffect, useState } from 'react';
// import { Select } from 'antd';
// import request from '@/utils/request';

// interface SkuType {
//   skuCode: string;
//   skuName: string;
//   id: number;
// }

// export default function SaleSite() {
//   const [saleSite, setsaleSite] = useState([]);

//   useEffect(() => {
//     request.get('/wdc-warehouse-service/inventory-adjustment/detail/50').then(res => {
//       setsaleSite(res.data.detailDos);
//       // console.log('打印'+JSON.stringify(res.data.detailDos))
//     });
//   }, []);
//   return (
//     <Select placeholder="请选择销售平台" allowClear>
//       {saleSite.map((item: SkuType) => {
//         return (
//           <Select.Option value={item.id} key={item.id}>
//             {item.id}
//           </Select.Option>
//         );
//       })}
//     </Select>
//   );
// }
