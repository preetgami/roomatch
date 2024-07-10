import { shallowMount } from "@vue/test-utils";
import SignUpScroller from "@/components/Home/SignUpScroller.vue";

describe("SignUpScroller", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SignUpScroller);
  });

  it("exists", () => {
    expect(SignUpScroller).toBeDefined();
  });

  it("name matches", () => {
    expect(SignUpScroller.name).toBe("SignUpScroller");
  });
});
