'use strict';
const models = require('../models');
//const debug = require('debug')('app:unit controller');
const jsonpatch=require('fast-json-patch');
const $=module.exports={};

$.index=function *(){
  const units = yield models.Unit.find(
    this.query.conditions||null,
    this.query.projections||null,
    this.query.options||null
  ).lean().exec();
  this.body=units;
};

$.create=function *(){
  const unit = yield models.Unit.create(this.request.body);
  this.assert(unit,'unit not created',404);
  this.body=unit;
  this.status = 201;
};

$.show=function *(){
  const unit = yield models.Unit.findById(
    this.params.unit,
    this.query.projections||null,
    this.query.options||null
  ).exec();
  this.assert(unit,'unit not found',404);
  this.lastModified = unit.updatedAt;
  this.body=unit;
};

$.update=function *(){
  this.assert(this.header['if-match'], 403, 'no validation header supplied');
  const unit = yield models.Unit.findById(this.params.unit).exec();
  this.assert(unit,'unit not found',404);
  this.assert(unit.updatedAt.toISOString() === this.header['if-unmodified-since'], 412, 'unit has been updated since last fetch');
  const patch = jsonpatch.apply(unit,this.request.body);
  this.assert(patch===true, 'patch not successful');
  yield unit.save();
  this.lastModified = unit.updatedAt;
  this.status=200;
};

$.destroy=function *(){
  yield models.Unit.findByIdAndRemove(this.params.unit);
  this.status=202;
};
