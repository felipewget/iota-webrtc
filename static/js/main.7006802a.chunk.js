(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{656:function(e,t,n){e.exports=n(888)},679:function(e,t,n){},713:function(e,t){},715:function(e,t){},888:function(e,t,n){"use strict";n.r(t);n(46),n(50),n(51),n(52),n(53),n(54),n(55),n(56),n(57),n(58),n(59),n(60),n(61),n(62),n(63),n(64),n(65),n(66),n(67),n(68),n(69),n(70),n(71),n(72),n(73),n(74),n(75),n(36),n(76),n(77),n(78),n(79),n(80),n(81),n(82),n(83),n(84),n(85),n(86),n(87),n(88),n(89),n(90),n(91),n(92),n(93),n(94),n(95),n(96),n(97),n(98),n(99),n(100),n(39),n(101),n(102),n(103),n(104),n(105),n(106),n(107),n(108),n(109),n(110),n(111),n(112),n(113),n(114),n(115),n(116),n(117),n(118),n(119),n(120),n(121),n(122),n(123),n(124),n(125),n(126),n(127),n(128),n(129),n(130),n(131),n(132),n(133),n(134),n(135),n(136),n(137),n(138),n(139),n(140),n(141),n(142),n(143),n(144),n(145),n(146),n(147),n(148),n(149),n(150),n(151),n(152),n(153),n(154),n(155),n(156),n(157),n(158),n(159),n(160),n(161),n(162),n(163),n(164),n(165),n(166),n(167),n(168),n(169),n(170),n(171),n(172),n(173),n(174),n(175),n(41),n(176),n(177),n(178),n(179),n(42),n(180),n(181),n(182),n(183),n(184),n(185),n(186),n(187),n(188),n(189),n(190),n(191),n(192),n(193),n(194),n(195),n(196),n(197),n(198),n(199),n(200),n(201),n(202),n(203),n(204),n(205),n(206),n(207),n(208),n(209),n(210),n(211),n(212),n(213),n(214),n(215),n(216),n(217),n(218),n(219),n(220),n(221),n(222),n(223),n(224),n(225),n(226),n(227),n(228),n(229),n(230),n(231),n(232),n(233),n(234),n(235),n(236),n(237),n(238),n(40),n(239),n(240),n(241),n(242),n(243),n(244),n(245),n(43);var a=n(356),r=n(3),o=n.n(r),c=n(26),s=n.n(c),i=(n(679),n(933)),l=(n(557),n(419)),u=n(619),m=n(372),d=n(10),b=n(929),g=n(930),f=n(931),p=n(932),v=n(461),O=n.n(v),E=n(642),h=n(890),j=n(333),y=n.n(j),w=n(364),S=n(368),I=n.n(S),k=n(620),C=n.n(k),T=n(506),A=n.n(T),N=n(621),x=n(503),D=/[^A-Z9]+/g,M=81,P=27,R=4,G=3e3,L={SPAM_NET:{URL:"https://nodes.spamnet.iota.org:443",MWM:7},DEV_NET1:{URL:"https://nodes.devnet.iota.org:443",MWM:9},DEV_NET2:{URL:"https://nodes.devnet.thetangle.org:443",MWM:9}},U="/",_="/signup",W="/login",B="/chatroom/:roomId",H="/chatgui",V="#33B3A6";function J(e){var t="";if(!(window&&window.crypto&&window.crypto.getRandomValues))return console.error("No native crypto random available");for(;t.length<e;)t+=C.a.encode(window.crypto.getRandomValues(new Uint32Array(e))).replace(D,"");return t.substring(0,e)}var q=function(){return Math.floor((new Date).getTime()/1e3)},F=function(e,t){return I.a.SHA1(e+t).toString()},Q=function(){var e=Object(w.a)(y.a.mark(function e(t){return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(navigator&&navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)){e.next=2;break}return e.abrupt("return",navigator.mediaDevices.getUserMedia(t));case 2:return e.abrupt("return",new Error("User Media Not Supported!"));case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),z=function(e){var t,n=function(e){var t;try{t=JSON.parse(Object(N.extractJson)(e))}catch(n){console.log(n),console.log(e)}return t}(e);return JSON.parse((t=n,A.a.decompress(t,{inputEncoding:"Base64"})))},Z=function(e,t){var n=function(e){return A.a.compress(e,{outputEncoding:"Base64"})}(JSON.stringify(e)),a=Object(x.asciiToTrytes)(JSON.stringify(n));return[{address:J(M),tag:t,value:0,message:a}]},K=n(0),X=n.n(K),Y=n(623),$=n.n(Y),ee=n(622),te=n.n(ee),ne=n(924),ae=n(925),re=n(934),oe=function(e){var t=e.setShowPassword,n=e.password,a=e.setPassword,r=e.showPassword;return X.a.createElement(re.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:r?"text":"password",id:"password",value:n,onChange:function(e){return a(e.target.value)},InputProps:{endAdornment:X.a.createElement(ne.a,{position:"end"},X.a.createElement(ae.a,{edge:"end","aria-label":"toggle password visibility",onClick:function(){return t(function(e){return!e})}},r?X.a.createElement(te.a,null):X.a.createElement($.a,null)))}})},ce=function(e){var t=e.setValue,n=e.value,a=e.label;return X.a.createElement(re.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,label:a,type:"text",id:a.toLowerCase(),value:n,onChange:function(e){return t(e.target.value)}})},se=n(641),ie=n(7),le=n(624),ue=n.n(le),me=n(626),de=n.n(me),be=n(627),ge=n.n(be),fe=n(628),pe=n.n(fe),ve=n(926),Oe=n(927),Ee=n(936),he=n(928),je=n(625),ye=n.n(je),we={success:ue.a,warning:ye.a,error:de.a,info:ge.a},Se=Object(h.a)(function(e){return{success:{backgroundColor:ve.a[600]},error:{backgroundColor:e.palette.error.dark},info:{backgroundColor:e.palette.primary.main},warning:{backgroundColor:Oe.a[700]},icon:{fontSize:20},iconVariant:{opacity:.9,marginRight:e.spacing(1)},message:{display:"flex",alignItems:"center"}}});function Ie(e){var t=Se(),n=e.className,a=e.message,r=e.onClose,o=e.variant,c=Object(se.a)(e,["className","message","onClose","variant"]),s=we[o];return X.a.createElement(he.a,Object.assign({className:Object(ie.a)(t[o],n),"aria-describedby":"client-snackbar",message:X.a.createElement("span",{id:"client-snackbar",className:t.message},X.a.createElement(s,{className:Object(ie.a)(t.icon,t.iconVariant)}),a),action:[X.a.createElement(ae.a,{key:"close","aria-label":"close",color:"inherit",onClick:r},X.a.createElement(pe.a,{className:t.icon}))]},c))}var ke=Object(h.a)(function(e){return{margin:{margin:e.spacing(1)}}});function Ce(e){var t=e.variant,n=e.message,a=e.open,r=e.onClose,o=e.autoHideDuration;ke();return X.a.createElement("div",null,X.a.createElement(Ee.a,{anchorOrigin:{vertical:"top",horizontal:"right"},open:a,autoHideDuration:o,onClose:r},X.a.createElement(Ie,{onClose:function(e,t){"clickaway"!==t&&r()},variant:t,message:n})))}var Te={username:"",userHash:"",loggedIn:!1,seed:null,myId:null,tangleNet:L.DEV_NET1,iceServers:[{urls:"stun:global.stun.twilio.com:3478?transport=udp"},{urls:"stun:stun1.l.google.com:19302"},{urls:"stun:stun2.l.google.com:19302"},{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun.vodafone.ro:3478"},{urls:"stun:stun.xs4all.nl:3478"}],accountData:null,monitoringInterval:3e3,myAccount:null,provider:L.DEV_NET1.URL,myBalance:0},Ae=X.a.createContext(),Ne=Object(h.a)(function(e){return{"@global":{body:{backgroundColor:e.palette.common.white}},paper:{marginTop:e.spacing(4),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:V},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2),backgroundColor:V}}});function xe(e){var t,n=e.history,a=Object(r.useContext)(Ae),c=Object(r.useGlobal)("seed"),s=Object(d.a)(c,2)[1],i=Object(r.useGlobal)("loggedIn"),l=Object(d.a)(i,2)[1],u=Object(r.useGlobal)("username"),m=Object(d.a)(u,2)[1],v=Object(r.useGlobal)("myId"),h=Object(d.a)(v,2)[1],j=Object(r.useState)("info"),y=Object(d.a)(j,2),w=y[0],S=y[1],I=Object(r.useState)("Info"),k=Object(d.a)(I,2),C=k[0],T=k[1],A=Object(r.useState)(!1),N=Object(d.a)(A,2),x=N[0],D=N[1];var M=Object(r.useState)(""),P=Object(d.a)(M,2),R=P[0],G=P[1],L=Object(r.useState)(""),U=Object(d.a)(L,2),_=U[0],W=U[1],B=Object(r.useState)(""),H=Object(d.a)(B,2),V=H[0],J=H[1],q=Object(r.useState)(!1),Q=Object(d.a)(q,2),z=Q[0],Z=Q[1],K=Object(r.useState)(!1),X=Object(d.a)(K,2),Y=X[0],$=X[1];a&&(t=function(){var e,t=a.getCollection("users"),n=null,o="";if(Y?n=t.findOne({seed:R}):(o=F(V,_),n=t.findOne({userHash:o})),!n)return e="error",T("User not found"),S(e),void D(!0);var c=JSON.stringify(n);return localStorage.setItem("userData",c),s(n.seed),h(n.myId),m(n.username),l(!0),console.log(Object(r.getGlobal)())});var ee=Ne();return o.a.createElement(b.a,{component:"main",maxWidth:"sm"},o.a.createElement("div",{className:ee.paper},o.a.createElement(g.a,{className:ee.avatar},o.a.createElement(O.a,null)),o.a.createElement(E.a,{component:"h1",variant:"h5"},"Login with ".concat(Y?"seed":"username/password")),o.a.createElement("form",{className:ee.form},Y?o.a.createElement(ce,{label:"Seed",value:R,setValue:G}):o.a.createElement(o.a.Fragment,null,o.a.createElement(ce,{label:"Username",value:V,setValue:J}),o.a.createElement(oe,{setShowPassword:Z,password:_,setPassword:W,showPassword:z})),o.a.createElement(f.a,{type:"button",fullWidth:!0,variant:"contained",color:"primary",className:ee.submit,onClick:t},"Login"),o.a.createElement(p.a,{container:!0},o.a.createElement(p.a,{item:!0,xs:!0},o.a.createElement(f.a,{type:"button",onClick:function(){$(function(e){return!e})}},Y?"Login with name/password":"Login with seed")),o.a.createElement(p.a,{item:!0},o.a.createElement(f.a,{type:"button",onClick:function(){n.push("/signup")}},"Create an account"))))),o.a.createElement(Ce,{variant:w,message:C,open:x,onClose:function(){return D(!1)},autoHideDuration:2e3}))}var De=n(510),Me=n(629),Pe=n(630),Re=n(639),Ge=n(631),Le=n(421),Ue=n(640),_e=n(418),We=n.n(_e),Be=n(632),He=n.n(Be),Ve=n(462),Je=n.n(Ve),qe=n(633),Fe=n(29),Qe=(n(464),n(507),function(e){function t(e){var n,r=e.seed,o=e.username,c=(e.myId,e.roomId),s=e.minWeight,i=e.iceServers,l=e.interval,u=e.provider;return Object(Me.a)(this,t),(n=Object(Re.a)(this,Object(Ge.a)(t).call(this))).type={WEBRTCSIGNAL:"WEBRTCSIGNAL",REQUEST:"REQUEST",DONATE_OFFER:"DONATE_OFFER",DONATE_ACCEPT:"DONATE_ACCEPT",CHAT_MESSAGE:"CHAT_MESSAGE"},n.oldTransactions={},n.peerList={},n.stopRefreshingAccount=function(){return clearInterval(n.accountInterval)},n.startMonitoring=Object(w.a)(y.a.mark(function e(){var t;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={video:!0,audio:!0},e.next=3,Q(t);case 3:n.stream=e.sent,n.currentTimestamp=q();try{n.broadcastRequest(),n.isMonitoring=!0,n.monitorRequest()}catch(a){n.isMonitoring=!1,console.error(a)}case 6:case"end":return e.stop()}},e)})),n.monitorRequest=Object(w.a)(y.a.mark(function e(){var t,a,r;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.getNewTransactions();case 3:t=e.sent,a=n.getBundles(t),r=n.getSignals(a),console.log("New signals from Tangle:"),console.log(r),n.processSignals(r),n.isMonitoring&&setTimeout(n.monitorRequest,n.monitorInterval),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),setTimeout(n.monitorRequest,n.monitorInterval),console.error(e.t0);case 16:case"end":return e.stop()}},e,null,[[0,12]])})),n.sendDonationOffer=function(e){var t={type:n.type.DONATE_OFFER};n.sendMessage(e,JSON.stringify(t))},n.broadcastRequest=function(){var e={id:n.myId,username:n.myUsername,type:n.type.REQUEST};n.broadcastTransaction(e)},n.broadcastTransaction=function(e){var t=Z(e,n.roomId);n.API.prepareTransfers(n.seed,t).then(function(e){return n.API.sendTrytes(e,R,n.minWeight)})},n.getNewTransactions=Object(w.a)(y.a.mark(function e(){var t,a;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={tags:[n.roomId]},e.next=3,n.API.findTransactionObjects(t);case 3:return a=e.sent,e.abrupt("return",a.filter(function(e){var t=e.timestamp,a=e.bundle;return t>n.currentTimestamp&&!n.oldTransactions[a]}));case 5:case"end":return e.stop()}},e)})),n.getBundles=function(e){var t={},a=[],r=!0,o=!1,c=void 0;try{for(var s,i=e[Symbol.iterator]();!(r=(s=i.next()).done);r=!0){var l=s.value,u=l.bundle;n.oldTransactions[u]=!0,t[u]||(t[u]=[]),t[u].push(l)}}catch(d){o=!0,c=d}finally{try{r||null==i.return||i.return()}finally{if(o)throw c}}for(var m in t)a.push(t[m]);return a.map(function(e){return e.sort(function(e,t){return e.currentIndex>t.currentIndex?1:-1})})},n.getSignals=function(e){return e.reduce(function(e,t){var a=z(t),r=a.type,o=a.id;return r===n.type.REQUEST&&o===n.myId||e.push(a),e},[])},n.startOffering=function(e){var t=e.id,a=e.username;if(!n.peerList[t]){var r=Object(Le.a)(n),o=r.stream,c=r.config,s=n.createPeer({initiator:!0,stream:o,id:t,config:c});n.attachEventHandlers(s,t,a)}},n.startAnswering=function(e,t,a,r){if(e===n.myId){if(!n.peerList[t]){console.log("started connector");var o=Object(Le.a)(n),c=o.config,s=o.stream,i=n.createPeer({initiator:!1,stream:s,id:t,config:c});n.attachEventHandlers(i,t,a)}var l=!0,u=!1,m=void 0;try{for(var d,b=r[Symbol.iterator]();!(l=(d=b.next()).done);l=!0){var g=d.value;n.peerList[t].signal(g)}}catch(f){u=!0,m=f}finally{try{l||null==b.return||b.return()}finally{if(u)throw m}}}},n.processSignals=function(e){var t=!0,a=!1,r=void 0;try{for(var o,c=e[Symbol.iterator]();!(t=(o=c.next()).done);t=!0){var s=o.value,i=s.type,l=s.id,u=s.peerId,m=s.username,d=s.data;switch(i){case n.type.REQUEST:n.startOffering(s);break;case n.type.WEBRTCSIGNAL:n.startAnswering(l,u,m,d);break;default:console.log("Unknown signal")}}}catch(b){a=!0,r=b}finally{try{t||null==c.return||c.return()}finally{if(a)throw r}}},n.createPeer=function(e){var t=e.initiator,a=e.stream,r=e.id,o=e.config,c=new He.a({initiator:t,stream:a,config:o,trickle:!0});return n.peerList[r]=c},n.attachEventHandlers=function(e,t,r){var o=Object(qe.debounce)(function(e){var t=e.signalData,a=e.signalQueue;n.broadcastTransaction(t),a.length=0},1e3),c={id:t,username:r},s=[];e.on("signal",function(e){s.push(e);var r={id:t,username:n.myUsername,type:n.type.WEBRTCSIGNAL,peerId:n.myId,data:[].concat(s)};o({signalData:r,signalQueue:s}),n.emit("signal",Object(a.a)({},c,{signalQueue:s}))}),e.on("data",function(){var t=Object(w.a)(y.a.mark(function t(r){var o,s,i,l;return y.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:o=r.toString(),o=JSON.parse(o),t.t0=o.type,t.next=t.t0===n.type.CHAT_MESSAGE?5:t.t0===n.type.DONATE_OFFER?7:t.t0===n.type.DONATE_ACCEPT?13:16;break;case 5:return n.emit("chatmessage",Object(a.a)({},c,{message:o})),t.abrupt("break",16);case 7:return t.next=9,n.API.getNewAddress(n.seed,{security:2});case 9:return s=t.sent,i={type:n.type.DONATE_ACCEPT,address:s},e.send(JSON.stringify(i)),t.abrupt("break",16);case 13:return l=[{value:1,address:o.address}],n.API.prepareTransfers(n.seed,l).then(function(e){return n.API.sendTrytes(e,R,n.minWeight)}).catch(function(e){return console.log(e)}),t.abrupt("break",16);case 16:n.emit("data",Object(a.a)({},c,{data:r.toString()}));case 17:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()),e.on("stream",function(e){n.emit("stream",Object(a.a)({},c,{srcObject:e}))}),e.on("track",function(e,t){console.log("track"),n.emit("track",Object(a.a)({},c,{track:e,stream:t}))}),e.on("connect",function(){n.emit("connect",c)}),e.on("close",function(){console.log("close"),n.emit("close",c),e.destroy(),delete n.peerList[t]}),e.on("error",function(e){console.log("error")})},n.stopStreaming=function(){if(n.stream){var e=n.stream.getTracks(),t=!0,a=!1,r=void 0;try{for(var o,c=e[Symbol.iterator]();!(t=(o=c.next()).done);t=!0){o.value.stop()}}catch(s){a=!0,r=s}finally{try{t||null==c.return||c.return()}finally{if(a)throw r}}}},n.stopMonitoring=function(){n.isMonitoring=!1},n.endMonitoring=function(){n.stopStreaming(),n.isMonitoring=!1;for(var e=0,t=Object.keys(n.peerList);e<t.length;e++){var a=t[e];n.peerList[a].destroy()}n.peerList={}},n.seed=r,n.myUsername=o,n.myId=Je()(),n.roomId=c,n.minWeight=s,n.monitorInterval=l,n.config={iceServers:i},n.API=Object(Fe.composeAPI)({provider:u}),n.API.getAccountData(r,{security:2}).then(function(e){return n.emit("refreshAccount",e)}),n.accountInterval=setInterval(function(){return n.API.getAccountData(r,{security:2}).then(function(e){return n.emit("refreshAccount",e)})},2e4),n}return Object(Ue.a)(t,e),Object(Pe.a)(t,[{key:"sendMessage",value:function(e,t){var n=this.peerList[e];n&&n.connected&&n.send(t)}},{key:"broadcastMessage",value:function(e){for(var t=0,n=Object.keys(this.peerList);t<n.length;t++){var a=n[t];this.peerList[a].connected&&this.peerList[a].send(e)}}}]),t}(We.a)),ze=X.a.memo(function(e){var t=e.username,n=(e.id,e.srcObject),a=e.sendDonationOffer;return X.a.createElement("div",{className:"peer"},X.a.createElement("video",{className:"peer__video",autoPlay:!0,ref:function(e){return function(e){if(e)try{e.srcObject=n}catch(t){console.log("error")}}(e)},width:300,height:300},X.a.createElement("track",{kind:"captions",srcLang:"en",label:t})),X.a.createElement("div",{className:"peer__username"},"User: ".concat(t)),X.a.createElement("button",{type:"button",className:"peer__donate",onClick:a},"Send 1 iota token"))});function Ze(e){var t=e.match.params.roomId,n=e.history,a=Object(r.useGlobal)("username"),c=Object(d.a)(a,1)[0],s=Object(r.useGlobal)("myId"),i=Object(d.a)(s,1)[0],l=Object(r.useGlobal)("tangleNet"),u=Object(d.a)(l,1)[0],m=Object(r.useGlobal)("iceServers"),b=Object(d.a)(m,1)[0],g=Object(r.useGlobal)("seed"),f=Object(d.a)(g,1)[0],p=Object(r.useState)([]),v=Object(d.a)(p,2),O=v[0],E=v[1],h=Object(r.useState)([]),j=Object(d.a)(h,2),y=j[0],w=j[1],S=Object(r.useState)(0),I=Object(d.a)(S,2),k=I[0],C=I[1],T=Object(r.useState)(null),A=Object(d.a)(T,2),N=A[0],x=A[1],D=Object(r.useState)(0),M=Object(d.a)(D,2),P=M[0],R=M[1],L={username:c,seed:f,myId:i,roomId:t,minWeight:u.MWM,iceServers:b,interval:G,provider:u.URL};return Object(r.useEffect)(function(){var e=new Qe(L);return x(e),e.startMonitoring(),e.on("connect",function(e){E(function(t){return[].concat(Object(De.a)(t),[e])}),C(O.length)}),e.on("stream",function(e){w(function(t){return[].concat(Object(De.a)(t),[e])})}),e.on("close",function(e){w(function(t){return t.filter(function(t){return t.id!==e.id})}),C(O.length)}),e.on("refreshAccount",function(e){!function(e){var t=e.balance;console.log(t),console.log(P),R(t)}(e)}),window.onbeforeunload=function(){e.endMonitoring()},function(){console.log("Chatroom closed"),window.onbeforeunload=void 0,e.endMonitoring(),e.stopRefreshingAccount()}},[]),o.a.createElement("div",null,o.a.createElement("div",null,"My Balance: ".concat(P)),o.a.createElement("div",null,"Room ID: ".concat(t)),o.a.createElement("button",{type:"button",onClick:function(){return n.push("/")}},"Return home"),o.a.createElement("button",{type:"button",onClick:function(){return N.stopMonitoring()}},"Stop monitoring"),o.a.createElement("button",{type:"button",onClick:function(){return N.endMonitoring()}},"End Peer connection"),o.a.createElement("button",{type:"button",onClick:function(){return N.startMonitoring()}},"Start Monitoring"),o.a.createElement("div",null,k),y.map(function(e){return o.a.createElement(ze,{id:e.id,key:e.id,username:e.username,srcObject:e.srcObject,sendDonationOffer:function(){return t=e.id,console.log("chatroom send donation"),void N.sendDonationOffer(t);var t}})}))}window.genTryte=J;var Ke=n(463),Xe=Object(h.a)(function(e){return{"@global":{body:{backgroundColor:e.palette.common.white}},paper:{marginTop:e.spacing(4),marginBottom:e.spacing(4),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:V},form:{width:"100%",marginTop:e.spacing(3)},submit:{margin:e.spacing(3,0,2),backgroundColor:V},seedGen:{margin:e.spacing(2,0,0)}}});function Ye(e){var t=e.history,n=Object(r.useContext)(Ae),a=Object(r.useState)(""),c=Object(d.a)(a,2),s=c[0],i=c[1],l=Object(r.useState)(""),u=Object(d.a)(l,2),m=u[0],v=u[1],h=Object(r.useState)(""),j=Object(d.a)(h,2),y=j[0],w=j[1],S=Object(r.useState)(!1),I=Object(d.a)(S,2),k=I[0],C=I[1],T=Object(r.useState)("info"),A=Object(d.a)(T,2),N=A[0],x=A[1],D=Object(r.useState)("Info"),P=Object(d.a)(D,2),R=P[0],G=P[1],L=Object(r.useState)(!1),U=Object(d.a)(L,2),_=U[0],W=U[1];function B(e,t){G(e),x(t),W(!0)}var H=Xe();return o.a.createElement(b.a,{component:"main",maxWidth:"sm"},o.a.createElement("div",{className:H.paper},o.a.createElement(g.a,{className:H.avatar},o.a.createElement(O.a,null)),o.a.createElement(E.a,{component:"h1",variant:"h5"},"Sign up"),o.a.createElement("form",{className:H.form,noValidate:!0},o.a.createElement(ce,{label:"Username",value:s,setValue:i}),o.a.createElement(oe,{setShowPassword:C,password:m,setPassword:v,showPassword:k}),o.a.createElement(f.a,{type:"button",variant:"contained",color:"secondary",className:H.seedGen,onClick:function(){w(J(M))}},"Generate Seed"),o.a.createElement(ce,{label:"Seed",value:y,setValue:w}),o.a.createElement(f.a,{type:"button",fullWidth:!0,variant:"contained",color:"primary",className:H.submit,onClick:function(){var e=n.getCollection("users"),a=e.findOne({username:s}),r=e.findOne({seed:y});if(!s||!y||!m)return B("Please enter all required field","error");if(a)return B("Username existed","error");if(r)return B("Account for seed existed","error");if(!Object(Ke.isTrytes)(y,M))return B("Invalid Seed","error");var o=F(s,m),c=Je()();e.insert({username:s,userHash:o,seed:y,myId:c}),B("Account created","success"),t.push("/login")}},"Sign Up"),o.a.createElement(p.a,{container:!0,justify:"flex-end"},o.a.createElement(p.a,{item:!0},o.a.createElement(f.a,{onClick:function(){t.push("/login")}},"Already have an account? Log in"))))),o.a.createElement(Ce,{variant:N,message:R,open:_,onClose:function(){return W(!1)},autoHideDuration:2e3}))}function $e(e){var t=e.history;console.log("home rendered");var n=Object(r.useGlobal)("seed"),a=Object(d.a)(n,1)[0],c=Object(r.useGlobal)("provider"),s=Object(d.a)(c,1)[0],i=Object(r.useGlobal)("username"),l=Object(d.a)(i,1)[0],u=Object(r.useState)(0),m=Object(d.a)(u,2),b=m[0],g=m[1],f=Object(r.useGlobal)("loggedIn"),p=Object(d.a)(f,2)[1],v=Object(r.useState)(""),O=Object(d.a)(v,2),E=O[0],h=O[1],j=Object(r.useState)(""),y=Object(d.a)(j,2),w=y[0],S=y[1],I=function(e){console.log("refreshed account"),console.log(e),g(e.balance),S(e.latestAddress)};return Object(r.useEffect)(function(){var e=Object(Fe.composeAPI)({provider:s});e.getAccountData(a,{security:2}).then(function(e){return I(e)});var t=setInterval(function(){return e.getAccountData(a,{security:2}).then(function(e){return I(e)})},2e4);return function(){console.log("Home closed"),clearInterval(t)}},[]),o.a.createElement("div",null,o.a.createElement("div",null,"My seed: ".concat(a)),o.a.createElement("div",null,"My username: ".concat(l)),o.a.createElement("div",null,"My Balance: ".concat(b)),o.a.createElement("div",null,"Use this address to request for devnet tokens: ".concat(w)),o.a.createElement("div",null,o.a.createElement("a",{target:"_blank",href:"https://faucet.devnet.iota.org",rel:"noopener noreferrer"},"Open devnet faucet link in new tab")),o.a.createElement("button",{type:"button",onClick:function(){var e=J(P);t.push("chatroom/".concat(e))}},"Create chatroom"),o.a.createElement("button",{type:"button",onClick:function(){Object(Ke.isTrytes)(E,P)&&t.push("chatroom/".concat(E))}},"Join chatroom"),o.a.createElement("input",{type:"text",onChange:function(e){return h(e.target.value)},value:E}),o.a.createElement("button",{type:"button",onClick:function(){localStorage.removeItem("userData"),p(!1),Object(r.setGlobal)(Te),console.log(Object(r.getGlobal)())}},"Logout"))}var et=n(634),tt={backgroundColor:"#607D8B",borderRadius:"12%",height:"250px",width:"250px",boxShadow:"2px 2px 10px 0px rgba(0,0,0,0.59)"},nt=function(){return X.a.createElement(et.TrinityRingsSpinner,{color:"#33B3A6",size:125,style:tt})},at=function(e){return Object(m.g)(function(t){var n=Object(r.useGlobal)("loggedIn");return Object(d.a)(n,1)[0]?o.a.createElement(m.a,{to:U}):o.a.createElement(e,t)})},rt=function(e){return Object(m.g)(function(t){var n=Object(r.useGlobal)("loggedIn");return Object(d.a)(n,1)[0]?o.a.createElement(e,t):o.a.createElement(m.a,{to:W})})},ot=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(u.Helmet,null,o.a.createElement("title",null,"IOTA - WebRTC"),o.a.createElement("meta",{name:"description",content:"A decentralized chat and video call application"}),o.a.createElement("meta",{charSet:"utf-8"})),o.a.createElement(m.d,null,o.a.createElement(m.b,{exact:!0,path:U,component:rt($e)}),o.a.createElement(m.b,{exact:!0,path:W,component:at(xe)}),o.a.createElement(m.b,{exact:!0,path:_,component:at(Ye)}),o.a.createElement(m.b,{exact:!0,path:B,component:rt(Ze)}),o.a.createElement(m.b,{exact:!0,path:H,component:nt}),o.a.createElement(m.a,{to:U})))},ct=n(638),st=n.n(ct),it=n(505),lt=n.n(it),ut=localStorage.getItem("userData");if(ut)try{var mt=JSON.parse(ut);Object(r.setGlobal)(Object(a.a)({},Te,mt,{loggedIn:!0})),console.log(Object(r.getGlobal)())}catch(ft){localStorage.removeItem("userData"),Object(r.setGlobal)(Te)}else Object(r.setGlobal)(Te);var dt=new lt.a,bt=new st.a("test.db",{adapter:dt,autoload:!0,autosave:!0,autosaveInterval:4e3,autoloadCallback:function(){console.log("Database loaded"),bt.getCollection("users")||bt.addCollection("users")}});window.iota=Fe;var gt=document.getElementById("root");console.log("render called"),s.a.render(o.a.createElement(l.a,null,o.a.createElement(i.a,null),o.a.createElement(Ae.Provider,{value:bt},o.a.createElement(ot,null))),gt)}},[[656,1,2]]]);
//# sourceMappingURL=main.7006802a.chunk.js.map