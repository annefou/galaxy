define(["exports","utils/utils","mvc/ui/ui-options"],function(e,a,t){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0});var s=i(a),n=i(t),d=n.default.BaseIcons.extend({initialize:function(e){e.type=e.display||"checkbox",e.multiple="checkbox"==e.type,n.default.BaseIcons.prototype.initialize.call(this,e)},_setValue:function(e){if(n.default.BaseIcons.prototype._setValue.call(this,e),void 0!==e&&null!==e&&this.header_index){var a=this,t=$.isArray(e)?e:[e];_.each(t,function(e){var t=a.header_index[e];_.each(t,function(e){a._setState(e,!0)})})}},_setState:function(e,a){var t=this.$(".button-"+e),i=this.$(".subgroup-"+e);t.data("is_expanded",a),a?(i.show(),t.removeClass("fa-plus-square").addClass("fa-minus-square")):(i.hide(),t.removeClass("fa-minus-square").addClass("fa-plus-square"))},_templateOptions:function(){function e(e,a){var i=e.find(".button-"+a);i.on("click",function(){t._setState(a,!i.data("is_expanded"))})}function a(i,n,d){d=d||[];for(var l in n){var u=n[l],o=u.options&&u.options.length>0,r=d.slice(0);t.header_index[u.value]=r.slice(0);var p=$("<div/>");if(o){var c=s.default.uid(),f=$("<span/>").addClass("button-"+c).addClass("ui-drilldown-button fa fa-plus-square"),v=$("<div/>").addClass("subgroup-"+c).addClass("ui-drilldown-subgroup");p.append($("<div/>").append(f).append(t._templateOption({label:u.name,value:u.value}))),r.push(c),a(v,u.options,r),p.append(v),e(p,c)}else p.append(t._templateOption({label:u.name,value:u.value}));i.append(p)}}var t=this;this.header_index={};var i=$("<div/>");return a(i,this.model.get("data")),i},_template:function(){return $("<div/>").addClass("ui-options-list drilldown-container").attr("id",this.model.id)}});e.default={View:d}});
//# sourceMappingURL=../../../maps/mvc/ui/ui-drilldown.js.map
