"use strict";

var _require = require('../src/model'),
    Profile = _require.Profile,
    Contract = _require.Contract,
    Job = _require.Job;
/* WARNING THIS WILL DROP THE CURRENT DATABASE */


(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(seed());

        case 3:
          _context.next = 8;
          break;

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 5]]);
})();

function seed() {
  return regeneratorRuntime.async(function seed$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Profile.sync({
            force: true
          }));

        case 2:
          _context2.next = 4;
          return regeneratorRuntime.awrap(Contract.sync({
            force: true
          }));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(Job.sync({
            force: true
          }));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(Promise.all([Profile.create({
            id: 1,
            firstName: 'Harry',
            lastName: 'Potter',
            profession: 'Wizard',
            balance: 1150,
            type: 'client'
          }), Profile.create({
            id: 2,
            firstName: 'Mr',
            lastName: 'Robot',
            profession: 'Hacker',
            balance: 231.11,
            type: 'client'
          }), Profile.create({
            id: 3,
            firstName: 'John',
            lastName: 'Snow',
            profession: 'Knows nothing',
            balance: 451.3,
            type: 'client'
          }), Profile.create({
            id: 4,
            firstName: 'Ash',
            lastName: 'Kethcum',
            profession: 'Pokemon master',
            balance: 1.3,
            type: 'client'
          }), Profile.create({
            id: 5,
            firstName: 'John',
            lastName: 'Lenon',
            profession: 'Musician',
            balance: 64,
            type: 'contractor'
          }), Profile.create({
            id: 6,
            firstName: 'Linus',
            lastName: 'Torvalds',
            profession: 'Programmer',
            balance: 1214,
            type: 'contractor'
          }), Profile.create({
            id: 7,
            firstName: 'Alan',
            lastName: 'Turing',
            profession: 'Programmer',
            balance: 22,
            type: 'contractor'
          }), Profile.create({
            id: 8,
            firstName: 'Aragorn',
            lastName: 'II Elessar Telcontarvalds',
            profession: 'Fighter',
            balance: 314,
            type: 'contractor'
          }), Contract.create({
            id: 1,
            terms: 'bla bla bla',
            status: 'terminated',
            clientId: 1,
            contractorId: 5
          }), Contract.create({
            id: 2,
            terms: 'bla bla bla',
            status: 'in_progress',
            clientId: 1,
            contractorId: 6
          }), Contract.create({
            id: 3,
            terms: 'bla bla bla',
            status: 'in_progress',
            clientId: 2,
            contractorId: 6
          }), Contract.create({
            id: 4,
            terms: 'bla bla bla',
            status: 'in_progress',
            clientId: 2,
            contractorId: 7
          }), Contract.create({
            id: 5,
            terms: 'bla bla bla',
            status: 'new',
            clientId: 3,
            contractorId: 8
          }), Contract.create({
            id: 6,
            terms: 'bla bla bla',
            status: 'in_progress',
            clientId: 3,
            contractorId: 7
          }), Contract.create({
            id: 7,
            terms: 'bla bla bla',
            status: 'in_progress',
            clientId: 4,
            contractorId: 7
          }), Contract.create({
            id: 8,
            terms: 'bla bla bla',
            status: 'in_progress',
            clientId: 4,
            contractorId: 6
          }), Contract.create({
            id: 9,
            terms: 'bla bla bla',
            status: 'in_progress',
            clientId: 4,
            contractorId: 8
          }), Job.create({
            description: 'work',
            price: 200,
            contractId: 1
          }), Job.create({
            description: 'work',
            price: 201,
            contractId: 2
          }), Job.create({
            description: 'work',
            price: 202,
            contractId: 3
          }), Job.create({
            description: 'work',
            price: 200,
            contractId: 4
          }), Job.create({
            description: 'work',
            price: 200,
            contractId: 7
          }), Job.create({
            description: 'work',
            price: 2020,
            paid: true,
            paymentDate: '2020-08-15T19:11:26.737Z',
            contractId: 7
          }), Job.create({
            description: 'work',
            price: 200,
            paid: true,
            paymentDate: '2020-08-15T19:11:26.737Z',
            contractId: 2
          }), Job.create({
            description: 'work',
            price: 200,
            paid: true,
            paymentDate: '2020-08-16T19:11:26.737Z',
            contractId: 3
          }), Job.create({
            description: 'work',
            price: 200,
            paid: true,
            paymentDate: '2020-08-17T19:11:26.737Z',
            contractId: 1
          }), Job.create({
            description: 'work',
            price: 200,
            paid: true,
            paymentDate: '2020-08-17T19:11:26.737Z',
            contractId: 5
          }), Job.create({
            description: 'work',
            price: 21,
            paid: true,
            paymentDate: '2020-08-10T19:11:26.737Z',
            contractId: 1
          }), Job.create({
            description: 'work',
            price: 21,
            paid: true,
            paymentDate: '2020-08-15T19:11:26.737Z',
            contractId: 2
          }), Job.create({
            description: 'work',
            price: 121,
            paid: true,
            paymentDate: '2020-08-15T19:11:26.737Z',
            contractId: 3
          }), Job.create({
            description: 'work',
            price: 121,
            paid: true,
            paymentDate: '2020-08-14T23:11:26.737Z',
            contractId: 3
          })]));

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}