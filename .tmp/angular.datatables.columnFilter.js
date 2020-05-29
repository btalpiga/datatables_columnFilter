(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/*!
 * angular-datatables - v0.6.5-dev
 * https://github.com/l-lin/angular-datatables
 * License: MIT
 */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
  module.exports = 'datatables.columnfilter';
}

(function (window, document, $, angular) {
  'use strict'; // See http://jquery-datatables-column-filter.googlecode.com/svn/trunk/index.html

  angular.module('datatables.columnfilter', ['datatables']).config(dtColumnFilterConfig).run(initColumnFilterPlugin);
  /* @ngInject */

  function dtColumnFilterConfig($provide) {
    $provide.decorator('DTOptionsBuilder', dtOptionsBuilderDecorator);

    function dtOptionsBuilderDecorator($delegate) {
      var newOptions = $delegate.newOptions;
      var fromSource = $delegate.fromSource;
      var fromFnPromise = $delegate.fromFnPromise;

      $delegate.newOptions = function () {
        return _decorateOptions(newOptions);
      };

      $delegate.fromSource = function (ajax) {
        return _decorateOptions(fromSource, ajax);
      };

      $delegate.fromFnPromise = function (fnPromise) {
        return _decorateOptions(fromFnPromise, fnPromise);
      };

      return $delegate;

      function _decorateOptions(fn, params) {
        var options = fn(params);
        options.withColumnFilter = withColumnFilter;
        return options;
        /**
         * Add column filter support
         * @param columnFilterOptions the plugins options
         * @returns {DTOptions} the options
         */

        function withColumnFilter(columnFilterOptions) {
          options.hasColumnFilter = true;

          if (columnFilterOptions) {
            options.columnFilterOptions = columnFilterOptions;
          }

          return options;
        }
      }
    }

    dtOptionsBuilderDecorator.$inject = ['$delegate'];
  }

  dtColumnFilterConfig.$inject = ['$provide'];
  /* @ngInject */

  function initColumnFilterPlugin(DTRendererService) {
    var columnFilterPlugin = {
      postRender: postRender
    };
    DTRendererService.registerPlugin(columnFilterPlugin);

    function postRender(options, result) {
      if (options && options.hasColumnFilter) {
        result.dataTable.columnFilter(options.columnFilterOptions);
      }
    }
  }

  initColumnFilterPlugin.$inject = ['DTRendererService'];
})(window, document, jQuery, angular);

},{}]},{},[1]);
