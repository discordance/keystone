/*!
 * Module dependencies.
 */

var util = require('util'),
	utils = require('keystone-utils'),
	super_ = require('../field');

/**
 * TextArray FieldType Constructor
 * @extends Field
 * @api public
 */

function questionnaire(list, path, options) {
	this._nativeType = [{
		question: String,
		questions: [{
			question: String
		}]
	}];
	this._underscoreMethods = []
	options.nofilter = true;
	options.nosort = true;
	questionnaire.super_.call(this, list, path, options);
}

/*!
 * Inherit from Field
 */
util.inherits(questionnaire, super_);

/**
 * Updates the value for this field in the item from a data object
 *
 * @api public
 */
questionnaire.prototype.updateItem = function(item, data) {

  console.log(data);
  // transform diagnostic in the good data format
  var result = []
  var simple = data[this.path]
  simple.forEach(function(item){
    result.push({question:item});
  });

  if ( data[this.path] === undefined ) {
    item.set(this.path, []);
  } else {
    item.set(this.path, result);
  }
}


/*!
 * Export class
 */
exports = module.exports = questionnaire;
