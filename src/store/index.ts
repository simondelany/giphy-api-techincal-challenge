import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        mostPopular: [

        ],
        searchResults: [

        ],
        random: [

        ],
        loadingPopular: false,
        loadingSearch: false,
        loadingRandom: true,
    },
    mutations: {
        setMostPopular(state, data) {
            state.mostPopular = data;
        },
        setRandom(state, data) {
            state.random = data;
            state.loadingRandom = false;
            console.log("random results", state.random.length)
        },
        setLoadingRandom(state, loading) {
            state.loadingRandom = loading;
        }
    },
    actions: {
        fetchMostPopular(state) {
            // fetch data from GIPHY trending endpoint

            // api.giphy.com/v1/gifs/trending
            const requestURL = `${process.env.VUE_APP_GIPHYAPI_MOST_POPULAR}?api_key=${process.env.VUE_APP_GIPHYAPI_KEY}&limit=10&rating=G`

            //TODO: switch to Axios.post
            Axios.get(requestURL).then(res => {
                let data: any = { "data": [] };

                if (res.status === 200) {
                    data = res.data.data
                }

                // set the data in the store
                this.commit('setMostPopular', data);
            })
        },
        fetchSearch(state) {
            // fetch GIFs from GIPHY that math a given search term
        },
        async fetchRandom(store) {
            this.commit('setLoadingRandom', true);
            // fetch random GIFs from GIFY

            // api.giphy.com/v1/gifs/trending
            const requestURL = `${process.env.VUE_APP_GIPHYAPI_RANDOM}?api_key=${process.env.VUE_APP_GIPHYAPI_KEY}&rating=G`

            const data = new Array<any>();

            // send $count random API endpoint requests
            const requests = new Array<Promise<void>>();

            const count = 100;

            // if we start getting all requests
            for (let i = 0; i < count; i++) { // TODO: switch to Axios.post
                requests.push(
                    Axios.get(requestURL).then(res => {
                        if (res.status === 200) {
                            data.push(res.data.data);
                        }
                        // we want to update the store periodically to allow lazy loading in batches (10 results)
                        if (data.length % 10 === 0) {
                            // set the data in the store
                            this.commit('setRandom', data)
                        }
                    })
                )
            }

            // we will wait for all requests to complete
            await Promise.all(requests)

            // although we have been committing periodically, we should ensure all requests have been commited to the store
            if (this.state.random.length !== data.length) {
                // set the data in the store
                this.commit('setRandom', data)
            }
        },
        async fetchNextRandomBatch(store) {
            this.commit('setLoadingRandom', true);
            // fetch random GIFs from GIFY

            // api.giphy.com/v1/gifs/trending
            const requestURL = `${process.env.VUE_APP_GIPHYAPI_RANDOM}?api_key=${process.env.VUE_APP_GIPHYAPI_KEY}&rating=G`

            //const data = new Array<any>();
            const data: Array<any> = JSON.parse(JSON.stringify(store.state.random));

            // send $count random API endpoint requests
            const requests = new Array<Promise<void>>();

            const count = 10;

            // if we start getting all requests
            for (let i = 0; i < count; i++) { // TODO: switch to Axios.post
                requests.push(
                    Axios.get(requestURL).then(res => {
                        if (res.status === 200) {
                            data.push(res.data.data);
                        }
                    })
                )
            }

            // we will wait for all requests to complete
            await Promise.all(requests)

            // set the data in the store
            this.commit('setRandom', data)
        }
    },
    getters: {
        getSliceRandom: (state) => (startIndex, endIndex) => {
            return state.random.slice(startIndex, endIndex + 1);
        },
        checkLoading: (state) => (contentType) => {
            let loading;
            switch (contentType) {
                case 'mostPopular':
                    loading = state.loadingPopular;
                    break;
                case 'searchResults':
                    loading = state.loadingSearch;
                    break;
                case 'random':
                    loading = state.loadingRandom;
                    break;
            }
            return loading
        }
    },
    modules: {}
});
