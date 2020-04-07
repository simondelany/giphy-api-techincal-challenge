import { shallowMount } from "@vue/test-utils";
import MostPopular from "@/views/MostPopular.vue";
import Random from "@/views/Random.vue";
import Search from "@/views/Search.vue";

describe("MostPopular.vue", () => {
    it("renders", () => {
        const wrapper = shallowMount(MostPopular, {});
        wrapper.html()
        expect(wrapper.html()).toMatchSnapshot();
    });
});

describe("Random.vue", () => {
    it("renders", () => {
        const wrapper = shallowMount(Random, {});
        wrapper.html()
        expect(wrapper.html()).toMatchSnapshot();
    });
});

describe("Search.vue", () => {
    it("renders", () => {
        const wrapper = shallowMount(Search, {});
        wrapper.html()
        expect(wrapper.html()).toMatchSnapshot();
    });
});
