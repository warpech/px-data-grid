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

    it('should display proper values in navigation ui', (done) => {
      expect(navigation.currentPage).to.be.eql(1);
      done();
    });
  });

}
