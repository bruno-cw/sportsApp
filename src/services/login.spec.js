describe('Login Factory', function () {
  var LoginService, httpBackend;

  beforeEach(angular.mock.module('sportsApp.services'));

  beforeEach(inject(function (_LoginService_, $httpBackend) {
    httpBackend = $httpBackend;
    LoginService = _LoginService_;
  }));

  it('should exist', function () {
    expect(LoginService).toBeDefined();
  });

  describe('.get()', function () {

    it('should exist', function () {
      expect(LoginService.get).toBeDefined();
    });

    it('should return a list of materials', function () {
      var data;
      LoginService.get('XXX', '500').then(function (response) {
        data = response;
      });

      httpBackend
        .when('GET', 'http://localhost:63410/api/material/XXX/500')
        .respond(200, [
          {
            'System': 'SGD', 'MATNR': '000000000004005550', 'WERKS': '00A1',
            'LAND1': 'US', 'CHARG': 'LOT001', 'CLABS': 1.000, 'MAKTX': 'CROSSHEAD COMPRESSOR 250KV XPTO',
            'LGORT': '0014', 'Unit Price': '2,334.45', 'Status': 'Available', 'Classification': 'W'
          },
          {
            'System': 'SGD', 'MATNR': '000000000004005551', 'WERKS': '00A1',
            'LAND1': 'US', 'CHARG': 'LOT002', 'CLABS': 2.000, 'MAKTX': 'DAMPENER DISCHARGE',
            'LGORT': '0014', 'Unit Price': '13,500.00', 'Status': 'Available', 'Classification': 'PS'
          },
          {
            'System': 'SGD', 'MATNR': '000000000004005553', 'WERKS': '00A1',
            'LAND1': 'US', 'CHARG': 'LOT003', 'CLABS': 3.000, 'MAKTX': 'KIT VELAN 10300VCKT VALVE REBUILD',
            'LGORT': '0014', 'Unit Price': '45,300.00', 'Status': 'Transferred', 'Classification': 'W'
          }]);
      httpBackend.flush();
      expect(data.length).toBe(3);
    });
  });

}); 