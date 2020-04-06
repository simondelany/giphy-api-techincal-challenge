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
        randomCache: [

        ],
        random: [

        ],
        loadingPopular: true,
        loadingSearch: false, // search doesn't start loading until it has a query
        loadingRandom: true,
        loadingRandomCache: false,
        query: '',
        suggested: '',
        batchSize: 10,
    },
    mutations: {
        setMostPopular(state, data) {
            state.mostPopular = data;
        },
        cleanMostPopular(state) {
            const now = new Date();
            state.mostPopular = state.mostPopular.filter((item: any) => {
                return now <= item.expiredFrom;
            });
            console.log("cleaned data: mostPopular")
        },
        updateRandomCache(state, newData) {
            state.randomCache = [].concat(state.randomCache, newData);
        },
        clearRandomCache(state) {
            state.randomCache = [];
        },
        nextRandomBatch(state, newBatch) {
            state.random = [].concat(state.random, newBatch);
        },
        setSearchResults(state, data) {
            state.searchResults = data;
        },
        cleanSearchResults(state) {
            const now = new Date();
            state.searchResults = state.searchResults.filter((item: any) => {
                return now <= item.expiredFrom;
            });
            console.log("cleaned data: searchResults")
        },
        setLoadingRandom(state, loading) {
            state.loadingRandom = loading;
        },
        setLoadingRandomCache(state, loading) {
            state.loadingRandomCache = loading;
        },
        setSuggested(state, data) {
            state.suggested = data
        },
        setQuery(state, value) {
            state.query = value;
        }
    },
    actions: {
        fetchMostPopular(store) {
            // fetch data from GIPHY trending endpoint

            // api.giphy.com/v1/gifs/trending
            const requestURL = `${process.env.VUE_APP_GIPHYAPI_MOST_POPULAR}?api_key=${process.env.VUE_APP_GIPHYAPI_KEY}&limit=25&rating=G`

            // data expires in 1 hour
            const ttl = 60 * 60 * 1000;

            //TODO: switch to Axios.post
            Axios.get(requestURL).then(res => {
                const expiredFrom = new Date()
                expiredFrom.setTime(expiredFrom.getTime() + ttl);
                let data: any = { "data": [] };

                if (res.status === 200) {
                    data = res.data.data.map(item => {
                        // we want to set an expiry on each item
                        item.expiredFrom = expiredFrom;
                        return item;
                    });
                }

                // set the data in the store
                this.commit('setMostPopular', data);

                // set delayed check on data freshness
                window.setTimeout(() => {
                    this.commit('cleanMostPopular')
                }, ttl)
            })
        },
        fetchSearch(store) {
            // fetch GIFs from GIPHY that math a given search term
            // data expires in 1 minute
            const ttl = 60 * 1000;
            // api.giphy.com/v1/gifs/trending
            const requestURL = `${process.env.VUE_APP_GIPHYAPI_SEARCH}?q=${store.state.query}&api_key=${process.env.VUE_APP_GIPHYAPI_KEY}`

            //TODO: switch to Axios.post
            Axios.get(requestURL).then(res => {
                const expiredFrom = new Date()
                expiredFrom.setTime(expiredFrom.getTime() + ttl);
                let data: any = { "data": [] };

                if (res.status === 200) {
                    data = res.data.data.map(item => {
                        // we want to set an expiry on each item
                        item.expiredFrom = expiredFrom;
                        return item;
                    });
                }

                // set the data in the store
                this.commit('setSearchResults', data);

                // set delayed check on data freshness
                window.setTimeout(() => {
                    this.commit('cleanSearchResults');
                }, ttl)
            })
        },
        fetchRandomCache(store) {
            this.commit('setLoadingRandomCache', true);
            // fetch random GIFs from GIFY
            // send $count random API endpoint requests
            const requests = new Array<Promise<void>>();

            const batches = 10;

            // We start getting all requests
            for (let i = 0; i < batches; i++) { // TODO: switch to Axios.post
                requests.push(
                    store.dispatch('fetchRandomBatch')
                )
            }

            // we will wait for all requests to complete
            Promise.all(requests).then(() => {
                this.commit('setLoadingRandomCache', false);
            })
        },
        fetchRandomBatch(store) {
            // fetch random GIFs from GIFY

            // api.giphy.com/v1/gifs/trending
            const requestURL = `${process.env.VUE_APP_GIPHYAPI_RANDOM}?api_key=${process.env.VUE_APP_GIPHYAPI_KEY}&rating=G`

            //const data = new Array<any>();
            const newData: Array<any> = []

            // send $count random API endpoint requests
            const requests = new Array<Promise<void>>();

            // if we start getting all requests
            for (let i = 0; i < store.state.batchSize; i++) { // TODO: switch to Axios.post
                requests.push(
                    Axios.get(requestURL).then(res => {
                        if (res.status === 200) {
                            newData.push(res.data.data);
                        }
                    })
                )
            }

            // we will wait for all requests to complete
            Promise.all(requests).then(() => {
                // set the data in the store
                this.commit('updateRandomCache', newData);
                if (!store.state.random.length) {
                    this.dispatch('fetchNextRandomBatch');
                }
            });
        },
        async fetchNextRandomBatch(store) {
            this.commit('setLoadingRandom', true);

            if (!store.state.loadingRandomCache) {
                await this.dispatch('fetchRandomBatch')
            }
            const startAt = store.state.random.length;
            const endAt =  startAt + store.state.batchSize;
            const newBatch = store.state.randomCache.slice(startAt, endAt);

            store.commit('nextRandomBatch', newBatch);

            store.commit('setLoadingRandom', false);
        },
        fetchSuggested(store) {
            // fetch data from GIPHY trending endpoint

            // api.giphy.com/v1/gifs/trending
            const requestURL = `${process.env.VUE_APP_GIPHYAPI_AUTOCOMPLETE}?q=${store.state.query}&api_key=${process.env.VUE_APP_GIPHYAPI_KEY}`

            //TODO: switch to Axios.post
            Axios.get(requestURL).then(res => {
                let data: any = { "data": [] };

                if (res.status === 200) {
                    data = res.data.data
                }

                // set the data in the store
                this.commit('setSuggested', data);
            })
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
        },
        getSuggested: (state) =>  () => {
            return state.suggested;
        },
        getQuery: (state) => () => {
            return state.query;
        }
    },
    modules: {}
});
