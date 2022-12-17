<script>
import Tags from './Tags.vue';

export default {
    data() {
        return {
        }
    },
    methods: {
        test(id, name) {
            if (id == "langSelector"){
                this.$store.commit('ExampleList/toggleLangFilter', name)
            }
        }
    },
    components: { Tags },
    computed: {
        langs() {
            return Array.from(this.$store.state.ExampleList.tags).map(k => {
                return {
                    name: k,
                    active: !this.$store.state.ExampleList.langFilter.has(k)
                }
            })
        }
    }
}
</script>

<template>
    <div class="workspace-filter">
        <div class="filter">
            <div>Langs</div>
            <Tags :tags=langs @toggle="test" :id="'langSelector'"></Tags>
        </div>
        <div class="filter">Triggers</div>
        
    </div>
</template>

<style scoped>
.workspace-filter {
    display: flex;
    width: 100%;
    position: relative;
    padding: 1rem;
    z-index: 10;
}

.filter {
    width: 50%;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>