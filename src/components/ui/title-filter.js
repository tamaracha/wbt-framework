"use strict";
module.exports=function(){
  return function(unit){
    if(!unit){return;}
    if(!unit.title){return;}
    if(unit.subtitle){return unit.title+": "+unit.subtitle;}
    return unit.title;
  };
};