<script>
import Card from "./Card.vue"
export default {
    data() { return {} },
    components: { Card },
    computed: {
        items() {
            let SelectedTags = [...this.$store.state.ExampleList.tags].filter(k => {
                return !this.$store.state.ExampleList.langFilter.has(k)
            })
            SelectedTags = new Set(SelectedTags)
            return this.$store.state.ExampleList.listData.filter(k => {
                return k.tags.some(tag => {
                    console.log(tag)
                    return SelectedTags.has(tag)
                })
            })
        }
    }
}
</script>

<template>
    <transition-group name="card-list" tag="div" class="cards" appear>
        <Card v-for="item in items" :item="item" v-bind:key="item.title"></Card>
    </transition-group>
</template>

<style scoped>
.cards {
    flex-grow: 1;
    max-width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.card-list-enter-active, .card-list-leave-active {
  transition: all 0.5s;
}
.card-list-leave-active {
    position: absolute;
}
.card-list-enter-from,
.card-list-leave-to
    {
    opacity: 0;
    scale: 0;
    transform: translateY(30px);
}

.card-list-move {
    transition: transform 0.5s;
}
</style>