/*!
 * TableExport.js v5.0.0-rc.11 (https://www.travismclarke.com)
 *
 * Copyright (c) 2017 - Travis Clarke - https://www.travismclarke.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
!function(t,e){if("function"==typeof define&&define.amd)define(function(t){var r;try{r=t("jquery")}catch(o){}return e(r,t("blobjs"),t("file-saverjs"),t("xlsx"))});else if("object"==typeof exports&&"string"!=typeof exports.nodeName){var r;try{r=require("jquery")}catch(o){}module.exports=e(r,require("blobjs"),require("file-saverjs"),require("xlsx"))}else t.TableExport=e(t.jQuery,t.Blob,t.saveAs,t.XLSX)}(this,function(t,e,r,o){"use strict";function n(){for(var t=arguments,e=1;e<t.length;e++)for(var r in t[e])t[e].hasOwnProperty(r)&&(t[0][r]=t[e][r]);return t[0]}function a(t){return"undefined"==typeof t.length?[].concat(t):[].slice.call(t)}function i(t,e){return e.filter(function(e){return[].indexOf.call(document.querySelectorAll(e),t)!==-1}).length>0}function s(t){return"undefined"!=typeof t}function l(t){return t instanceof Array?[].concat.apply([],t):t}function p(t){return~y.indexOf(t)}function c(t){var e;switch(t){case v.TXT:case v.CSV:case v.XLS:e=!0;break;default:e=b(t)}return e}function u(t){return console.error(t),new Error(t)}function f(t,e,r){var o={};return t?(o.bootstrapClass=e[0]+" ",o.bootstrapTheme=e[1]+" ",o.bootstrapSpacing=e[2]+" "):(o.bootstrapClass=r+" ",o.bootstrapTheme="",o.bootstrapSpacing=""),o}var d=function(t,e){var r=this;if(!t)return u('"selectors" is required. \nUsage: TableExport(selectors, options)');if(!r)return new d(t,e);r.settings=n({},r.defaults,e),r.selectors=a(t);var o=r.settings;o.ignoreRows=o.ignoreRows instanceof Array?o.ignoreRows:[o.ignoreRows],o.ignoreCols=o.ignoreCols instanceof Array?o.ignoreCols:[o.ignoreCols],o.ignoreCSS=r.ignoreCSS instanceof Array?r.ignoreCSS:[r.ignoreCSS],o.emptyCSS=r.emptyCSS instanceof Array?r.emptyCSS:[r.emptyCSS],o.formatValue=r.formatValue.bind(this,o.trimWhitespace),o.bootstrapSettings=f(o.bootstrap,r.bootstrapConfig,r.defaultButton);var i={};r.getExportData=function(){return i},r.selectors.forEach(function(t){var e={};e.rows=a(t.querySelectorAll("tbody > tr")),e.rows=o.headers?a(t.querySelectorAll("thead > tr")).concat(e.rows):e.rows,e.rows=o.footers?e.rows.concat(a(t.querySelectorAll("tfoot > tr"))):e.rows,e.thAdj=o.headers?t.querySelectorAll("thead > tr").length:0,e.filename="id"===o.filename?t.getAttribute("id")?t.getAttribute("id"):r.defaultFilename:o.filename?o.filename:r.defaultFilename,e.uuid=w(t),e.checkCaption=function(e){var n=t.querySelectorAll("caption."+r.defaultCaptionClass);n.length?n[0].appendChild(e):(n=document.createElement("caption"),n.className=o.bootstrapSettings.bootstrapSpacing+o.position+" "+r.defaultCaptionClass,n.appendChild(e),t.insertBefore(n,t.firstChild))},e.setExportData=function(){return function(t){var r=h.getInstance().getItem(t),o=t.substring(t.indexOf("-")+1);i[e.uuid]=i[e.uuid]||{},i[e.uuid][o]=JSON.parse(r)}}(),e.rcMap=(new m).build(e,o);var n=y.reduce(function(t,e){return t[e]=0,t},{});o.formats.forEach(function(t){return p(t)?c(t)?void(n[t]||(e.setExportData(r.exporters.build.call(r,e,t)),n[t]++)):u('"'+t+'" requires "js-xlsx".'):u('"'+t+'" is not a valid format. \nFormats: '+y.join(", "))})});var s=document.querySelectorAll("button["+r.storageKey+"]");return S(s,"click",r.downloadHandler,r),r};d.prototype={version:"5.0.0-rc.10",defaults:{headers:!0,footers:!0,formats:["xlsx","csv","txt"],filename:"id",bootstrap:!1,exportButtons:!0,position:"bottom",ignoreRows:null,ignoreCols:null,trimWhitespace:!0},CONSTANTS:{FORMAT:{XLSX:"xlsx",XLSM:"xlsm",XLSB:"xlsb",BIFF2:"biff2",XLS:"xls",CSV:"csv",TXT:"txt"},TYPE:{STRING:"s",NUMBER:"n",BOOLEAN:"b",DATE:"d"}},charset:"charset=utf-8",defaultFilename:"myDownload",defaultButton:"button-default",defaultCaptionClass:"tableexport-caption",defaultNamespace:"tableexport-",tableKey:"tableexport-key",storageKey:"tableexport-id",ignoreCSS:".tableexport-ignore",emptyCSS:".tableexport-empty",bootstrapConfig:["btn","btn-default","btn-toolbar"],rowDel:"\r\n",entityMap:{"&":"&#38;","<":"&#60;",">":"&#62;","'":"&#39;","/":"&#47;"},formatConfig:{xlsx:{defaultClass:"xlsx",buttonContent:"Export to xlsx",mimeType:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",fileExtension:".xlsx"},xlsm:{defaultClass:"xlsm",buttonContent:"Export to xlsm",mimeType:"application/vnd.ms-excel.sheet.macroEnabled.main+xml",fileExtension:".xlsm"},xlsb:{defaultClass:"xlsb",buttonContent:"Export to xlsb",mimeType:"application/vnd.ms-excel.sheet.binary.macroEnabled.main",fileExtension:".xlsb"},xls:{defaultClass:"xls",buttonContent:"Export to xls",separator:"\t",mimeType:"application/vnd.ms-excel",fileExtension:".xls",enforceStrictRFC4180:!1},csv:{defaultClass:"csv",buttonContent:"Export to csv",separator:",",mimeType:"text/csv",fileExtension:".csv",enforceStrictRFC4180:!0},txt:{defaultClass:"txt",buttonContent:"Export to txt",separator:"  ",mimeType:"text/plain",fileExtension:".txt",enforceStrictRFC4180:!0}},typeConfig:{string:{defaultClass:"tableexport-string"},number:{defaultClass:"tableexport-number",assert:function(t){return!isNaN(t)}},"boolean":{defaultClass:"tableexport-boolean",assert:function(t){return"true"===t.toLowerCase()||"false"===t.toLowerCase()}},date:{defaultClass:"tableexport-date",assert:function(t){return!/.*%/.test(t)&&!isNaN(Date.parse(t))}}},exporters:{build:function(t,e){var r=this,o=r.settings,n=r.formatConfig[e],i=n.separator,s=t.rcMap,l=function(t){if(b(e))return{v:o.formatValue(t.textContent),t:r.getType(t.className)};switch(e){case v.CSV:return'"'+o.formatValue(t.textContent.replace(/"/g,'""'))+'"';default:return o.formatValue(t.textContent)}},p=a(t.rows).map(function(t,r){if(s.isIgnore(r))return s.handleRowColMapProp(s.TYPE.IGNORE);if(s.isEmpty(r))return s.handleRowColMapProp(s.TYPE.EMPTY);var o=t.querySelectorAll("th, td");return a(o).map(function(t,o){var n=l(t);return s.isIgnore(r,o)?s.handleRowColMapProp(s.TYPE.IGNORE):s.isEmpty(r,o)?s.handleRowColMapProp(s.TYPE.EMPTY):s.handleRowColMapProp(s.TYPE.DEFAULT,r,o,e,n,i)}).processCols(e,i)}).processRows(e,r.rowDel),c=JSON.stringify({data:p,filename:t.filename,mimeType:n.mimeType,fileExtension:n.fileExtension,merges:s.merges}),u=x({uuid:t.uuid,type:e});return o.exportButtons&&t.checkCaption(r.createObjButton(u,c,n.buttonContent,n.defaultClass,o.bootstrapSettings)),h.getInstance().setItem(u,c,!0)}},createObjButton:function(t,e,r,o,n){var a=document.createElement("button");return a.setAttribute(this.storageKey,t),a.className=n.bootstrapClass+n.bootstrapTheme+o,a.textContent=r,a},escapeHtml:function(t){var e=this;return String(t).replace(/[&<>'\/]/g,function(t){return e.entityMap[t]})},unescapeHtml:function(t){var e=String(t);for(var r in this.entityMap)e=e.replace(RegExp(this.entityMap[r],"g"),r);return e},formatValue:function(t,e){return t?e.trim():e},getType:function(t){if(!t)return"";var e=this.typeConfig;return~t.indexOf(e.string.defaultClass)?C.STRING:~t.indexOf(e.number.defaultClass)?C.NUMBER:~t.indexOf(e["boolean"].defaultClass)?C.BOOLEAN:~t.indexOf(e.date.defaultClass)?C.DATE:""},dateNum:function(t,e){e&&(t+=1462);var r=Date.parse(t),o=(r-new Date(Date.UTC(1899,11,30)))/864e5;return Math.floor(o)},createSheet:function(t,e){for(var r={},n={s:{c:1e7,r:1e7},e:{c:0,r:0}},a=this.typeConfig,i=0;i!==t.length;++i)for(var s=0;s!==t[i].length;++s){n.s.r>i&&(n.s.r=i),n.s.c>s&&(n.s.c=s),n.e.r<i&&(n.e.r=i),n.e.c<s&&(n.e.c=s);var l=t[i][s];if(l&&l.v){var p=o.utils.encode_cell({c:s,r:i});l.t||(a.number.assert(l.v)?l.t=C.NUMBER:a["boolean"].assert(l.v)?l.t=C.BOOLEAN:a.date.assert(l.v)?l.t=C.DATE:l.t=C.STRING),l.t===C.DATE&&(l.t=C.NUMBER,l.z=o.SSF._table[14],l.v=this.dateNum(l.v)),r[p]=l}}return r["!merges"]=e,n.s.c<1e7&&(r["!ref"]=o.utils.encode_range(n)),r},downloadHandler:function(t){var e=t.target,r=JSON.parse(h.getInstance().getItem(e.getAttribute(this.storageKey))),o=r.data,n=r.filename,a=r.mimeType,i=r.fileExtension,s=r.merges;this.export2file(o,a,n,i,s)},Workbook:function(){this.SheetNames=[],this.Sheets={}},string2ArrayBuffer:function(t){for(var e=new ArrayBuffer(t.length),r=new Uint8Array(e),o=0;o!==t.length;++o)r[o]=255&t.charCodeAt(o);return e},export2file:function(t,o,n,a,i){if(t=this.getRawData(t,a,n,i),g){var s="data:"+o+";"+this.charset+","+t;this.downloadDataURI(s,n,a)}else r(new e([t],{type:o+";"+this.charset}),n+a,!0)},downloadDataURI:function(t,e,r){var o=encodeURI(t),n=document.createElement("a");n.setAttribute("href",o),n.setAttribute("download",e+r),document.body.appendChild(n),n.click()},getBookType:function(t){switch(t){case v.XLS:return v.BIFF2;default:return t}},getRawData:function(t,e,r,n){var a=e.substring(1);if(b(a)){var i=new this.Workbook,s=this.createSheet(t,n),l=this.getBookType(a);r=r||"",i.SheetNames.push(r),i.Sheets[r]=s;var p={bookType:l,bookSST:!1,type:"binary"},c=o.write(i,p);t=this.string2ArrayBuffer(c)}return t},getFileSize:function(t,e){var r=this.getRawData(t,e);return r instanceof ArrayBuffer?r.byteLength:this.string2ArrayBuffer(r).byteLength},update:function(t){return this.remove(),new d(this.selectors,n({},this.defaults,t))},reset:function(){return this.remove(),new d(this.selectors,this.settings)},remove:function(){var t=this;this.selectors.forEach(function(e){var r=e.querySelector("caption."+t.defaultCaptionClass);r&&e.removeChild(r)})}};var h=function(){this._instance=null,this.store=sessionStorage,this.namespace=d.prototype.defaultNamespace,this.getKey=function(t){return this.namespace+t},this.setItem=function(t,e,r){var o=this.getKey(t);if(!this.exists(t)||r)return"string"!=typeof e?u('"value" must be a string.'):(this.store.setItem(o,e),t)},this.getItem=function(t){var e=this.getKey(t);return this.store.getItem(e)},this.exists=function(t){var e=this.getKey(t);return null!==this.store.getItem(e)},this.removeItem=function(t){var e=this.getKey(t);return this.store.removeItem(e)}};h.getInstance=function(){return this._instance||(this._instance=new h),this._instance};var m=function(){this.rcMap=[],this.merges=[],this.isIgnore=function(t,e){var r=m.prototype.TYPE.IGNORE;return this.getRowColMapProp(t,e,r)},this.isEmpty=function(t,e){var r=m.prototype.TYPE.EMPTY;return this.getRowColMapProp(t,e,r)},this.isRowSpan=function(t){var e=m.prototype.TYPE.ROWSPAN;return this.getRowColMapProp(t,void 0,e)},this.isColSpan=function(t){var e=m.prototype.TYPE.COLSPAN;return this.getRowColMapProp(t,void 0,e)},this.isSpan=function(t){return this.isRowSpan(t)||this.isColSpan(t)},this.isMerge=function(t){return this.merges.length>0},this.addMerge=function(t,e){var r=m.prototype.TYPE.MERGE;this.merges.push(e),this.setRowColMapProp(t,void 0,r,this.merges)},this.getRowColMapProp=function(t,e,r){if(this.rcMap[t]){if("undefined"==typeof r)return this.rcMap[t][e];if("undefined"==typeof e)return this.rcMap[t][r];if(this.rcMap[t][e])return this.rcMap[t][e][r]}},this.setRowColMapProp=function(t,e,r,o){return this.rcMap[t]=this.rcMap[t]||[],"undefined"==typeof r?this.rcMap[t][e]=o:"undefined"==typeof e?this.rcMap[t][r]=o:(this.rcMap[t][e]=this.rcMap[t][e]||[],this.rcMap[t][e][r]=o)},this.generateTotal=function(t,e){var r=m.prototype.TYPE.VALUE,o=0;return this.isRowSpan(t)&&this.isColSpan(t)?o=this.getRowColMapProp(t,e,r)||0:this.getRowColMapProp(t,e,r)&&(o=this.getRowColMapProp(t,e,r)),o},this.convertSpanToArray=function(t,e,r,o,n){if(this.rcMap[t]&&this.isSpan(t)){var a=this.generateTotal(t,e);return b(r)?new Array(a).concat(o):new Array(a).concat(o).join(n)}return o},this.handleRowColMapProp=function(t,e,r,o,n,a){switch(t){case m.prototype.TYPE.IGNORE:return;case m.prototype.TYPE.EMPTY:return" ";case m.prototype.TYPE.DEFAULT:default:return this.convertSpanToArray(e,r,o,n,a)}}};m.prototype={OFFSET:1,TYPE:{IGNORE:"ignore",EMPTY:"empty",MERGE:"merge",ROWSPAN:"rowspan",ROWSPANTOTAL:"rowspantotal",COLSPAN:"colspan",COLSPANTOTAL:"colspantotal",DEFAULT:"default",VALUE:"value"},build:function(t,e){var r=this,o=r.OFFSET,n=r.rowLength=t.rows.length,s=function(t,e){r.setRowColMapProp(t,e,r.TYPE.IGNORE,!0)},l=function(t,e){r.setRowColMapProp(t,e,r.TYPE.EMPTY,!0)},p=function(t,e,o){for(var a,i,s,l,p,f,d,h,m,g=+t.getAttribute("rowspan"),b=+t.getAttribute("colspan"),v=0;v<g;v++){if(v+e>=n)return;if(b&&(a=c(t,v+e,o,v>0,g)),g<=1)return!1;var y=r.rcMap["c"+(o-1)]?r.rcMap["c"+(o-1)][v+e]:0;if(y&&(r.rcMap["c"+o]=r.rcMap["c"+o]||[],r.rcMap["c"+o][v+e]=(r.rcMap["c"+o][v+e]||0)+y),g&&0===v&&b>1)for(var C=0;C<g;C++)r.rcMap["c"+(o+1)]=r.rcMap["c"+(o+1)]||[],r.rcMap["c"+(o+1)][v+e+C]=(r.rcMap["c"+(o+1)][v+e+C]||0)+Math.max(1,b);if(v>=1&&(i=r.getRowColMapProp(v+e,void 0,r.TYPE.ROWSPAN)||0,r.setRowColMapProp(v+e,void 0,r.TYPE.ROWSPAN,i+1),!a&&(l=r.getRowColMapProp(v+e,o-i,r.TYPE.VALUE)||0,r.setRowColMapProp(v+e,o-i,r.TYPE.VALUE,l+1),g>1&&1===v))){var w=r.rcMap["c"+o]&&r.rcMap["c"+o][v+e];p=r.getRowColMapProp(e,void 0,r.TYPE.COLSPANTOTAL)||0,s=r.getRowColMapProp(e,void 0,r.TYPE.COLSPAN)||0,f=e,d=e+g-1,h=o+p-s+(w||0),m=h+Math.max(1,b)-1,u(f,h,d,m)}}},c=function(t,e,n,a,i){var s,l,p,c,f=+t.getAttribute("colspan"),d=r.getRowColMapProp(e,void 0,r.TYPE.COLSPAN)||0,h=r.getRowColMapProp(e,void 0,r.TYPE.COLSPANTOTAL)||0;return!(f<=1)&&(r.setRowColMapProp(e,void 0,r.TYPE.COLSPAN,d+1),r.setRowColMapProp(e,void 0,r.TYPE.COLSPANTOTAL,h+f),a?(r.setRowColMapProp(e,n-d,r.TYPE.VALUE,f),!0):(s=e,l=e+(i||1)-o,p=n+h-d,c=n+h-d+(f-o),r.setRowColMapProp(e,n+o,r.TYPE.VALUE,f-o),u(s,p,l,c),void 0))},u=function(t,e,o,n){var a={s:{r:t,c:e},e:{r:o,c:n}};return r.addMerge(t,a)};return a(t.rows).map(function(r,o){(~e.ignoreRows.indexOf(o-t.thAdj)||i(r,e.ignoreCSS))&&s(o),i(r,e.emptyCSS)&&l(o);var n=r.querySelectorAll("th, td");return a(n).map(function(t,r){(~e.ignoreCols.indexOf(r)||i(t,e.ignoreCSS))&&s(o,r),i(t,e.emptyCSS)&&l(o,r),t.hasAttribute("rowspan")?p(t,o,r):t.hasAttribute("colspan")&&c(t,o,r)})}),r}};var g=function(t){return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substring(0,4))}(navigator.userAgent||navigator.vendor||window.opera),b=function(){return function(t){return o&&!g&&!d.prototype.formatConfig[t].enforceStrictRFC4180}}(),v=function(){return d.prototype.CONSTANTS.FORMAT}(),y=function(){return Object.keys(v).map(function(t){return v[t]})}(),C=function(){return d.prototype.CONSTANTS.TYPE}();Array.prototype.processRows=function(t,e){return b(t)?this.map(l).filter(s):this.filter(s).join(e)},Array.prototype.processCols=function(t,e){return b(t)?this.filter(s):this.filter(s).join(e)};var w=function(){var t=0;return function(e){var r=e.getAttribute(d.prototype.tableKey);return r||(r=e.id?e.id:d.prototype.defaultNamespace+ ++t,e.setAttribute(d.prototype.tableKey,r)),r}}(),x=function(){return function(t){var e,r,o=0,n=t.type;if(t=JSON.stringify(t),0===t.length)return o;for(e=0;e<t.length;e++)r=t.charCodeAt(e),o=(o<<5)-o+r,o|=0;return o.toString(16).substring(1)+"-"+n}}(),S=function(){var t=null;return function(e,r,o,n){for(var a=o.bind(n),i=0;i<e.length;++i)t&&e[i].removeEventListener(r,t,!1),e[i].addEventListener(r,a,!1);t=a}}();if(t){t.fn.tableExport=function(t){return new d(this,t)};for(var E in d.prototype)t.fn.tableExport[E]=d.prototype[E]}return d.TableExport=d,d});
