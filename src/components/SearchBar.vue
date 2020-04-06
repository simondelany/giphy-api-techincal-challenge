<template>
    <div class="search-bar">
        
        <form class="search-bar__form" v-on:submit="triggerSearch">
            <div class="block">
                <input id="search-bar" 
                    :value="query"
                    list="suggestions"
                    type="text"
                    autocomplete="off" 
                    @input="updateQuery"/>
                <button type="submit">
                    <img src="https://giphy.com/static/img/search-icon.svg"/>
                </button>
            </div>
            <datalist v-show="suggestedQueries && suggestedQueries.length" id="suggestions">
                <option v-for="(suggestion, index) of suggestedQueries"
                    v-bind:key="index"
                    :value="suggestion.name"/>
            </datalist>
        </form>
        
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store from "../store";

@Component
export default class SearchBar extends Vue {

    @Prop() private msg!: string;
    
    get query() {
        return store.getters.getQuery()
    }

    get suggestedQueries() {
        return store.getters.getSuggested()
    }

    private updateQuery = (e) => {
        store.commit('setQuery', e.target.value)
        store.dispatch('fetchSuggested');
    }

    private triggerSearch() {
        store.dispatch('fetchSearch');
    }
}
</script>

<style scoped lang="scss">

.search-bar {
    height: 2em;

    #back {
        background: white;
        height: 2.3em;
        position: relative;
        width: 67%;
        top: 2.5em;
        display: inline-block;
    }

    .block {
        height: 100%;
        display: block;
        width: 100%;
    }

    &__form {
        height: 100%;
        position: relative;

        input {
            background: #ffffff;
            height: 100%;
            width: 67%;
            border: none;
            text-indent: 1em;
            font-size: 1em;
            text-transform: lowercase;
        }

        button {
            background-color: #2e8ca5;
            display: inline-block;
            height: 106%;
            width: 3em;
            position: absolute;
            border: none;
            padding: 2px;
        }
    }
}
</style>
