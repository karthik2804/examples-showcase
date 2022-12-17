<script>
import CodeBlock from './CodeBlock.vue';
import Tabs from './Tabs.vue'

export default {
    inject: ["hljs"],
    data() {
        return {
            isCodeView: true,
            showModal: false
        };
    },
    methods: {
        toggleView() {
            this.$store.commit("toggleView", true);
        },
        toggleCodeConfig() {
            this.$store.commit("ExampleDetail/toggleCodeView", this.isCodeView);
        }
    },
    computed: {
        exampleDetailData() {
            return this.$store.state.ExampleDetail.exampleData;
        },
        isExampleLoaded() {
            return this.$store.state.ExampleDetail.isExampleLoaded;
        },
        isLangLoaded() {
            return this.$store.state.ExampleDetail.isLangLoaded;
        }
    },
    components: { Tabs, CodeBlock },
    async mounted() {
        this.$store.commit("toggleView", false)
        this.$store.commit("ExampleDetail/toggleCodeView", true);
        if (!this.isExampleLoaded) {
            this.$store.dispatch('ExampleDetail/loadApp', this.$route.params.id)
        }
    },
}
</script>

<template>
    <div class="example-details">

        <div class="details-wrapper">
            <div class="nav">
                <div @click="toggleView">
                    ❮ Back
                </div>
                <div class="overlay" v-if="showModal" @click="showModal = false">
                    <div class="modal1">
                        <h3>The abiity to deploy the examples to fermyon cloud is coming soon!</h3>
                    </div>
                </div>
                <button class="button is-info" @click="showModal = true">Deploy to Cloud</button>
            </div>
                <div class="details-content">
                    <div class="header">
                        <div class="title">
                            <span>{{ this.$route.params.id }}</span>
                        </div>
                        <div class="description">
                            <transition name="just-fade" mode="out-in">
                                <span v-if="isExampleLoaded">
                                    {{ exampleDetailData.description }}
                                </span>
                                <div v-else>
                                    <div class="placeholder long-placeholder"></div>
                                    <div class="placeholder short-placeholder"></div>
                                </div>
                            </transition>
                        </div>
                    </div>
                    <div class="controls">
                        <div class="toggle">
                            <span>Config</span>
                            <input type="checkbox" id="toggle_button" v-model="isCodeView" @change="toggleCodeConfig">
                            <span>Code</span>
                        </div>
                        <a :href=exampleDetailData.gitUrl target="_blank" class=".explore button is-success">
                            Explore on Github
                        </a>
                    </div>
                    <Tabs></Tabs>
                    <CodeBlock></CodeBlock>
                </div>
        </div>
    </div>

    <!-- modal -->
</template>

<style lang="scss" scoped>
.example-details {
    position: absolute;
    height: 100%;
    width: 100%;
    padding: 1rem;
    background: white;
}

.details-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    align-items: center;

    .nav {
        width: 100%;
        max-width: 1200px;
        font-size: 0.9rem;
        cursor: grab;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .details-content {
        width: 100%;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        overflow: auto;
        justify-content: center;
        align-items: center;

        @keyframes gradient {
            from {
                left: 0%;
            }

            to {
                left: 100%;
            }
        }

        .header {
            padding: 1rem;
            max-width: 800px;
            margin-bottom: 2rem;

            .title {
                width: 100%;
                display: flex;
                justify-content: center;

                .placeholder {
                    width: 200px;
                    height: 2.1rem;
                    border-radius: 1rem;
                    margin-bottom: 2rem;
                    background-color: #eee;
                    position: relative;
                    overflow: hidden;

                    &:after {
                        position: absolute;
                        content: '';
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        background: linear-gradient(90deg, #eee, #d4d4d4, #eee);
                        animation: gradient 1s infinite ease-in-out;
                    }
                }
            }

            .description {
                text-align: center;
                font-size: 0.9rem;
                min-height: 3rem;

                .placeholder {
                    width: 400px;
                    height: 1rem;
                    border-radius: 0.8rem;
                    margin-bottom: 2rem;
                    background-color: #eee;
                    position: relative;
                    overflow: hidden;
                    margin-bottom: 0.6rem;

                    &:after {
                        position: absolute;
                        content: '';
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        background: linear-gradient(90deg, #eee, #d4d4d4, #eee);
                        animation: gradient 1s infinite ease-in-out;
                    }

                    &.long-placeholder {
                        width: 500px;
                    }
                }
            }
        }

        .controls {
            max-width: 800px;
            display: flex;
            width: 100%;
            justify-content: space-between;
            padding: 1rem;

            .toggle {
                display: flex;
                align-items: center;
            }

            .check-box {
                transform: scale(2);
            }

            input[type="checkbox"] {
                position: relative;
                appearance: none;
                width: 40px;
                height: 20px;
                background: $colablue;
                border-radius: 50px;
                box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                transition: 0.4s;
            }

            input:checked[type="checkbox"] {
                background: $midgreen;
            }

            input[type="checkbox"]::after {
                position: absolute;
                content: "";
                width: 20px;
                height: 20px;
                top: 0;
                left: 0;
                background: #fff;
                border-radius: 50%;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
                transform: scale(1.1);
                transition: 0.4s;
            }

            input:checked[type="checkbox"]::after {
                left: 50%;
            }

            input {
                margin: 0.5rem;
            }

            span {
                font-size: 0.9rem;
            }
        }
    }
}

@keyframes gradient {
    from {
        left: -100%;
    }

    to {
        left: 100%;
    }
}

@keyframes visbility {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.just-fade-enter-active {
    transition: all 0.5s ease-in;

    code {
        overflow: hidden;
    }
}

.just-fade-leave-active {
    transition: all 0.3s ease-in;

    code {
        overflow: hidden;
    }
}


.just-fade-enter-from,
.just-fade-leave-to {
    opacity: 0;
}

.overlay {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(3px);
}

.modal1 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 200px;
    margin: 0 auto;
    padding: 20px 30px;
    background-color: #fff;

    h3 {
        text-align: center;
    }
}
</style>