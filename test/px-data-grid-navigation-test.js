document.addEventListener('WebComponentsReady', function() {
  runTests();
});

function runTests() {

  describe('navigation (paging) component tests', () => {

    let navigation;

    beforeEach((done) => {
      navigation = fixture('simple-navigation');

      Polymer.RenderStatus.afterNextRender(navigation, () => {
        setTimeout(() => { // IE11
          done();
        });
      });
    });

    function getSelectedPageSize() {
      return Number.parseInt(
        navigation.shadowRoot.querySelector('.page-size-select px-dropdown')
          .shadowRoot.querySelector('#label').innerText);
    }

    function getAvailablePageSizes() {
      // wrap return in array since querySelectorAll returns node list not an arrays
      const options = [...navigation.shadowRoot.querySelector('px-dropdown')
        .shadowRoot.querySelectorAll('.dropdown-option__item')];
      return options.map((el) => Number.parseInt(el.innerText));
    }

    it('should display proper page size', (done) => {
      // check init page size
      expect(navigation.pageSize).to.be.eql(getSelectedPageSize());
      // update page size and check
      navigation.pageSize = 20;
      expect(navigation.pageSize).to.be.eql(getSelectedPageSize());
      done();
    });

    it('should display proper user selectable page sizes', (done) => {
      // check init page size
      expect(navigation.selectablePageSizes).to.be.eql(getAvailablePageSizes());
      done();
    });

  });

}
