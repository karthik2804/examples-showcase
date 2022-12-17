import { createApp, toRaw } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'

import { HighlightJS as hljs } from 'highlight.js'

import './static/css/styles.css'

const ExampleList = {
    state() {
        return {
            isExampleListLoaded: false,
            listData: [],
            tags: new Set(),
            langFilter: new Set()
        }
    },
    mutations: {
        ExampleListLoaded(state) {
            state.isExampleListLoaded = true
        },
        updateLists(state, payload) {
            state.listData = payload
        },
        updateTags(state) {
            state.listData.map(k => {
                k.tags.map(j => state.tags.add(j))
            })
        },
        toggleLangFilter(state, payload) {
            state.langFilter.has(payload) ? state.langFilter.delete(payload) : state.langFilter.add(payload)
        }
    },
    actions: {
        async getListData({ commit }) {
            let response = await fetch(store.state.apiUrl + "/examples/data.json")
            let data = await response.json()
            commit('updateLists', data)
            commit('updateTags',)
            commit('ExampleListLoaded')
        },
        async openExample({ commit }, payload) {
            this.commit('ExampleDetail/exampleLoaded', false)
            store.dispatch('ExampleDetail/fetchExampleData', payload).then(data => {
                this.commit('ExampleDetail/exampleLoaded', true)
            this.commit('ExampleDetail/langLoaded', true)

            })
            router.push("/detail/" + payload.title)
            this.commit('toggleView', false)

        }
    },
    getters: {},
    namespaced: true
}

const ExampleDetail = {
    state() {
        return {
            isCodeView: true,
            isExampleLoaded: false,
            isLangLoaded: false,
            exampleData: {},
            lang2src: {
                "js": "/src/index.js",
                "rust": "/src/lib.rs"
            }
        }
    },
    mutations: {
        toggleCodeView(state, data) {
            state.isCodeView = data
        },
        exampleLoaded(state, bool) {
            state.isExampleLoaded = bool
        },
        langLoaded(state, bool) {
            state.isLangLoaded = bool
        }
    },
    actions: {
        async fetchExampleData({ commit, state }, payload) {
            let example = payload.title
            let defaultLang = payload.langs[0]
            let getCode = new Promise((resolve, reject) => {
                fetch(store.state.apiUrl + "/examples/" + example + "/" + defaultLang + state.lang2src[defaultLang])
                    .then(response => response.text())
                    .then(data => {
                        state.exampleData = {
                            title: example,
                            description: payload.description,
                            code: data,
                            langs: payload.langs,
                            activeLang: defaultLang,
                            gitUrl: "https://github.com/karthik2804/examples/blob/add_api_generation_script/examples/" + example + "/" + defaultLang
                        }
                        resolve()
                    })
            })
            let getConfig = new Promise((resolve, reject) => {
                setTimeout(() => {
                    state.exampleData.config = "# Some random spin.toml\nspin_version = \"1\""
                    resolve();
                }, 1000);
            })
            return Promise.all([getCode, getConfig]).then(data => { })
        },
        async getOtherLang({ commit, state }, lang) {
            let example = state.exampleData.title
            this.commit('ExampleDetail/langLoaded', false)
            fetch(store.state.apiUrl + "/examples/" + example + "/" + lang + state.lang2src[lang])
                .then(response => response.text())
                .then(data => {
                    state.exampleData.code = data
                    state.exampleData.activeLang = lang
                    state.exampleData.gitUrl = "https://github.com/karthik2804/examples/blob/add_api_generation_script/examples/" + example + "/" + lang
                    this.commit('ExampleDetail/exampleLoaded', true)
                    this.commit('ExampleDetail/langLoaded', true)
                })
        },
        async loadApp({ commit, state }, id) {
            await store.dispatch('ExampleList/getListData')
            let payload = [...store.state.ExampleList.listData].filter(k => {
                return k.title == id
            })
            payload = toRaw(payload[0])
            await store.dispatch('ExampleDetail/fetchExampleData', payload)
            this.commit('ExampleDetail/exampleLoaded', true)
            this.commit('ExampleDetail/langLoaded', true)
        }
    },
    namespaced: true

}

const store = createStore({
    state() {
        return {
            isListView: true,
            // apiUrl: location.protocol + '//' + location.host + location.pathname+ "api"
            apiUrl: "http://localhost:3000/api"
        }
    },
    mutations: {
        toggleView(state, bool) {
            state.isListView = bool
            if (state.isListView) {
                router.push("/")
            }
        }
    },
    modules: {
        ExampleList: ExampleList,
        ExampleDetail: ExampleDetail
    }
})

const app = createApp(App)

app.provide('hljs', hljs)
app.use(store)
app.use(router)
app.mount('#app')
