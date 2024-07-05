import { shallowMount } from '@vue/test-utils'
import NotFoundPage from '@/components/NotFound/NotFoundPage.vue'

describe('NotFoundPage', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(NotFoundPage);
    });

    it('exists', () => {
        expect(NotFoundPage).toBeDefined();
    });

    it('name matches', () => {
        expect(NotFoundPage.name).toBe('NotFoundPage');
    });
});
