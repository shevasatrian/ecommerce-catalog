import ProductDisplay from '@/components/ProductDisplay'
import { mount } from '@vue/test-utils';

test('test click', () => {

    // Arrange
    const wrapper = mount(ProductDisplay, {
        data() {
            return {
                currentIndex: 0
            }
        }
    });

    // Act
    const index_data = wrapper.get('[data-test="currentIndex"]');

    // Assert
    expect(index_data.text()).toContain("0");
})