(this.webpackJsonpcommitmuse=this.webpackJsonpcommitmuse||[]).push([[0],{34:function(e,n,t){e.exports=t(52)},35:function(e,n,t){},38:function(e,n,t){},39:function(e,n,t){},40:function(e,n,t){},42:function(e,n,t){},52:function(e,n,t){"use strict";t.r(n);t(35);var r=t(2),a=t.n(r),c=t(3),o=t(33),i=t(0),s=t.n(i),u=t(18),l=t(1);t(38);function p(e){return s.a.createElement("section",{className:"NotFound-page"},s.a.createElement("h1",null,"This page doesn't exist"),s.a.createElement("h2",null,"Check your link please"),s.a.createElement("button",{onClick:function(){return e.history.goBack()}},"Go back"))}t(39),t(40);var d=t(12),f=t(13),h={MainPrimary:"#253784",MainSecondary:"#3c3d4d",MainSuccess:"#21b881",MainError:"#dc3545",MainWarning:"#ffc107",MainInfo:"#17a2b8",MainLight:"#f2f5f9",MainWhite:"#ffffff",BodyLight:"#8795a9",BodyDarker:"#5e6672",Title:"#354151",Border:"#e1e8ee",BorderDark:"#c6ccd1",Background:"#f2f3f4",ActivePrimary:"#4152ab",ActiveSecondary:"#282833",ActiveSuccess:"#18aa75",ActiveError:"#bd2130",ActiveWarning:"#d39e00",ActiveInfo:"#117a8b",ActiveLight:"#e4e7eb",ActiveBorder:"#c8ced4",HoverPrimary:"#4558b8",HoverSecondary:"#323340",HoverError:"#c82333",HoverSuccess:"#218838",HoverInfo:"#138496",HoverWarning:"#e0a800",HoverLight:"#ebeef2",HoverBorder:"#d4dbe0",HoverWhite:"#f9f9f9"},m=t(10),v=function(e){return e?(Object.keys(e).forEach((function(n){null!==e[n]&&void 0!==e[n]&&""!==e[n]&&0!==e[n].length||delete e[n]})),m.isEmpty(e)?"":"?"+Object.keys(e).map((function(n){return n+"="+e[n]})).join("&")):""},g=(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),window.innerWidth,t(42),function(e){return"web/assets/icons/"+e+".svg"}),b={GeneralLabor:g("GeneralLabor"),Carpentry:g("Carpentry"),Concrete:g("Concrete"),Demo:g("Mallet"),Drywall:g("Drywall"),Electrical:g("Electrical"),Flooring:g("Flooring"),Glass:g("Glass"),HVAC:g("HVAC"),Ironwork:g("Ironwork"),Landscaping:g("Landscaping"),Masonry:g("Masonry"),Painting:g("Painting"),Plumbing:g("Plumbing"),Roofing:g("Roofing"),"Tile&Stone":g("Tile&Stone"),Welding:g("Welding"),active_star:g("active_star"),arrow_right:g("arrow_right"),save_profile:g("save_profile"),select_down:g("select_down"),select_up:g("select_up"),save_pdf:g("save_pdf"),share:g("share"),close:g("close"),star:g("star"),usa:g("usa"),pdf:g("pdf"),gigs_handshake:g("gigs_handshake"),briefcase:g("briefcase"),refer:g("refer"),certificate:g("certificate"),round_down:g("round_down"),checkmark:g("checkmark"),logo:g("logo"),calendar:g("calendar"),person:g("person"),share_gray:g("share_gray"),plus:g("plus"),star_outline:g("star_outline"),emptyProjects:g("emptyProjects"),send:g("Send"),sendWhite:g("SendWhite"),arrow_up:g("arrow_up"),tooltip_arrow:g("tooltip_arrow"),delete:g("Delete"),edit:g("Edit"),account:g("account"),company:g("company")};function y(e){var n=e.icon.replace(/ /g,"");return b[n]?i.createElement("img",{onClick:e.onClick,src:"/"+b[n],alt:e.icon+"icon",style:e.style,className:e.className}):i.createElement("span",null,"No such icon")}function k(){var e=Object(d.a)(["\n  // @ts-ignore\n  background: ",";\n  color: ",";\n  :hover {\n    // @ts-ignore\n    background: ",";\n  }\n"]);return k=function(){return e},e}var E=f.a.button(k(),(function(e){return h[e.background]}),(function(e){return e.color||"white"}),(function(e){return h[e.background.replace("Main","Hover")]}));function w(e){return i.createElement(E,{className:"Button-component".concat((n=e.className,n?" "+n:"")),style:e.style,onClick:e.onClick,disabled:e.disabled||e.loading,background:e.background||"MainPrimary",color:["MainLight","MainWhite"].includes(e.background||"")?h.Title:e.color},e.loading?i.createElement(_,null):i.createElement(i.Fragment,null,e.icon&&i.createElement(y,{icon:e.icon,style:{marginRight:6}})," ",e.children));var n}var _=function(){return i.createElement("div",{className:"lds-ring"},i.createElement("div",null),i.createElement("div",null),i.createElement("div",null),i.createElement("div",null))};function O(e){var n=Object(l.g)();return i.createElement("header",{className:"PageHeader-module"},i.createElement("nav",null,i.createElement("div",{className:"logo"},i.createElement("img",{src:"/assets/icons/logo.svg",alt:"logo"}),i.createElement("p",null,"LOGO")),i.createElement("div",{className:"profile"},e.user?i.createElement(i.Fragment,null,e.user.first_name+" "+e.user.last_name):i.createElement(w,{onClick:function(){return n.push("/welcome")}},"Sign in"))))}function x(e){return s.a.createElement("article",{className:"MyIsa-page"},s.a.createElement(O,null),s.a.createElement("section",{className:"content"},s.a.createElement("div",{className:"myIsa"},"My ISA\u2019s")))}function j(e){return s.a.createElement("article",null,s.a.createElement("h1",null,"OnBoarding page"))}function A(e){var n=e.currentUser,t=e.fetchUser;return s.a.createElement(u.a,null,s.a.createElement(l.d,null,s.a.createElement(l.b,{path:"/my-isa",render:function(e){return s.a.createElement(x,Object.assign({},e,{currentUser:n,fetchUser:t}))}}),s.a.createElement(l.b,{path:"/on-boarding",render:function(e){return s.a.createElement(j,Object.assign({},e,{currentUser:n,fetchUser:t}))}}),s.a.createElement(l.a,{path:"/",to:"/my-isa",exact:!0}),s.a.createElement(l.b,{path:"*",render:function(e){return s.a.createElement(p,e)}})))}var N=t(32),I=t(9),S=t(14),M=t(29),P={first_name:"",last_name:"",email:"",phone_number:"",password:"",company_name:"",company_type:"",title:"",address:"",company_website:"",building_types:"",project_types:"",number_of_hourly_employees_range:"0-5"};var C=t(30),T=Object(I.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,n=arguments.length>1?arguments[1]:void 0;return"SET_AUTH_FIELD"===n.type?Object(M.a)({},e,Object(S.a)({},n.key,n.val)):e}}),H=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=[C.a];return Object(I.d)(T,e,I.a.apply(void 0,n))},J=t(15),B=t(31),F={dev:{MAIN_API:"http://localhost:5000/"},staging:{MAIN_API:"http://staging.com/"},production:{MAIN_API:"http://production.com/"}},W=function(){return F.dev},L=function(e){for(var n,t=arguments.length,r=new Array(t>1?t-1:0),a=1;a<t;a++)r[a-1]=arguments[a];(n=console).log.apply(n,[e].concat(r))},U=new function e(){var n=this;Object(J.a)(this,e),this.MAIN_API=W().MAIN_API,this.handleError=function(e){if("string"===typeof e.error)return e;var n=Object.values(e.error),t={error:Object.keys(e.error).map((function(e,t){return e+": "+(Array.isArray(n[t])?n[t].join(", "):Object.values(n[t]).join(", "))})).join("\n")};return L("Error in handleError method in BaseService",t),t},this.handleResponseType=function(){var e=Object(c.a)(a.a.mark((function e(n){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t=n.headers.get("content-type"))||-1===t.indexOf("application/json")){e.next=7;break}return e.next=4,n.json();case 4:return e.abrupt("return",e.sent);case 7:return e.t0=L,e.next=10,n.text();case 10:return e.t1=e.sent,(0,e.t0)("Received type is not JSON but *: ",e.t1),e.abrupt("return",null);case 13:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),this.headers=function(){return{"Content-Type":"application/json","Access-Control-Allow-Headers":"*"}},this.getJSON=function(){var e=Object(c.a)(a.a.mark((function e(t,r){var c,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(n.MAIN_API+t+"".concat(v(r)),{method:"GET",headers:n.headers(),credentials:"include"});case 2:return c=e.sent,e.next=5,n.handleResponseType(c);case 5:if(!(o=e.sent)||!o.error){e.next=8;break}return e.abrupt("return",n.handleError(o));case 8:return e.abrupt("return",o);case 9:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}(),this.postJSON=function(){var e=Object(c.a)(a.a.mark((function e(t,r,c){var o,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(n.MAIN_API+t,{method:"POST",headers:n.headers(),body:JSON.stringify(r),credentials:"include"});case 3:return o=e.sent,c&&L(o),e.next=7,n.handleResponseType(o);case 7:if(!(i=e.sent)||!i.error){e.next=10;break}return e.abrupt("return",n.handleError(i));case 10:return e.abrupt("return",i);case 13:throw e.prev=13,e.t0=e.catch(0),L("Error doing postJSON in base.service.ts: ",e.t0),e.t0;case 17:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(n,t,r){return e.apply(this,arguments)}}(),this.patchJSON=function(){var e=Object(c.a)(a.a.mark((function e(t,r){var c,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(n.MAIN_API+t,{method:"PATCH",headers:n.headers(),body:JSON.stringify(r),credentials:"include"});case 3:return c=e.sent,e.next=6,n.handleResponseType(c);case 6:if(!(o=e.sent)||!o.error||"object"!==typeof o.error){e.next=9;break}return e.abrupt("return",n.handleError(o));case 9:return e.abrupt("return",o);case 12:throw e.prev=12,e.t0=e.catch(0),L("Error doing patchJSON in base.service.ts: ",e.t0),e.t0;case 16:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(n,t){return e.apply(this,arguments)}}(),this.deleteJSON=function(){var e=Object(c.a)(a.a.mark((function e(t,r){var c,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(n.MAIN_API+t,{method:"DELETE",headers:n.headers(),body:JSON.stringify(r),credentials:"include"});case 3:return c=e.sent,e.next=6,n.handleResponseType(c);case 6:if(!(o=e.sent)||!o.error||"object"!==typeof o.error){e.next=9;break}return e.abrupt("return",n.handleError(o));case 9:return e.abrupt("return",o);case 12:throw e.prev=12,e.t0=e.catch(0),L("Error doing patchJSON in base.service.ts: ",e.t0),e.t0;case 16:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(n,t){return e.apply(this,arguments)}}(),this.postFormData=function(){var e=Object(c.a)(a.a.mark((function e(t,r,c){var o,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(n.MAIN_API+t,{method:c||"post",credentials:"include",body:r});case 3:return o=e.sent,e.next=6,n.handleResponseType(o);case 6:if(!(i=e.sent)||!i.error){e.next=9;break}return e.abrupt("return",n.handleError(i));case 9:return e.abrupt("return",i);case 12:throw e.prev=12,e.t0=e.catch(0),L("Error doing postFormData in base.service.ts: ",e.t0),e.t0;case 16:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(n,t,r){return e.apply(this,arguments)}}()},D=function(){function e(){Object(J.a)(this,e)}return Object(B.a)(e,[{key:"getCurrentUser",value:function(){var e=Object(c.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U.getJSON("user");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"checkAuth",value:function(){var e=Object(c.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U.getJSON("check-auth");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"editUser",value:function(){var e=Object(c.a)(a.a.mark((function e(n){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U.patchJSON("user",n);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()}]),e}();function R(){var e=Object(d.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  img {\n    width: 70px;\n    position: relative;\n    top: -55px;\n  }\n  svg {\n    -webkit-transform-origin: 50% 65%;\n    transform-origin: 50% 65%;\n  }\n\n  svg polygon {\n    stroke-dasharray: 17;\n    -webkit-animation: dash 2.5s cubic-bezier(0.35, 0.04, 0.63, 0.95) infinite;\n    animation: dash 2.5s cubic-bezier(0.35, 0.04, 0.63, 0.95) infinite;\n  }\n\n  @-webkit-keyframes dash {\n    to {\n      stroke-dashoffset: 136;\n    }\n  }\n\n  @keyframes dash {\n    to {\n      stroke-dashoffset: 136;\n    }\n  }\n  @-webkit-keyframes rotate {\n    100% {\n      -webkit-transform: rotate(360deg);\n      transform: rotate(360deg);\n    }\n  }\n  @keyframes rotate {\n    100% {\n      -webkit-transform: rotate(360deg);\n      transform: rotate(360deg);\n    }\n  }\n"]);return R=function(){return e},e}var G=f.a.div(R());function z(e){return s.a.createElement(G,null,s.a.createElement("svg",{id:"triangle",width:"150px",height:"150px",viewBox:"-3 -4 39 39"},s.a.createElement("polygon",{fill:"#FFFFFF",stroke:"#333333",strokeWidth:"1",points:"16,0 32,32 0,32"})),s.a.createElement(y,{icon:"logo"}))}var V=H(),$=new D;var q=function(){var e=Object(i.useState)(null),n=Object(o.a)(e,2),t=n[0],r=n[1],u=function(){var e=Object(c.a)(a.a.mark((function e(){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,$.checkAuth();case 3:if(!e.sent){e.next=11;break}return e.next=7,$.getCurrentUser();case 7:return n=e.sent,e.abrupt("return",r(n));case 11:return e.abrupt("return",r(void 0));case 12:e.next=18;break;case 14:e.prev=14,e.t0=e.catch(0),L("Error getting current user: ",e.t0),r(void 0);case 18:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(){return e.apply(this,arguments)}}();return Object(i.useLayoutEffect)((function(){u()}),[]),null!==t?s.a.createElement(N.a,{store:V},s.a.createElement(A,{currentUser:t,fetchUser:u})):s.a.createElement(z,null)},K=t(11),Q=t.n(K);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));Q.a.render(s.a.createElement(q,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[34,1,2]]]);
//# sourceMappingURL=main.4ce55955.chunk.js.map