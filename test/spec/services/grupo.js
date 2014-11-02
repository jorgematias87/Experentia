'use strict';

describe('Service: Grupo', function () {

  // load the service's module
  beforeEach(module('experentiaWebSiteApp'));

  // instantiate service
  var Grupo;
  beforeEach(inject(function (_Grupo_) {
    Grupo = _Grupo_;
  }));

  it('should do something', function () {
    expect(!!Grupo).toBe(true);
  });

});
