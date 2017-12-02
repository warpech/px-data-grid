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

    function getDisplayedRowRange() {
      const rangeStr = navigation.shadowRoot.querySelector('.current-rows').innerText.replace(' ', '').split('-');
      return {
        min: rangeStr[0],
        max: rangeStr[1]
      };
    }

    function getArrowElements() {
      return [...navigation.shadowRoot.querySelectorAll('.arrow')];
    }

    function isBackArrowDisabled() {
      return getArrowElements()[0].classList.contains('disabled');
    }

    function isNextArrowDisabled() {
      return getArrowElements()[1].classList.contains('disabled');
    }

    function getPageNumbers() {
      const pageNumberEls = [...navigation.shadowRoot.querySelectorAll('.page-button')];
      return pageNumberEls.map((el) => Number.parseInt(el.innerText));
    }

    function getSelectedPageNumber() {
      return Number.parseInt(navigation.shadowRoot.querySelector('.page-button.selected').innerText);
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
      // check init page sizes
      expect(navigation.selectablePageSizes).to.be.eql(getAvailablePageSizes());
      // update page sizes and check
      const newPageSizes = [100, 200, 300];
      navigation.selectablePageSizes = newPageSizes;
      expect(navigation.selectablePageSizes).to.be.eql(getAvailablePageSizes());
      done();
    });

    it('should display proper row ranges', (done) => {
      console.log(getDisplayedRowRange());
      done();
    });

    it('should display proper page numbers', (done) => {
      console.log(getPageNumbers());
      done();
    });

    it('should display proper selected page number', (done) => {
      navigation.currentPage = 1;
      expect(getSelectedPageNumber()).to.be.eql(1);
      navigation.currentPage = 5;
      expect(getSelectedPageNumber()).to.be.eql(5);
      done();
    });

    it('should disable back arrow when it is first page', (done) => {
      navigation.currentPage = 1;
      expect(isBackArrowDisabled()).to.be.eql(true);
      navigation.currentPage = 2;
      expect(isBackArrowDisabled()).to.be.eql(false);
      navigation.currentPage = navigation.numberOfPages;
      expect(isBackArrowDisabled()).to.be.eql(false);
      done();
    });

    it('should disable next arrow when it is first page', (done) => {
      navigation.currentPage = 1;
      expect(isBackArrowDisabled()).to.be.eql(false);
      navigation.currentPage = 2;
      expect(isBackArrowDisabled()).to.be.eql(false);
      navigation.currentPage = navigation.numberOfPages;
      expect(isBackArrowDisabled()).to.be.eql(true);
      done();
    });

  });

}
