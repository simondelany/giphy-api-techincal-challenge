import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import App from "@/App.vue";

const localVue = createLocalVue();
const router = new VueRouter();

localVue.use(VueRouter);

describe("App.vue", () => {
    it("renders", () => {
        const wrapper = shallowMount(App, {
            localVue,
            router
        });
        wrapper.html()
        expect(wrapper.html()).toMatchSnapshot();
    });
});