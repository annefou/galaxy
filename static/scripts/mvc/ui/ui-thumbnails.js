define(["exports","utils/utils","mvc/ui/ui-misc","mvc/ui/ui-tabs"],function(t,i,e,l){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(t,"__esModule",{value:!0});var n=s(i),a=(s(e),s(l)),u=Backbone.View.extend({events:{"click .ui-thumbnails-item":"_onclick","dblclick .ui-thumbnails-item":"_ondblclick"},initialize:function(t){this.model=t.model||new Backbone.Model(t),this.collection=new Backbone.Collection(this.model.get("collection")),this.tabs=new a.default.View({}),this.setElement(this.tabs.$el.addClass("ui-thumbnails")),this.render(),this.listenTo(this.model,"change",this.render,this),this.listenTo(this.collection,"reset change add remove",this.render,this)},render:function(){this.first=null,this.tabs.delAll(),this._renderDefault(),this._renderList()},_renderDefault:function(){var t=this,i=$("<div/>").addClass("ui-thumbnails-grid");this.collection.each(function(e){if(-1!==e.get("keywords").indexOf("default")){var l=e.get("title");i.append($(t._templateThumbnailItem({id:e.id,title:l.length<20?l:l.substr(0,20)+"...",title_icon:e.get("title_icon"),image_src:e.get("image_src")})).tooltip({title:e.get("description"),placement:"bottom"}))}}),i.children().length>0&&this.tabs.add({id:n.default.uid(),title:t.model.get("title_default"),$el:i})},_renderList:function(){var t=this;if(this.collection.length>0){this.first=this.first||this.collection.first().id;var i=$("<div/>").addClass("ui-thumbnails-grid");this.collection.each(function(e){i.append(t._templateRegularItem(e.attributes))}),this.tabs.add({id:n.default.uid(),title:t.model.get("title_list"),$el:i})}},value:function(t){if(void 0!==t){t="__first"==t?this.first:t;var i=this.$(".ui-thumbnail-current").attr("value");this.$(".ui-thumbnail-current").removeClass("ui-thumbnail-current"),this.$('[value="'+t+'"]').addClass("ui-thumbnail-current");var e=this.$(".ui-thumbnail-current").attr("value"),l=this.model.get("onchange");e!=i&&l&&l(e)}return this.$(".ui-thumbnail-current").attr("value")},_onclick:function(t){this.value($(t.target).closest(".ui-thumbnails-item").attr("value"))},_ondblclick:function(t){this.model.get("ondblclick")&&this.model.get("ondblclick")(this.value())},_templateThumbnailItem:function(t){return'<div class="ui-thumbnails-item ui-thumbnails-item-float" value="'+t.id+'"><img class="ui-thumbnails-image" src="'+t.image_src+'"><div class="ui-thumbnails-title ui-form-info"><span class="fa '+t.title_icon+'"/>'+t.title+"</div><div>"},_templateRegularItem:function(t){return'<div class="ui-thumbnails-item" value="'+t.id+'"><table><tr><td><img class="ui-thumbnails-image" src="'+t.image_src+'"></td><td><div class="ui-thumbnails-description-title ui-form-info">'+t.title+'</div><div class="ui-thumbnails-description-text ui-form-info">'+t.description+"</div></td></tr><div>"}});t.default={View:u}});
//# sourceMappingURL=../../../maps/mvc/ui/ui-thumbnails.js.map
