<script>
export default {
    props: ["tags", "id"],
    data() {
        return {};
    },
}
</script>

<template>
    <div class="tags">
        <div class="tag"  v-for="tag in tags" :class="{isActive : tag.active}" @click="$emit('toggle', id, tag.name)">
            {{ tag.name }}
        </div>
    </div>
</template>

<style scoped>
</style>