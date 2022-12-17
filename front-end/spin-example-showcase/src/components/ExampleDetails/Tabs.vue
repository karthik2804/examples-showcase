<script>
export default {
    data() {
        return {}
    },
    methods: {
        isActive(tab) {
            return tab == this.activeLang
        },
        switchLang(tab) {
            this.$store.dispatch('ExampleDetail/getOtherLang', tab)
        }
    },
    computed: {
        tabs() {
            return this.$store.state.ExampleDetail.exampleData.langs
        },
        activeLang() {
            return this.$store.state.ExampleDetail.exampleData.activeLang
        },
        isCodeView() {
            return this.$store.state.ExampleDetail.isCodeView
        }
    }
}
</script>

<template>
    <div class="wrapper">
        <div class="tabs is-boxed">
            <ul>
                <TransitionGroup name="fade" mode="out-in">
                        <li v-if="isCodeView" v-for="tab in tabs" :class="{ 'is-active': isActive(tab) }"
                            @click="switchLang(tab)"><a>{{ tab
                            }}</a>
                        </li>
                    <li v-else class="is-active"><a>spin.toml</a></li>
                </TransitionGroup>
            </ul>
        </div>
    </div>
</template>

<style lang=scss>
.wrapper {
    width: 100%;
    max-width: 800px;
    height: 2.6rem;
    padding: 0 0.5rem 0 0.5rem;

    .tabs {
        margin-bottom: 0;
    }
}


.fade-enter-active {
  transition: all 0.3s ease-in 0.3s;
}
.fade-leave-active {
  transition: all 0.3s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(2.6rem);
}
</style>