define(["exports","utils/utils","mvc/ui/ui-buttons"],function(t,e,i){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(e),s=a(i),l=Backbone.View.extend({initialize:function(t){var e=this;this.model=t&&t.model||new Backbone.Model({visible:!0,data:[],id:n.default.uid(),error_text:"No options available.",wait_text:"Please wait...",multiple:!1,optional:!1,onchange:function(){}}).set(t),this.listenTo(this.model,"change:value",this._changeValue,this),this.listenTo(this.model,"change:wait",this._changeWait,this),this.listenTo(this.model,"change:data",this._changeData,this),this.listenTo(this.model,"change:visible",this._changeVisible,this),this.on("change",function(){e.model.get("onchange")(e.value())}),this.render()},render:function(){var t=this;this.$el.empty().removeClass().addClass("ui-options").append(this.$message=$("<div/>")).append(this.$menu=$("<div/>").addClass("ui-options-menu")).append(this.$options=$(this._template())),this.all_button=null,this.model.get("multiple")&&(this.all_button=new s.default.ButtonCheck({onclick:function(){t.$("input").prop("checked",0!==t.all_button.value()),t.value(t._getValue()),t.trigger("change")}}),this.$menu.append(this.all_button.$el)),this._changeData(),this._changeWait(),this._changeVisible()},update:function(t){this.model.set("data",t)},_changeData:function(){t=this;this.$options.empty(),this._templateOptions?this.$options.append(this._templateOptions(this.model.get("data"))):_.each(this.model.get("data"),function(e){t.$options.append($(t._templateOption(e)).addClass("ui-option").tooltip({title:e.tooltip,placement:"bottom"}))});var t=this;this.$("input").on("change",function(){t.value(t._getValue()),t.trigger("change")}),this._changeValue(),this._changeWait()},_changeVisible:function(){this.$el[this.model.get("visible")?"show":"hide"]()},_changeWait:function(){this.model.get("wait")?0===this.length()&&(this._messageShow(this.model.get("wait_text"),"info"),this.$options.hide(),this.$menu.hide()):0===this.length()?(this._messageShow(this.model.get("error_text"),"danger"),this.$options.hide(),this.$menu.hide()):(this.$message.hide(),this.$options.css("display","inline-block"),this.$menu.show())},_changeValue:function(){this._setValue(this.model.get("value")),null!==this._getValue()||this.model.get("multiple")||this.model.get("optional")||this._setValue(this.first()),this.all_button&&this.all_button.value($.isArray(this._getValue())?this._getValue().length:0,this.length())},value:function(t){return void 0!==t&&this.model.set("value",t),this._getValue()},first:function(){var t=this.$("input").first();return t.length>0?t.val():null},wait:function(){this.model.set("wait",!0)},unwait:function(){this.model.set("wait",!1)},length:function(){return this.$(".ui-option").length},_setValue:function(t){var e=this;if(void 0!==t&&(this.$("input").prop("checked",!1),null!==t)){var i=$.isArray(t)?t:[t];_.each(i,function(t){e.$('input[value="'+t+'"]').first().prop("checked",!0)})}},_getValue:function(){var t=[];return this.$(":checked").each(function(){t.push($(this).val())}),n.default.isEmpty(t)?null:this.model.get("multiple")?t:t[0]},_messageShow:function(t,e){this.$message.show().removeClass().addClass("ui-message alert alert-"+e).html(t)},_template:function(){return $("<div/>").addClass("ui-options-list")}}),o=l.extend({_templateOption:function(t){var e=n.default.uid();return $("<div/>").addClass("ui-option").append($("<input/>").attr({id:e,type:this.model.get("type"),name:this.model.id,value:t.value})).append($("<label/>").addClass("ui-options-label").attr("for",e).html(t.label))}}),h={};h.View=o.extend({initialize:function(t){t.type="radio",o.prototype.initialize.call(this,t)}});var u={};u.View=o.extend({initialize:function(t){t.type="checkbox",t.multiple=!0,o.prototype.initialize.call(this,t)}});var d={};d.View=l.extend({initialize:function(t){l.prototype.initialize.call(this,t)},_setValue:function(t){void 0!==t&&(this.$("input").prop("checked",!1),this.$("label").removeClass("active"),this.$('[value="'+t+'"]').prop("checked",!0).closest("label").addClass("active"))},_templateOption:function(t){var e=$("<label/>").addClass("btn btn-default");return t.icon&&e.append($("<i/>").addClass("fa").addClass(t.icon).addClass(!t.label&&"no-padding")),e.append($("<input/>").attr({type:"radio",name:this.model.id,value:t.value})),t.label&&e.append(t.label),e},_template:function(){return $("<div/>").addClass("btn-group ui-radiobutton").attr("data-toggle","buttons")}}),t.default={Base:l,BaseIcons:o,Radio:h,RadioButton:d,Checkbox:u}});
//# sourceMappingURL=../../../maps/mvc/ui/ui-options.js.map
