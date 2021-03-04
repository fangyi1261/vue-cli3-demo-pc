<template>
  <el-dialog :class="['upload-file', 'pop-dialog']" :visible='visible' @close='hide' width="400px" title='批量导入'
    :append-to-body='true' v-loading='fetching' v-dialogDrag>
    <el-form>
      <el-upload class="upload-demo" ref="upload" action="123"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :before-upload="handleFile" accept=".csv"
        :auto-upload="false"
        :limit="max"
        :on-exceed="handleMax"
        :on-change="handleChange">
        <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
        <span class="tip">
          支持格式：.csv； <a href="#" class="temp" ref="smsSendRecord"
          @click="downloadCSVTemp(header, fileName, 'smsSendRecord')">点击下载模版</a>
        </span>
      </el-upload>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <div class="tips">TIP：上传文件不超过 10M.</div>
      <el-button @click="submitUpload()" type="primary" plain :disabled='!file'>确定</el-button>
      <el-button @click="hide" type="primary" plain>取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import axios from 'axios';
// import XLSX from 'xlsx';
import { myBrowserIsIE, downloadCSVTemp } from '@/utils/downloadCSVTemp.js';
export default {
  name: 'upload-file',
  props: {},
  data() {
    return {
      visible: false,
      max: 1,
      fetching: false,
      file: null,
      importFileUrl: '',
      header: [
        { label: '', prop: '' }
      ],
      fileName: 'XXX.csv'
    };
  },
  methods: {
    downloadCSVTemp,
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
      this.$refs.upload.clearFiles();
    },
    handleRemove() {
      this.file = null;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleSuccess(res, file, fileList) {
      console.log(res, file, fileList);
    },
    handleMax(file, list) {
      if (list.length === 1) {
        return this.$message({
          message: '文件个数超出限制，请删除已选的文件再重新选择文件上传',
          type: 'warning'
        });
      }
    },
    handleChange(file, list) {
      console.log(list);
      this.file = file;
    },
    handleFile(file) {
      if (file.name.split('.')[1] !== 'csv') {
        this.$message({
          message: '文件格式错误',
          type: 'warning'
        });
        return false;
      }
      const isLt2M = file.size / 1024 < 500;

      if (!isLt2M) {
        this.$message({
          message: '上传文件不能大于500kb',
          type: 'warning'
        });
        return false;
      } else {
        const fd = new FormData();

        fd.append('file', file, file.name);
        axios.post(this.importFileUrl, fd, {}).then(res => {
          if (!res.data.message) {
            if (myBrowserIsIE()) {
              const BOM = '\uFEFF';
              const csvData = new Blob([BOM + res.data], { type: 'text/csv' });

              navigator.msSaveBlob(csvData, '批量发送文件.csv');
            } else {
              const dataBlob = new Blob([`\ufeff${res.data}`], { type: 'text/plain;charset=utf-8' });
              const url = window.URL.createObjectURL(dataBlob);
              const a = document.createElement('a');

              a.href = url;
              a.download = '批量发送文件结果.csv';
              a.click();
              window.URL.revokeObjectURL(url);
            }
            this.hide();
          } else {
            if (res.data.status === 2000) {
              this.$message('全部上传成功!');
            } else {
              this.$message({
                message: res.data.message,
                type: 'error'
              });
            }
          }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.upload-file {
  .el-dialog__body {
    padding: 10px 20px 10px;

    .el-form-item{
      margin-bottom: 6px;
      margin-right: 0;
    }

    .el-button {
      border-radius: 0;
    }

    .el-form-item__label {
      color: #333;
      font-weight: 700;
    }
  }

  .upload-demo {
    border: 1px dashed;
    padding: 25px 10px;
  }

  .tips {
    text-align: left;
    margin-bottom: 10px;
    color: #606266;
    margin-top: 10px;
  }

  .tip{
    display: inline-block;
    margin-left: 20px;
  }

  .temp{
    text-decoration: underline;
    color: #3569fd;
  }

  .el-dialog__footer {
    padding: 0 20px 20px;

    .dialog-footer {
      .el-button {
        line-height: 0.45;
      }
    }
  }
}
</style>
