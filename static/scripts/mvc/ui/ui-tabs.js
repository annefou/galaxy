define(["exports","utils/utils"],function(t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});!function(t){t&&t.__esModule}(e);var i=Backbone.View.extend({initialize:function(t){this.collection=new Backbone.Collection,this.model=t&&t.model||new Backbone.Model({onchange:null,visible:!0}).set(t),this.setElement($(this._template())),this.$nav=this.$(".tab-navigation"),this.$content=this.$(".tab-content"),this.$el.on("click",function(){$(".tooltip").hide()}),this.render(),this.listenTo(this.model,"change",this.render,this),this.listenTo(this.collection,"add",this._add,this),this.listenTo(this.collection,"remove",this._remove,this),this.listenTo(this.collection,"change",this._change,this),this.listenTo(this.collection,"reset",this._reset,this),this.listenTo(this.collection,"add remove reset",this.render,this)},render:function(){var t=this.model.get("current");(t=this.$("#"+t).length>0?t:this.first())&&(this.$nav.children().removeClass("active"),this.$content.children().removeClass("active"),this.$("#tab-"+t).addClass("active"),this.$("#"+t).addClass("active")),this.$el[this.model.get("visible")?"fadeIn":"fadeOut"]("fast"),this.$nav[this.size()>1?"show":"hide"]()},current:function(){return this.model.get("current")},show:function(t){t&&(this.model.set({current:t,visible:!0}),this.model.get("onchange")&&this.model.get("onchange")(t))},hide:function(){this.model.set("visible",!1)},first:function(){var t=this.collection.first();return t&&t.id},size:function(){return this.collection.length},add:function(t){this.collection.add(t)},del:function(t){this.collection.remove(t)},delAll:function(){this.collection.reset()},showTab:function(t){this.collection.get(t).set("hidden",!1)},hideTab:function(t){this.collection.get(t).set("hidden",!0)},_add:function(t){var e=this,i=t.attributes;this.$content.append($("<div/>").attr("id",i.id).addClass("tab-pane").append(i.$el)),this.$nav.append($(this._template_tab(i)).show().tooltip({title:i.tooltip,placement:"bottom",container:e.$el}).on("click",function(t){t.preventDefault(),e.show(i.id)})),1==this.size()&&this.show(i.id)},_remove:function(t){this.$("#tab-"+t.id).remove(),this.$("#"+t.id).remove()},_reset:function(){this.$nav.empty(),this.$content.empty()},_change:function(t){this.$("#tab-"+t.id)[t.get("hidden")?"hide":"show"]()},_template:function(){return $("<div/>").addClass("ui-tabs tabbable tabs-left").append($("<ul/>").addClass("tab-navigation nav nav-tabs")).append($("<div/>").addClass("tab-content"))},_template_tab:function(t){var e=$("<li/>").addClass("tab-element").attr("id","tab-"+t.id).append($("<a/>").attr("id","tab-title-link-"+t.id)),i=e.find("a");return t.icon&&i.append($("<i/>").addClass("tab-icon fa").addClass(t.icon)),i.append($("<span/>").attr("id","tab-title-text-"+t.id).addClass("tab-title-text").append(t.title)),e}});t.default={View:i}});
//# sourceMappingURL=../../../maps/mvc/ui/ui-tabs.js.map
