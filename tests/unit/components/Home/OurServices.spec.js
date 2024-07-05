import { shallowMount, createLocalVue } from '@vue/test-utils';
import OurServices from '@/components/Home/OurServices.vue';
import { createApp } from 'vue';


describe('OurServices', () => {
    let wrapper;
    it('exists', () => {
        expect(OurServices).toBeDefined();
    });

    it('name matches', () => {
        expect(OurServices.name).toBe('OurServices');
    });
});
