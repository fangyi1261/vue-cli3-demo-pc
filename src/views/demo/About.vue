<template>
  <div class="about">
    <h1>富文本编辑器</h1>
    <editor></editor>
  </div>
</template>

<script>
import Editor from '../../components/tinymce/Editor.vue';
export default {
  name: 'about',
  components: {
    Editor
  }
};
</script>
