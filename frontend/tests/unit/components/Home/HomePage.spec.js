import { shallowMount } from '@vue/test-utils';
import HomePage from '@/components/Home/HomePage.vue';

describe('Homepage', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(HomePage);
    });

    it('exists', () => {
        expect(HomePage).toBeDefined();
    });

    it('name matches', () => {
        expect(HomePage.name).toBe('HomePage');
    });

    it('snapshot matches', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });
});
