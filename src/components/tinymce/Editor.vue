<template>
  <div class="tinymce">
    <!-- 富文本 -->
    <editor v-model="content" :init="init"></editor>
  </div>
</template>

<script>
/* eslint-disable */
import tinymce from 'tinymce/tinymce';
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/themes/silver';
import 'tinymce/icons/default/icons'; // 默认字体图标
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/autosave";
import "tinymce/plugins/bbcode";
import "tinymce/plugins/charmap";
import "tinymce/plugins/code";
import "tinymce/plugins/codesample";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/directionality";
import "tinymce/plugins/fullpage";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/help";
import "tinymce/plugins/hr";
import "tinymce/plugins/image";
import "tinymce/plugins/imagetools";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/legacyoutput";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/noneditable";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/paste";
import "tinymce/plugins/preview";
import "tinymce/plugins/print";
import "tinymce/plugins/quickbars";
import "tinymce/plugins/save";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/spellchecker";
import "tinymce/plugins/tabfocus";
import "tinymce/plugins/table";
import "tinymce/plugins/template";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/textpattern";
import "tinymce/plugins/toc";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/wordcount";

import plugins from './plugins';
import toolbar from './toolbars';

export default {
  name: 'Editor-vue',
  props: {
    value: {
      type: String,
      default: ''
    },
    plugins: {
      type: [String, Array],
      default: ''
    },
    toolbar: {
      type: [String, Array],
      default: ''
    }
  },
  components: {
    Editor
  },
  data() {
    const _this = this;
    return {
      content: '',
      init: {
        language_url: 'static/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: 'static/tinymce/skins/ui/oxide',
        height: 700,
        min_height: 770,
        max_height: 770,
        toolbar_mode: 'wrap',
        plugins: this.plugins.length > 0 ? this.plugins : plugins,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        content_style: 'p { margin: 5px 0 }',
        branding: false,
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;\
          苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;\
          黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;\
          Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;\
          Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;\
          Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;\
          Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;\
          知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC,\
          WenQuanYi Micro Hei, sans-serif;小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif',
        link_list: [
          // { title: '预置链接1', value: 'http://www.tinymce.com' },
          // { title: '预置链接2', value: 'http://tinymce.ax-z.cn' }
        ],
        image_list: [
          // { title: '预置图片1', value: 'https://www.tiny.cloud/images/glyph-tinymce@2x.png' },
          // { title: '预置图片2', value: 'https://www.baidu.com/img/bd_logo1.png' }
        ],
        image_class_list: [
          { title: 'None', value: '' },
          { title: 'Some class', value: 'class-name' }
        ],
        // importcss_append: true,
        // 自定义文件选择器的回调内容
        file_picker_callback: function (callback, value, meta) {
          // if (meta.filetype === 'file') {
          //   callback('https://www.baidu.com/img/bd_logo1.png', { text: 'My text' });
          // }
          // if (meta.filetype === 'image') {
          //   callback('https://www.baidu.com/img/bd_logo1.png', { alt: 'My alt text' });
          // }
          // if (meta.filetype === 'media') {
          //   callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.baidu.com/img/bd_logo1.png' });
          // }
        },
        // 为内容模板插件提供预置模板
        templates: [
          { title: '模板1', description: '介绍文字1', content: '模板内容' },
          { title: '模板2', description: '介绍文字2', content: '<div class="mceTmpl"><span class="cdate">CDATE</span>，<span class="mdate">MDATE</span>，我的内容</div>' }
        ],
        // content_security_policy: "script-src *;",
        extended_valid_elements:'script[src]',
        //
        template_cdate_format: '[CDATE: %m/%d/%Y : %H:%M:%S]',
        template_mdate_format: '[MDATE: %m/%d/%Y : %H:%M:%S]',
        autosave_ask_before_unload: false,
        images_upload_base_path: '/demo',
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value);
          }
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.$emit('input', editor.getContent());
          })
        },
        images_upload_handler: function (blobInfo, succFun, failFun) {
          succFun('/demo/images/img.jpg');
        },
        image_upload_handler: (blobInfo, success, failure) => {
          console.log(failure);
          const img = 'data:image/jpeg;base64,' + blobInfo.base64();

          success(img);
        }
      }
    };
  },
  mounted() {
    tinymce.init({});
  }
};
</script>
