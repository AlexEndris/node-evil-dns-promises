var dns = require('dns');
var expect = require('chai').expect;
var evilDNS = require('../evil-dns-promises');

describe('The clear method', function () {
    it('removes all DNS lookup overrides', function (done) {
        evilDNS.add('nodejs.org', '1.2.3.4');

        evilDNS.clear();

        dns.lookup('nodejs.org', function (err, address) {
            expect(address).to.not.equal('1.2.3.4');
            done();
        });
    });
    
    it('removes all DNS promises lookup overrides', async function () {
        evilDNS.add('nodejs.org', '1.2.3.4');

        evilDNS.clear();

        return dns.promises.lookup('nodejs.org')
        .then(result => {
            expect(result.address).to.not.equal('1.2.3.4');
        });
    });
});
