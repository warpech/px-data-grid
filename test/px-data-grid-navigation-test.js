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
        min: rangeStr[0].trim(),
        max: rangeStr[1].trim()
      };
    }

    function getArrowElements() {
      return [...navigation.shadowRoot.querySelectorAll('.arrow')];
    }

    function isBackArrowDisabled() {
      return getArrowElements()[0].getAttribute('disabled') !== null;
    }

    function isNextArrowDisabled() {
      return getArrowElements()[1].getAttribute('disabled') !== null;
    }

    function getPageNumbers() {
      const pageNumberEls = [...navigation.shadowRoot.querySelectorAll('.page-number')];
      return pageNumberEls.map((el) => Number.parseInt(el.innerText));
    }

    function getSelectedPageNumber() {
      return Number.parseInt(navigation.shadowRoot.querySelector('.page-number.selected').innerText);
    }

    it('should display proper page size', (done) => {
      // check init page size
      expect(navigation.pageSize).to.be.eql(getSelectedPageSize());
      // update page size and check
      navigation.pageSize = 20;
      Polymer.flush();
      expect(navigation.pageSize).to.be.eql(getSelectedPageSize());
      done();
    });

    it('should display proper user selectable page sizes', (done) => {
      // check init page sizes
      expect(getAvailablePageSizes()).to.be.eql([10, 20, 30]);
      // update page sizes and check
      const pageSizes2 = [100, 200, 300];
      navigation.selectablePageSizes = pageSizes2;
      Polymer.flush();
      setTimeout(() => expect(getAvailablePageSizes()).to.be.eql(pageSizes2));
      done();
    });

    it('should display proper row ranges', (done) => {
      expect(getDisplayedRowRange()).to.be.eql({
        min: '1',
        max: '10'
      });
      // page 2, page size 20
      navigation.currentPage = 2;
      navigation.pageSize = 20;
      Polymer.flush();
      expect(getDisplayedRowRange()).to.be.eql({
        min: '21',
        max: '40'
      });
      done();
    });

    it('should display proper page numbers when first page is selected', (done) => {
      expect(getPageNumbers()).to.be.eql([1, 2, 3, 4, 5, 6, 7, NaN, 50]);
      navigation.currentPage = 10;
      Polymer.flush();
      expect(getPageNumbers()).to.be.eql([1, NaN, 8, 9, 10, 11, 12, NaN, 50]);
      navigation.currentPage = 50;
      Polymer.flush();
      expect(getPageNumbers()).to.be.eql([1, NaN, 44, 45, 46, 47, 48, 49, 50]);
      done();
    });

    it('should display proper selected page number', (done) => {
      // page 1
      expect(getSelectedPageNumber()).to.be.eql(1);
      // page 5
      navigation.currentPage = 5;
      Polymer.flush();
      expect(getSelectedPageNumber()).to.be.eql(5);
      done();
    });

    it('should disable back arrow when it is first page', (done) => {
      // page 1
      expect(isBackArrowDisabled()).to.be.eql(true);
      // page 2
      navigation.currentPage = 2;
      Polymer.dom.flush();
      expect(isBackArrowDisabled()).to.be.eql(false);
      // last page
      navigation.currentPage = navigation.numberOfPages;
      Polymer.flush();
      expect(isBackArrowDisabled()).to.be.eql(false);
      done();
    });

    it('should disable next arrow when it is first page', (done) => {
      // page 1
      expect(isNextArrowDisabled()).to.be.eql(false);
      // page 2
      navigation.currentPage = 2;
      Polymer.flush();
      expect(isNextArrowDisabled()).to.be.eql(false);
      // last page
      navigation.currentPage = navigation.numberOfPages;
      Polymer.flush();
      expect(isNextArrowDisabled()).to.be.eql(true);
      done();
    });

  });

}
