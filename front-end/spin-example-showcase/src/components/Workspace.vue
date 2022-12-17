<script>
import { toRaw } from 'vue';
import { mapActions } from 'vuex'
import WorkspaceContent from './WorkspaceContent.vue';
export default {
    data() {
        return {};
    },
    methods: {
        ...mapActions({
            getListData: 'ExampleList/getListData'
        })
    },
    async mounted() {
        await this.getListData()
    },
    components: { WorkspaceContent }
}
</script>

<template>
    <div class="workspace">
        <WorkspaceContent></WorkspaceContent>
    </div>
</template>

<style scoped>
.workspace {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}
</style>