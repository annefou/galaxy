define(["exports","utils/utils","mvc/ui/ui-misc","mvc/ui/ui-select-default"],function(t,e,i,a){"use strict";function l(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(t,"__esModule",{value:!0});var n=l(e),s=l(i),o=l(a),h={DISABLED:"disabled",ENABLED:"enabled",LINKED:"linked"},c={data:[{src:"hda",icon:"fa-file-o",tooltip:"Single dataset",multiple:!1,batch:h.DISABLED},{src:"hda",icon:"fa-files-o",tooltip:"Multiple datasets",multiple:!0,batch:h.LINKED},{src:"hdca",icon:"fa-folder-o",tooltip:"Dataset collection",multiple:!1,batch:h.LINKED}],data_multiple:[{src:"hda",icon:"fa-files-o",tooltip:"Multiple datasets",multiple:!0,batch:h.DISABLED},{src:"hdca",icon:"fa-folder-o",tooltip:"Dataset collections",multiple:!0,batch:h.DISABLED}],data_collection:[{src:"hdca",icon:"fa-folder-o",tooltip:"Dataset collection",multiple:!1,batch:h.DISABLED}],workflow_data:[{src:"hda",icon:"fa-file-o",tooltip:"Single dataset",multiple:!1,batch:h.DISABLED}],workflow_data_multiple:[{src:"hda",icon:"fa-files-o",tooltip:"Multiple datasets",multiple:!0,batch:h.DISABLED}],workflow_data_collection:[{src:"hdca",icon:"fa-folder-o",tooltip:"Dataset collection",multiple:!1,batch:h.DISABLED}],module_data:[{src:"hda",icon:"fa-file-o",tooltip:"Single dataset",multiple:!1,batch:h.DISABLED},{src:"hda",icon:"fa-files-o",tooltip:"Multiple datasets",multiple:!0,batch:h.ENABLED}],module_data_collection:[{src:"hdca",icon:"fa-folder-o",tooltip:"Dataset collection",multiple:!1,batch:h.DISABLED},{src:"hdca",icon:"fa-folder",tooltip:"Multiple collections",multiple:!0,batch:h.ENABLED}]},d=Backbone.View.extend({initialize:function(t){var e=this;this.model=t&&t.model||new Backbone.Model({src_labels:{hda:"dataset",hdca:"dataset collection"},pagelimit:100,statustimer:1e3}).set(t),this.setElement($("<div/>").addClass("ui-select-content")),this.button_product=new s.default.RadioButton.View({value:"false",data:[{icon:"fa fa-chain",value:"false",tooltip:"Linked inputs will be run in matched order with other datasets e.g. use this for matching forward and reverse reads."},{icon:"fa fa-chain-broken",value:"true",tooltip:"Unlinked dataset inputs will be run against *all* other inputs."}]});var i=$("<div/>").addClass("ui-form-info").append($("<i/>").addClass("fa fa-sitemap")).append($("<span/>").html("This is a batch mode input field. Separate jobs will be triggered for each dataset selection."));this.$batch={linked:i.clone(),enabled:i.clone().append($("<div/>").append($("<div/>").addClass("ui-form-title").html("Batch options:")).append(this.button_product.$el)).append($("<div/>").css("clear","both"))},this.$el.on("dragenter",function(t){this.lastenter=t.target,e.$el.addClass("ui-dragover")}).on("dragover",function(t){t.preventDefault()}).on("dragleave",function(t){this.lastenter===t.target&&e.$el.removeClass("ui-dragover")}).on("drop",function(t){e._handleDrop(t)}),this.history={},this.listenTo(this.model,"change:data",this._changeData,this),this.listenTo(this.model,"change:wait",this._changeWait,this),this.listenTo(this.model,"change:current",this._changeCurrent,this),this.listenTo(this.model,"change:value",this._changeValue,this),this.listenTo(this.model,"change:type change:optional change:multiple change:extensions",this._changeType,this),this.render(),this.on("change",function(){t.onchange&&t.onchange(e.value())})},render:function(){this._changeType(),this._changeValue(),this._changeWait()},wait:function(){this.model.set("wait",!0)},unwait:function(){this.model.set("wait",!1)},update:function(t){this.model.set("data",t)},value:function(t){void 0!==t&&this.model.set("value",t);var e=this.model.get("current");if(this.config[e]){var i=this.fields[e].value();if(null!==i&&(i=$.isArray(i)?i:[i]).length>0){var a=this._batch({values:[]});for(var l in i){var n=this.history[i[l]+"_"+this.config[e].src];if(!n)return Galaxy.emit.debug("ui-select-content::value()","Requested details not found for '"+i[l]+"'."),null;a.values.push(n)}return a.values.sort(function(t,e){return t.hid-e.hid}),a}}else Galaxy.emit.debug("ui-select-content::value()","Invalid value/source '"+t+"'.");return null},_changeCurrent:function(){var t=this;_.each(this.fields,function(e,i){t.model.get("current")==i?(e.$el.show(),_.each(t.$batch,function(e,a){e[t.config[i].batch==a?"show":"hide"]()}),t.button_type.value(i)):e.$el.hide()})},_changeType:function(){var t=this,e=(this.model.get("flavor")?this.model.get("flavor")+"_":"")+String(this.model.get("type"))+(this.model.get("multiple")?"_multiple":"");c[e]?this.config=c[e]:(this.config=c.data,Galaxy.emit.debug("ui-select-content::_changeType()","Invalid configuration/type id '"+e+"'."));var i=t.model.get("data"),a=n.default.textify(this.model.get("extensions")),l=this.model.get("src_labels");this.fields=[],this.button_data=[],_.each(this.config,function(e,n){t.button_data.push({value:n,icon:e.icon,tooltip:e.tooltip}),t.fields.push(new o.default.View({optional:t.model.get("optional"),multiple:e.multiple,searchable:!e.multiple||i&&i[e.src]&&i[e.src].length>t.model.get("pagelimit"),individual:!0,error_text:"No "+(a?a+" ":"")+(l[e.src]||"content")+" available.",onchange:function(){t.trigger("change")}}))}),this.button_type=new s.default.RadioButton.View({value:this.model.get("current"),data:this.button_data,onchange:function(e){t.model.set("current",e),t.trigger("change")}}),this.$el.empty();var h=0;this.fields.length>1&&(this.$el.append(this.button_type.$el),h=Math.max(0,36*this.fields.length)+"px"),_.each(this.fields,function(e){t.$el.append(e.$el.css({"margin-left":h}))}),_.each(this.$batch,function(e,i){t.$el.append(e.css({"margin-left":h}))}),this.model.set("current",0),this._changeCurrent(),this._changeData()},_changeWait:function(){var t=this;_.each(this.fields,function(e){e[t.model.get("wait")?"wait":"unwait"]()})},_changeData:function(){var t=this.model.get("data"),e=this,i={};_.each(t,function(t,a){i[a]=[],_.each(t,function(t){i[a].push({hid:t.hid,keep:t.keep,label:t.hid+": "+t.name,value:t.id,tags:t.tags}),e.history[t.id+"_"+a]=t})}),_.each(this.config,function(t,a){i[t.src]&&e.fields[a].add(i[t.src],function(t,e){return e.hid-t.hid})})},_changeValue:function(){var t=this.model.get("value");if(t&&t.values&&t.values.length>0){var e=[];_.each(t.values,function(t){e.push(t.id)});for(var i=t.values[0].src,a=t.values.length>1,l=0;l<this.config.length;l++){var n=this.fields[l],s=this.config[l];if(s.src==i&&-1!==[a,!0].indexOf(s.multiple)){this.model.set("current",l),n.value(e);break}}}else _.each(this.fields,function(t){t.value(null)})},_handleDrop:function(t){try{var e=this.model.get("data"),i=this.model.get("current"),a=this.config[i],l=this.fields[i],n=JSON.parse(t.originalEvent.dataTransfer.getData("text"))[0],s=n.id,o="dataset"==n.history_content_type?"hda":"hdca",h={id:s,src:o};if(e&&_.findWhere(e[o],h)){if(a.src==o){var c=l.value();c&&a.multiple?-1==c.indexOf(s)&&c.push(s):c=s,l.value(c)}else this.model.set("value",{values:[h]}),this.model.trigger("change:value");this.trigger("change"),this._handleDropStatus("success")}else this._handleDropStatus("danger")}catch(t){this._handleDropStatus("danger")}t.preventDefault()},_handleDropStatus:function(t){var e=this;this.$el.removeClass("ui-dragover").addClass("ui-dragover-"+t),setTimeout(function(){e.$el.removeClass("ui-dragover-"+t)},this.model.get("statustimer"))},_batch:function(t){t.batch=!1;var e=this.model.get("current"),i=this.config[e];if("hdca"==i.src&&!i.multiple){var a=this.history[this.fields[e].value()+"_hdca"];a&&a.map_over_type&&(t.batch=!0)}return i.batch!=h.LINKED&&i.batch!=h.ENABLED||(t.batch=!0,i.batch==h.ENABLED&&"true"===this.button_product.value()&&(t.product=!0)),t}});t.default={View:d}});
//# sourceMappingURL=../../../maps/mvc/ui/ui-select-content.js.map
