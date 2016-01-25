import constants from '../src/constants';
import _ from 'lodash';

describe('constants', function() {
    it('should all start with the same prefix', function() {
        const prefix = '@@kandy-redux/';

        _.forEach(constants, (constant) => {
            if(typeof constant === "string") {
                var startsWithPrefix = constant.indexOf(prefix) === 0;
                expect(startsWithPrefix).to.be.true;
            }
        });
    });

    it('should be individually unique', function() {
        // parsed constants will go into this hashmap
        var parsed = {};

        _.forEach(constants, (constant) => {
            expect(parsed[constant]).to.be.undefined;
            parsed[constant] = true;
        });
    });
});
