import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App.vue", () => {
    it("renders", () => {
        const wrapper = shallowMount(App, {});
        wrapper.html()
        expect(wrapper.html()).toMatchSnapshot();
    });
});