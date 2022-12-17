<script>
import Header from "./components/common/Header.vue"
import Workspace from "./components/Workspace.vue"
export default {
  components: {
    Header,
    Workspace
  }
}
</script>

<template>
  <div class="main">
    <Header></Header>
    <Workspace></Workspace>
    </div>
</template>

<style scoped>
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
</style>
