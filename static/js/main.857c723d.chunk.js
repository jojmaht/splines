(this["webpackJsonpsplines-playground"]=this["webpackJsonpsplines-playground"]||[]).push([[0],{33:function(e,t,n){},53:function(e,t,n){"use strict";n.r(t);var i=n(0),r=n.n(i),a=n(14),c=n.n(a),o=(n(33),n(12)),s=n(3),l=n(16),h=n(29),d=n(9),u=function(e){var t=e.index,n=Object(l.b)(Object(s.a)({},"Layer ".concat(t),Object(l.a)({shape:4,isFilled:!1,color:"#fff",tension:0,radius:{value:200,min:0,max:500,step:1},thickness:1,rotation:{value:0,min:-360,max:360,step:.5}}))),i=n.shape,r=n.isFilled,a=n.color,c=n.tension,u=n.radius,b=n.thickness,j=(n.variance,function(e,t,n,i){for(var r=[],a=0===t?12:t,c=2*Math.PI/a,o=1;o<=a;o++){var s=o*c+2*Math.PI*((i-90)/360),l=n/2+Math.cos(s)*e,h=n/2+Math.sin(s)*e;r.push.apply(r,[{x:l,y:h,theta:s}])}return r}(u,i,1e3,n.rotation));console.log(j);var x=Object(h.a)(j,c,!0);return Object(d.jsx)(o.a,{zIndex:t,draggable:!0,children:Object(d.jsx)(o.d,{stroke:a,strokeWidth:b,x:0,y:0,draggable:!0,sceneFunc:function(e,t){var n=new Path2D(x);e.fillStrokeShape(t),e._context.lineWidth=b,e._context.strokeStyle=a,e._context.fillStyle=r?a:"transparent",e._context.fill(n),e._context.stroke(n)}})})};var b=function(){var e=Object(l.b)({layers:1,backgroundColor:"#000000"}),t=e.layers,n=e.backgroundColor;return Object(d.jsx)("div",{className:"App",children:Object(d.jsx)("div",{style:{width:"100vh",height:"100vh",position:"relative"},children:Object(d.jsx)(o.e,{width:1e3,height:1e3,style:{position:"absolute",inset:0},children:Object(d.jsxs)(o.b,{children:[Object(d.jsx)(o.c,{x:0,y:0,width:1e3,height:1e3,fill:n,sceneFunc:function(e,t){var n=new Path2D("M0,0L1000,0L1000,1000L0,1000Z");e.fillStrokeShape(t),e._context.lineWidth=0,e._context.fill(n)}}),Array.from({length:t}).map((function(e,t){return Object(d.jsx)(u,{index:t})}))]})})})})};c.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(b,{})}),document.getElementById("root"))}},[[53,1,2]]]);
//# sourceMappingURL=main.857c723d.chunk.js.map