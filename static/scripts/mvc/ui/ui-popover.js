define(["exports","utils/utils"],function(t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=function(t){return t&&t.__esModule?t:{default:t}}(i),s=Backbone.View.extend({optionsDefault:{with_close:!0,title:null,placement:"top",container:"body",body:null},initialize:function(t){this.setElement(this._template()),this.uid=e.default.uid(),this.options=_.defaults(t||{},this.optionsDefault),this.options.container.parent().append(this.el),this.$title=this.$(".popover-title-label"),this.$close=this.$(".popover-close"),this.$body=this.$(".popover-content"),this.options.body&&this.append(this.options.body);var i=this;$("body").on("mousedown."+this.uid,function(t){i.visible&&!$(i.options.container).is(t.target)&&!$(i.el).is(t.target)&&0===$(i.el).has(t.target).length&&i.hide()})},render:function(){this.$title.html(this.options.title),this.$el.removeClass().addClass("ui-popover popover fade in").addClass(this.options.placement),this.$el.css(this._get_placement(this.options.placement));var t=this;this.options.with_close?this.$close.on("click",function(){t.hide()}).show():this.$close.off().hide()},title:function(t){void 0!==t&&(this.options.title=t,this.$title.html(t))},show:function(){this.render(),this.$el.show(),this.visible=!0},hide:function(){this.$el.hide(),this.visible=!1},append:function(t){this.$body.append(t)},empty:function(){this.$body.empty()},remove:function(){$("body").off("mousedown."+this.uid),this.$el.remove()},_get_placement:function(t){var i,e,s=this._get_width(this.$el),o=this.$el.height(),n=this.options.container,l=this._get_width(n),h=this._get_height(n),p=n.position();if(i=e=0,-1!=["top","bottom"].indexOf(t))switch(e=p.left-s+(l+s)/2,t){case"top":i=p.top-o-5;break;case"bottom":i=p.top+h+5}else switch(i=p.top-o+(h+o)/2,t){case"right":e=p.left+l}return{top:i,left:e}},_get_width:function(t){return t.width()+parseInt(t.css("padding-left"))+parseInt(t.css("margin-left"))+parseInt(t.css("padding-right"))+parseInt(t.css("margin-right"))},_get_height:function(t){return t.height()+parseInt(t.css("padding-top"))+parseInt(t.css("padding-bottom"))},_template:function(t){return'<div class="ui-popover popover fade in"><div class="arrow"/><div class="popover-title"><div class="popover-title-label"/><div class="popover-close fa fa-times-circle"/></div><div class="popover-content"/></div>'}});t.default={View:s}});
//# sourceMappingURL=../../../maps/mvc/ui/ui-popover.js.map
