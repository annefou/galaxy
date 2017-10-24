define(["exports","utils/utils","mvc/ui/ui-misc","mvc/ui/ui-table","mvc/ui/ui-list"],function(e,t,i,a,n){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(e,"__esModule",{value:!0});l(t);var s=l(i),r=(l(a),l(n)),c=Backbone.Collection.extend({url:Galaxy.root+"api/libraries?deleted=false"}),o=Backbone.Collection.extend({initialize:function(){var e=this;this.config=new Backbone.Model({library_id:null}),this.config.on("change",function(){e.fetch({reset:!0})})},url:function(){return Galaxy.root+"api/libraries/"+this.config.get("library_id")+"/contents"}}),u=Backbone.View.extend({initialize:function(e){var t=this;this.libraries=new c,this.datasets=new o,this.options=e,this.library_select=new s.default.Select.View({onchange:function(e){t.datasets.config.set("library_id",e)}}),this.dataset_list=new r.default.View({name:"dataset",optional:e.optional,multiple:e.multiple,onchange:function(){t.trigger("change")}}),this.libraries.on("reset",function(){var e=[];t.libraries.each(function(t){e.push({value:t.id,label:t.get("name")})}),t.library_select.update(e)}),this.datasets.on("reset",function(){var e=[];null!==t.library_select.text()&&t.datasets.each(function(t){"file"===t.get("type")&&e.push({value:t.id,label:t.get("name")})}),t.dataset_list.update(e)}),this.on("change",function(){e.onchange&&e.onchange(t.value())}),this.setElement(this._template()),this.$(".library-select").append(this.library_select.$el),this.$el.append(this.dataset_list.$el),this.libraries.fetch({reset:!0,success:function(){t.library_select.trigger("change"),void 0!==t.options.value&&t.value(t.options.value)}})},value:function(e){return this.dataset_list.value(e)},_template:function(){return'<div class="ui-select-library"><div class="library ui-margin-bottom"><span class="library-title">Select Library</span><span class="library-select"/></div></div>'}});e.default={View:u}});
//# sourceMappingURL=../../../maps/mvc/ui/ui-select-library.js.map
