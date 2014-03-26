define(function (require, exports) {

  'use strict';

  var Class = require('../src/class');

  QUnit.start();

  test('class', function() {
    notEqual( new Class(), new Class(), '' );
  });

  test('new', function() {
    var ClassA = Class.create();
    notEqual( new ClassA(), new ClassA(), '' );
  });

  test('initialize', function() {
    var ClassA = Class.create({
      initialize: function (x) {
        this.x = x;
      }
    });
    equal( new ClassA(2).x, 2, '' );
  });

  test('extend', function() {
    var ClassA = Class.create(),
      instanceA = new ClassA();
    instanceA.extend({ x: 1, y: 2 }, { x: 3 });
    equal( instanceA.x, 3, '' );
    equal( instanceA.y, 2, '' );
  });

  test('Class.create', function() {
    var ClassA = Class.create(function () {}, {
        initialize: function () {
          this.xy = this.x + this.y;
        },
        x: 1,
        y: 2
      });
    var ClassB = Class.create(ClassA, {
        initialize: function () {
          ClassB.superclass.initialize.apply(this, arguments);
          this.xyz = this.x + this.y + this.z;
        },
        x: 3,
        z: 4
      });
    var ClassC = Class.create(ClassB, {
        initialize: function () {
          ClassC.superclass.initialize.apply(this, arguments);
          this.xyzk = this.x + this.y + this.z + this.k;
        },
        k: 5
      });
    var instanceA = new ClassA();
    var instanceB = new ClassB();
    var instanceC = new ClassC();
    equal( instanceA.xy, 3, '' );
    equal( instanceB.xy, 5, '' );
    equal( instanceB.xyz, 9, '' );
    equal( instanceC.xy, 5, '' );
    equal( instanceC.xyz, 9, '' );
    equal( instanceC.xyzk, 14, '' );
  });

  test('Class.extend', function() {
    var ClassA = Class.create({
        initialize: function () {
          this.xy = this.x + this.y;
        },
        x: 1,
        y: 2
      }),
      ClassB = ClassA.extend({
        initialize: function () {
          ClassB.superclass.initialize.apply(this, arguments);
          this.xyz = this.x + this.y + this.z;
        },
        x: 3,
        z: 4
      }),
      ClassC = ClassB.extend({
        initialize: function () {
          ClassC.superclass.initialize.apply(this, arguments);
          this.xyzk = this.x + this.y + this.z + this.k;
        },
        k: 5
      }),
      instanceA = new ClassA(),
      instanceB = new ClassB(),
      instanceC = new ClassC();
    equal( instanceA.x, 1, '' );
    equal( instanceA.y, 2, '' );
    equal( instanceA.xy, 3, '' );
    equal( instanceB.x, 3, '' );
    equal( instanceB.y, 2, '' );
    equal( instanceB.z, 4, '' );
    equal( instanceB.xy, 5, '' );
    equal( instanceB.xyz, 9, '' );
    equal( instanceC.x, 3, '' );
    equal( instanceC.y, 2, '' );
    equal( instanceC.z, 4, '' );
    equal( instanceC.xy, 5, '' );
    equal( instanceC.xyz, 9, '' );
    equal( instanceC.xyzk, 14, '' );
  });

  test('Class.extend', function() {
    var ClassA = Class.create({
        initialize: function () {
          this.setup();
        },
        setup: function () {
        }
      }),
      ClassC = ClassA.extend({
        defaults: {
          z: 5
        },
        setup: function () {
          var
            defaults = {
                x: 3,
                y: 4
              },
            ClassB = ClassA.extend({
              defaults: defaults,
              setup: function () {
                deepEqual( this.defaults, {
                    x: 3,
                    y: 4
                  }, '' );
              }
            });
          new ClassB();
          deepEqual( this.defaults, {
              z: 5
            }, '' );
        }
      });
      new ClassC();
  });

});