describe('Landing page test', function() {
    it('verify title is correct', function() {
        return browser
            .url('/')
            .getTitle().should.be.equal('Nøglehåndtering');
    });

    it('should contain an email field in form', function() {
        return browser
            .url('/')
            .getHTML('form').should.include('Email');
    });
});
