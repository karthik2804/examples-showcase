<script>
export default {
    inject: ["hljs"],
    data() {
        return {}
    },
    methods: {
        toggleCodeConfig() {
            this.$store.commit("ExampleDetail/toggleCodeView", this.isCodeView);
        }
    },
    computed: {
        isCodeView() {
            return this.$store.state.ExampleDetail.isCodeView
        },
        exampleDetailData() {
            return this.$store.state.ExampleDetail.exampleData;
        },
        isExampleLoaded() {
            return this.$store.state.ExampleDetail.isExampleLoaded;
        },
        isLangLoaded() {
            return this.$store.state.ExampleDetail.isLangLoaded;
        }
    }
}
</script>

<template>
    <pre>
        <div class="code-wrapper" v-if="isExampleLoaded && isLangLoaded"><transition name="just-fade" mode="out-in" appear><code v-if="isCodeView" :key="exampleDetailData.code" v-html="hljs.highlightAuto((exampleDetailData.code)).value"></code><code v-else v-html="hljs.highlightAuto((exampleDetailData.config)).value"></code></transition></div>
            <div v-if="!isExampleLoaded && !isLangLoaded" class="placeholder-wrapper">
                <div class="placeholder"></div>
                <div class="placeholder"></div>
                <div class="placeholder"></div>
                <div class="placeholder"></div>
            </div>
            <div v-if="isExampleLoaded && isLangLoaded" class="copy-code">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"/></svg>
            </div>
    </pre>
</template>

<style lang="scss" scoped>
pre {
    max-width: 800px;
    width: 100%;
    min-height: 400px;
    color: $lightplum;
    background-color: #0d203f;
    background-image: linear-gradient(135deg, #0d203f 0%, #10274d 100%);
    border-radius: 0.67rem;
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace;
    font-size: .925rem;
    position: relative;
    display: flex;
    overflow-x: hidden;
    padding: 0;

    .placeholder-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 1.25em 1.5em;


        .placeholder {
            width: 400px;
            height: 0.7rem;
            border-radius: 0.5rem;
            background-color: #eee;
            position: relative;
            overflow: hidden;
            margin-bottom: 0.8rem;
            animation: visbility 0.5s ease-in-out;

            &:nth-child(1) {
                width: 50%;
                background: $lavender;

                &:after {
                    background: linear-gradient(90deg, #eeeeee2a, #d4d4d42c, #eeeeee2a);

                }
            }

            &:nth-child(2) {
                width: 35%;
                background: $lightplum;

                &:after {
                    background: linear-gradient(90deg, #eeeeee4a, #d4d4d44c, #eeeeee4a);
                }
            }

            &:nth-child(3) {
                width: 20%;
                background: $darkolive;

                &:after {
                    background: linear-gradient(90deg, #eeeeee0a, #d4d4d40c, #eeeeee0a);
                }
            }

            &:nth-child(4) {
                width: 30%;
                background: $midgreen;

                &:after {
                    background: linear-gradient(90deg, #eeeeee2a, #d4d4d42c, #eeeeee2a);
                }
            }

            &:after {
                position: absolute;
                content: '';
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                animation: gradient 2s infinite ease-in-out;
            }
        }
    }

    .code-wrapper {
        position: relative;
        width: 100%;
        display: flex;

        code {
            padding: 1.25em 1.5em;
            position: relative;
            width: 100%;
            overflow-x: auto;
        }
    }

    .copy-code {
        position: absolute;
        top: 0.7rem;
        right: 0.7rem;
        border-radius: 0.7rem;
        padding: 0.4rem 0.35rem;
        cursor: pointer;
        background: lighten($darkspace, 10%);
        opacity: 0.7;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;

        >svg {
            fill: #ededed99;
        }

        &:hover {
            background: $darkspace;
        }

        &.is-success {
            border: 1px solid;
            border-color: #18d1a5;
        }
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
</style>