/* eslint-disable no-invalid-this */

// 判断是否是IE浏览器
export function myBrowserIsIE() {
  let isIE = false;

  if (navigator.userAgent.indexOf('compatible') > -1 && navigator.userAgent.indexOf('MSIE') > -1) {
    isIE = true;
  }
  if (navigator.userAgent.indexOf('Trident') > -1) {
    isIE = true;
  }
  return isIE;
}

export function headerLabel(header) {
  let result = [];

  result = header.map(item => item.label);
  return result.join(',');
}

export function headerProp(header) {
  const result = header.map(item => item.prop);

  return result;
}

export function handleString(csvContent, header) {
  let dataString = '';

  for (let i = 0; i < headerProp(header).length; i++) {
    dataString += `${headerProp(header)[i]},`;
  }
  csvContent += dataString.replace(/,$/, '\n');
  return csvContent;
}

export function downloadCSVTemp(header, fileName, attr) {
  let csvContent = '';

  if (myBrowserIsIE()) {
    const BOM = '\uFEFF';
    // 文件转Blob 格式

    csvContent += `${headerLabel(header)}\n`;
    const result = handleString(csvContent, header);
    const csvData = new Blob([BOM + result], { type: 'text/csv' });

    navigator.msSaveBlob(csvData, fileName);
  } else {
    csvContent = 'data:text/csv;charset=utf8,\ufeff';
    csvContent += `${headerLabel(header)}\n`;
    const result = handleString(csvContent, header);

    this.$refs[attr].setAttribute('href', encodeURI(result));
    this.$refs[attr].setAttribute('download', fileName);
  }
}

