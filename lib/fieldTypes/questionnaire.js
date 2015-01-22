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

	// maximum 8 niveaux de recursion
	var type = [];
	var ct = 0;
	var recCreate = function(root){
		obj = {question:String, comment:String, questions:[]};
		root.push(obj);
		ct++;
		if(ct <= 8){
			recCreate(obj.questions);
		}
	}
	recCreate(type);

	this._nativeType = type;

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
	// we have to parse the data
	if(data[this.path] === undefined){
		item.set(this.path, []);
	}else{
		var parsed = JSON.parse(decodeURIComponent(data[this.path]));
		item.set(this.path, parsed);
	}
}


/*!
 * Export class
 */
exports = module.exports = questionnaire;
