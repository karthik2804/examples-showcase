<script>
import ExampleDetails from './ExampleDetails/ExampleDetails.vue';
import WorkspaceFilter from './ExampleListing/WorkspaceFilter.vue';
import ExampleListing from './ExampleListing/ExampleListing.vue';
import WorkspaceListingView from './WorkspaceListingView.vue';
export default {
    data() {
        return {
        }
    },
    components: { ExampleListing, ExampleDetails, WorkspaceFilter, WorkspaceListingView },
    computed: {
        isListView() {
            return this.$store.state.isListView
        }
    }
}
</script>

<template>
    <div class="workspace-content">
        <router-view v-slot="{ Component, route }">
            <transition :name="route.meta.transitionName || 'zoom-fade'">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<style scoped>
.workspace-content {
    height: 100%;
    width: 100%;
    position: relative;
}

.list-view-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    overflow-y: auto;
    align-items: center;
}

.zoom-fade-enter-active {
    transition: all 0.3s ease-out 0.3s;
}
.zoom-fade-leave-active {
    transition: all 0.3s ease-out;
}

.zoom-fade-enter-from,
.zoom-fade-leave-to {
    opacity: 0;
    filter: blur(3px);
    transform: scale(0.25)
}

.slide-horizontal-leave-active {
    transition: all 0.5s ease-out;
}

.slide-horizontal-enter-active {

    transition: all 0.5s ease-out 0.1s;
}

.slide-horizontal-enter-from,
.slide-horizontal-leave-to {
    transform: translateX(120%);
}
</style>