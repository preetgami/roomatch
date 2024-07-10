import { shallowMount } from "@vue/test-utils";
import TopHomePage from "@/components/Home/TopHomePage.vue";

describe("TopHomePage", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TopHomePage);
  });

  it("exists", () => {
    expect(TopHomePage).toBeDefined();
  });

  it("name matches", () => {
    expect(TopHomePage.name).toBe("TopHomePage");
  });
});
