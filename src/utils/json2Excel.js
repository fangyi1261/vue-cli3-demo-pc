import XLSX from 'xlsx';

/**
 *
 * @param {*} headerTitle 表格头（json对象）
 * @param {*} data 表格内容
 * @param {*} xlsxName 导出表格名
 */
export default function json2Excel(headerTitle, data, xlsxName) {
  data = JSON.parse(JSON.stringify(data));
  data.forEach(item => {
    for (const key in item) {
      if (!headerTitle[key]) {
        delete item[key];
      }
    }
  });

  const ws = XLSX.utils.json_to_sheet(
    [headerTitle].concat(data), {
      skipHeader: true
    }
  );

  // 设置表格宽度
  ws['!cols'] = [
    { wpx: 200 },
    { wpx: 200 },
    { wpx: 200 },
    { wpx: 200 },
    { wpx: 200 }
  ];

  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, xlsxName);
  XLSX.writeFile(wb, `${xlsxName}.xlsx`);
}
