<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  // position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

.el-pagination {
  text-align: center;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #ff742f;
}
.el-pagination.is-background .el-pager li:not(.disabled).hover {
  color: black;
}

</style>
