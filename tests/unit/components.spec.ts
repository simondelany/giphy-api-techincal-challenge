import { shallowMount } from "@vue/test-utils";
import GifCard from "@/components/GifCard.vue";
import GifGrid from "@/components/GifGrid.vue";
import SearchBar from "@/components/SearchBar.vue";
import * as testData from "./test-data.js";

describe("GifCard.vue", () => {
  it("renders props.data when passed", () => {
    const data = testData.default.data[0];
    const wrapper = shallowMount(GifCard, {
      propsData: { data }
    });
    wrapper.html()
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe("GifGrid.vue", () => {
  it("renders when passed props for: 'Most Popular'", () => {
    const title = "Most Popular";
    const msg = "Here are some of the most popular GIFs available on GIPHY right now!";
    const contentType = "mostPopular";

    const wrapper = shallowMount(GifGrid, {
      propsData: {
        title,
        msg,
        contentType,
      }
    });
    wrapper.html()
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders when passed props for: 'Search'", () => {
    const title="Search";
    const msg="Search for GIFs on GIPHY!";
    const contentType="searchResults";

    const wrapper = shallowMount(GifGrid, {
      propsData: {
        title,
        msg,
        contentType,
      }
    });
    wrapper.html()
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders when passed props for: 'Random'", () => {
    const title="Random";
    const msg="Here's a random collection of GIFs from GIPHY!";
    const contentType="random";

    const wrapper = shallowMount(GifGrid, {
      propsData: {
        title,
        msg,
        contentType,
      }
    });
    wrapper.html()
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe("SearchBar.vue", () => {
  it("renders", () => {
    const wrapper = shallowMount(SearchBar, {});
    wrapper.html()
    expect(wrapper.html()).toMatchSnapshot();
  });
});
