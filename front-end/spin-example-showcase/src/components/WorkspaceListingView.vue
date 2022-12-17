<script>
import ExampleListing from './ExampleListing/ExampleListing.vue';
import WorkspaceFilter from './ExampleListing/WorkspaceFilter.vue';
export default {
    data() {
        return {};
    },
    components: { WorkspaceFilter, ExampleListing }
}
</script>

<template>
    <div class="list-view-wrapper">
        <WorkspaceFilter></WorkspaceFilter>
        <ExampleListing></ExampleListing>
    </div>
</template>

<style lang=scss>
.list-view-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    overflow-y: auto;
    align-items: center;
}
</style>