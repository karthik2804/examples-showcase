<script>
export default {
    data() {
        return {

        }
    },
    props: ["item"],
    methods: {
        openDetailedView(item) {
            this.$store.dispatch('ExampleList/openExample', item)
        }
    },
    computed: {
        isExampleLoading() {
            return this.$store.state.ExampleList.isExampleLoading
        },
    }
}
</script>

<template>
    <div class="card" @click="openDetailedView(item)">
        <div class="title">
            {{ item.title }}
        </div>
        <div class="description">
            {{ item.description }}
        </div>

    </div>
</template>

<style scoped lang="scss">
.card {
    width: 300px;
    height: 300px;
    margin: 0.5rem;
    padding: 1rem;

    .title {
        font-weight: 600;
        padding-bottom: 1rem;
    }

    .description {
        color: gray;
        font-size: 0.9rem;
        flex-grow: 1;
    }
}
</style>