var PluginManager=new Class({pluginTotal:0,topTotal:-1,initialize:function(a,d,c){if(typeOf(a)==="string"){a=[a]}this.id=d;this.plugins=a;this.type=c;this.accordion=new Fx.Accordion([],[],{alwaysHide:true,display:-1});for(var b=0;b<a.length;b++){this.addTop(a[b])}this.periodical=this.iniAccordian.periodical(500,this);this.watchPluginSelect();this.watchDelete();this.watchAdd();document.id("plugins").addEvent("click:relay(h3.title)",function(g,f){document.id("plugins").getElements("h3.title").each(function(e){if(e!==f){e.removeClass("pane-toggler-down")}});f.toggleClass("pane-toggler-down")})},iniAccordian:function(){if(this.pluginTotal===this.plugins.length){this.accordion.display(1);clearInterval(this.periodical)}},canSaveForm:function(){if(document.readyState!=="complete"){return false}return Fabrik.requestQueue.empty()},_makeSel:function(h,d,g,f){var b,a;var e=[];this.sel=f;e.push(new Element("option",{value:""}).appendText(Joomla.JText._("COM_FABRIK_PLEASE_SELECT")));if(typeOf(g)==="object"){$H(g).each(function(i,c){e.push(new Element("optgroup",{label:c}));i.each(function(j){e=this._addSelOpt(e,j)}.bind(this))}.bind(this))}else{g.each(function(c){e=this._addSelOpt(e,c)}.bind(this))}return new Element("select",{"class":h,name:d}).adopt(e)},_addSelOpt:function(a,b){if(typeOf(b)==="object"){v=b.value?b.value:b.name;l=b.label?b.label:v}else{v=l=b}if(v===this.sel){a.push(new Element("option",{value:v,selected:"selected"}).set("text",l))}else{a.push(new Element("option",{value:v}).set("text",l))}return a},watchDelete:function(){document.id("adminForm").addEvent("click:relay(a.removeButton)",function(a,b){a.preventDefault();this.pluginTotal--;this.topTotal--;this.deletePlugin(a)}.bind(this))},watchAdd:function(){document.id("addPlugin").addEvent("click",function(a){a.stop();this.accordion.display(-1);this.addTop()}.bind(this))},addTop:function(c){if(typeOf(c)==="string"){published=1;c=c?c:""}else{published=c?c.published:1;c=c?c.plugin:""}var e=new Element("div.actionContainer.panel");var d=new Element("h3.title.pane-toggler").adopt(new Element("a",{href:"#"}).adopt(new Element("span").set("text",c)));e.adopt(d);e.inject(document.id("plugins"));var a=document.id("plugins").getElements(".actionContainer").getLast();var b=new Request.HTML({url:"index.php",data:{option:"com_fabrik",view:"plugin",task:"top",format:"raw",type:this.type,plugin:c,plugin_published:published,c:this.topTotal,id:this.id},append:a,onSuccess:function(f){if(c!==""){this.addPlugin(c)}this.accordion.addSection(d,e.getElement(".pane-slider"))}.bind(this),onFailure:function(f){console.log("fail",f)},onException:function(g,f){console.log("excetiprion",g,f)}});this.topTotal++;Fabrik.requestQueue.add(b)},watchPluginSelect:function(){document.id("adminForm").addEvent("change:relay(select.elementtype)",function(d,e){d.preventDefault();var b=e.get("value");var a=e.getParent(".adminform");e.getParent(".actionContainer").getElement("h3 a span").set("text",b);var f=a.id.replace("formAction_","").toInt();this.addPlugin(b,f)}.bind(this))},addPlugin:function(b,d){d=typeOf(d)==="number"?d:this.pluginTotal;if(b===""){document.id("plugins").getElements(".actionContainer")[d].getElement(".pluginOpts").empty();return}var a=new Request.HTML({url:"index.php",data:{option:"com_fabrik",view:"plugin",format:"raw",type:this.type,plugin:b,c:d,id:this.id},update:document.id("plugins").getElements(".actionContainer")[d].getElement(".pluginOpts"),onComplete:function(){}.bind(this)});this.pluginTotal++;Fabrik.requestQueue.add(a)},deletePlugin:function(b){if(b.target.findClassUp("adminform").id.test(/_\d+$/)){var a=b.target.findClassUp("adminform").id.match(/_(\d+)$/)[1].toInt();document.id("plugins").getElements("input, select, textarea").each(function(d){var e=d.name.match(/\[[0-9]+\]/);if(e){var f=e[0].replace("[","").replace("]","").toInt();if(f>a){f=f-1;d.name=d.name.replace(/\[[0-9]+\]/,"["+f+"]")}}});document.id("plugins").getElements(".adminform").each(function(d){if(d.id.match(/formAction_\d+$/)){var e=d.id.match(/formAction_(\d+)$/)[1].toInt();if(e>a){e=e-1;d.id=d.id.replace(/(formAction_)(\d+)$/,"$1"+e)}}})}b.stop();document.id(b.target).getParent(".actionContainer").dispose();this.counter--}});fabrikAdminPlugin=new Class({Implements:[Options],options:{},initialize:function(c,b,a){this.name=c;this.label=b;this.setOptions(a)},cloned:function(){}});
