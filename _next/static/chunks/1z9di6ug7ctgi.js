(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,50429,e=>{"use strict";var t=e.i(5),i=e.i(90239),n=e.i(52236);let a=`#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`,r=`#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;
uniform vec2 uRes;
uniform float uTime;
uniform vec4 uRipples[12];
uniform sampler2D uMask;
uniform vec3 uWater;
uniform vec3 uLight;
uniform vec2 uShadow;

const float TAU = 6.28318530718;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

// The bright web of light on a pool floor: the edges between drifting
// cells, where the waves focus the sun.
float caustic(vec2 p, float t) {
  vec2 q = p;
  p += 0.34 * vec2(sin(p.y * 1.3 + t * 0.9), cos(p.x * 1.1 - t * 0.7));
  p += 0.12 * vec2(sin(p.y * 3.1 - t), cos(p.x * 2.7 + t * 1.2));
  vec2 n = floor(p);
  vec2 f = fract(p);
  float f1 = 8.0;
  float f2 = 8.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = 0.5 + 0.42 * sin(t + TAU * hash(n + g));
      vec2 r = g + o - f;
      float d = dot(r, r);
      if (d < f1) {
        f2 = f1;
        f1 = d;
      } else if (d < f2) {
        f2 = d;
      }
    }
  }
  float edge = sqrt(f2) - sqrt(f1);
  // A sharp core and a soft halo, brighter in some patches than others.
  float line = pow(1.0 - smoothstep(0.0, 0.14, edge), 2.0);
  float halo = 1.0 - smoothstep(0.0, 0.32, edge);
  float glint = 0.6 + 0.4 * sin(q.x * 0.55 + t * 0.6) * cos(q.y * 0.45 - t * 0.5);
  return (line * 0.85 + halo * 0.18) * glint;
}

void main() {
  vec2 px = vec2(vUv.x, 1.0 - vUv.y) * uRes;
  vec2 bend = vec2(0.0);
  float focus = 0.0;
  for (int k = 0; k < 12; k++) {
    vec4 r = uRipples[k];
    float age = uTime - r.z;
    if (r.w <= 0.0 || age < 0.0 || age > 4.0) {
      continue;
    }
    vec2 d = px - r.xy;
    float dist = length(d);
    float x = dist - age * 240.0;
    float env = r.w * exp(-age * 0.8) * exp(-x * x / 2600.0) / (1.0 + dist * 0.002);
    bend += (d / max(dist, 1.0)) * sin(x * 0.085) * env * 26.0;
    focus += cos(x * 0.085) * env;
  }
  vec2 uv = (px + bend) / 150.0;
  float t = uTime * 0.5;
  float c = caustic(uv, t);
  // A fainter, finer web drifting under the first gives the floor depth.
  c = max(c, caustic(uv * 1.9 + 7.3, t * 0.8 + 3.0) * 0.22);
  // A ring's crest focuses light like a lens and its trough spreads it, so
  // each ring shows as a bright band with a dim one beside it.
  c = clamp(c * (1.0 + focus * 1.2) + focus * 0.4, 0.0, 1.0);

  // Whatever floats on the surface blocks the light under it. The water
  // bends the shadow the same way it bends the light.
  vec2 sway = vec2(sin(uTime * 0.7), cos(uTime * 0.55)) * 2.5;
  vec2 s = (px - uShadow - bend * 1.4 - sway) / uRes;
  float shade = texture(uMask, s).r;

  vec3 floor = uWater * (1.0 - shade * 0.08);
  vec3 col = mix(floor, uLight, c * (1.0 - shade * 0.9));
  o = vec4(col, 1.0);
}`;function o(e,t,i){let n=e.createShader(t);return n?(e.shaderSource(n,i),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS))?n:(e.deleteShader(n),null):null}function s(e,t){t.clearRect(0,0,1,1),t.fillStyle=e,t.fillRect(0,0,1,1);let[i,n,a]=t.getImageData(0,0,1,1).data;return[i/255,n/255,a/255]}function l(){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("p",{className:"max-w-md text-balance text-base text-zinc-600 leading-relaxed dark:text-zinc-300",children:"Book a lane at any of 40 city pools. Lanes open at 6am, and the first swim is on us."}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("a",{className:"inline-flex h-10 items-center rounded-full bg-zinc-900 px-5 font-medium text-sm text-white transition-colors duration-150 hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200","data-shadow":"box",href:"#book",children:"Book a lane"}),(0,t.jsx)("a",{className:"inline-flex h-10 items-center rounded-full px-4 font-medium text-sm text-zinc-700 transition-colors duration-150 hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-zinc-50",href:"#pools",children:"Find a pool"})]})]})}e.s(["default",0,function({title:e="Swim before work.",children:c,interactive:d=!0,eyebrow:u,as:f="h2",titleClassName:h,className:m}){let v=(0,i.useRef)(null),x=(0,i.useRef)(null),g=(0,i.useRef)(null),p=(0,i.useRef)(null);(0,i.useEffect)(()=>{let e=v.current,t=x.current,i=t?.getContext("webgl2",{alpha:!1,antialias:!1,depth:!1}),n=document.createElement("canvas").getContext("2d",{willReadFrequently:!0}),l=i?function(e){let t=o(e,e.VERTEX_SHADER,a),i=o(e,e.FRAGMENT_SHADER,r),n=e.createProgram();if(!(t&&i&&n)||(e.attachShader(n,t),e.attachShader(n,i),e.bindAttribLocation(n,0,"aPos"),e.linkProgram(n),!e.getProgramParameter(n,e.LINK_STATUS)))return null;let s={res:e.getUniformLocation(n,"uRes"),time:e.getUniformLocation(n,"uTime"),ripples:e.getUniformLocation(n,"uRipples"),mask:e.getUniformLocation(n,"uMask"),water:e.getUniformLocation(n,"uWater"),light:e.getUniformLocation(n,"uLight"),shadow:e.getUniformLocation(n,"uShadow")},l=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,l),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);let c=e.createTexture();return e.bindTexture(e.TEXTURE_2D,c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,e.R8,1,1,0,e.RED,e.UNSIGNED_BYTE,new Uint8Array([0])),e.useProgram(n),e.uniform1i(s.mask,0),e.uniform2f(s.shadow,16,30),{resize:(t,i,n,a)=>{e.viewport(0,0,t,i),e.uniform2f(s.res,n,a)},setMask:t=>{e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,c),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t)},setColors:(t,i)=>{e.uniform3f(s.water,t[0],t[1],t[2]),e.uniform3f(s.light,i[0],i[1],i[2])},setRipples:t=>{e.uniform4fv(s.ripples,t)},draw:t=>{e.uniform1f(s.time,t),e.drawArrays(e.TRIANGLE_STRIP,0,4)},destroy:()=>{e.deleteTexture(c),e.deleteBuffer(l),e.deleteProgram(n),e.deleteShader(t),e.deleteShader(i)}}}(i):null;if(!(e&&t&&n&&l))return;let c=window.matchMedia("(prefers-reduced-motion: reduce)").matches,u=document.createElement("canvas"),f=new Float32Array(48),h=performance.now(),m=()=>(performance.now()-h)/1e3,w=0,T=0,R=!0,b="",E=0,y=0,A={x:0,y:0,t:0,wake:0},S=(e,t,i)=>{f.set([e,t,m(),i],4*w),w=(w+1)%12,l.setRipples(f)},U=()=>{let e=getComputedStyle(g.current).color,t=getComputedStyle(p.current).color,i=`${e}|${t}`;return i!==b&&(b=i,l.setColors(s(e,n),s(t,n)),!0)},k=()=>{let i=e.getBoundingClientRect();if(E=i.width,y=i.height,E<2||y<2)return;let n=Math.min(window.devicePixelRatio||1,1.5);t.width=Math.round(E*n),t.height=Math.round(y*n),l.resize(t.width,t.height,E,y),function(e,t){let i=t.getBoundingClientRect();e.width=Math.max(1,Math.round(i.width)),e.height=Math.max(1,Math.round(i.height));let n=e.getContext("2d");if(n)for(let a of(n.fillStyle="black",n.fillRect(0,0,e.width,e.height),n.filter="blur(7px)",n.fillStyle="white",t.querySelectorAll("[data-shadow]"))){let e=a.getBoundingClientRect(),t=e.left-i.left,r=e.top-i.top;if("text"===a.dataset.shadow){let i=getComputedStyle(a);n.font=`${i.fontWeight} ${i.fontSize} ${i.fontFamily}`,n.letterSpacing=i.letterSpacing,n.textBaseline="alphabetic";let o=a.textContent??"",s=n.measureText(o),l=r+(e.height+s.fontBoundingBoxAscent-s.fontBoundingBoxDescent)/2;n.fillText(o,t,l)}else{let i=Number.parseFloat(getComputedStyle(a).borderRadius)||0;n.beginPath(),n.roundRect(t,r,e.width,e.height,i),n.fill()}}}(u,e),l.setMask(u),l.draw(c?8:m())},_=()=>{T=0,R&&(l.draw(m()),T=requestAnimationFrame(_))},L=()=>{T||!R||c||(T=requestAnimationFrame(_))};U(),l.setRipples(f),k(),t.style.opacity="1",L();let P=window.setTimeout(()=>{!c&&d&&S(.68*E,.3*y,1.1)},500);document.fonts?.ready.then(()=>{v.current&&k()});let B=new ResizeObserver(()=>k());B.observe(e);let D=!0,M=new IntersectionObserver(([e])=>{R=(D=e.isIntersecting)&&"visible"===document.visibilityState,L()});M.observe(e);let N=()=>{R=D&&"visible"===document.visibilityState,L()};document.addEventListener("visibilitychange",N);let j=window.setInterval(()=>{R&&U()&&(c||!T)&&l.draw(c?8:m())},500),C=t=>{let i=e.getBoundingClientRect();return{x:t.clientX-i.left,y:t.clientY-i.top}},I=e=>{let t=C(e),i=e.timeStamp,n=Math.max(1,i-A.t),a=Math.hypot(t.x-A.x,t.y-A.y)/n;A.t&&a>.25&&i-A.wake>70&&(S(t.x,t.y,Math.min(.45,.25*a)),A.wake=i),A.x=t.x,A.y=t.y,A.t=i},z=()=>{A.t=0},F=e=>{if(e.target.closest("a, button, input, textarea"))return;let t=C(e);S(t.x,t.y,1.4)};return d&&!c&&(e.addEventListener("pointermove",I),e.addEventListener("pointerleave",z),e.addEventListener("pointerdown",F)),()=>{cancelAnimationFrame(T),window.clearTimeout(P),window.clearInterval(j),B.disconnect(),M.disconnect(),document.removeEventListener("visibilitychange",N),e.removeEventListener("pointermove",I),e.removeEventListener("pointerleave",z),e.removeEventListener("pointerdown",F),l.destroy()}},[d]);let w=e.split(" ");return(0,t.jsxs)("div",{className:(0,n.f)("relative min-h-[560px] w-full touch-pan-y overflow-hidden bg-[#cde5e4] text-ink dark:bg-[#06201f] dark:text-zinc-50",m),ref:v,children:[(0,t.jsx)("span",{className:"hidden text-[#cde5e4] dark:text-[#06201f]",ref:g}),(0,t.jsx)("span",{className:"hidden text-white dark:text-[#3ea89d]",ref:p}),(0,t.jsx)("div",{"aria-hidden":"true",className:"pointer-events-none absolute inset-0",children:(0,t.jsx)("canvas",{className:"h-full w-full opacity-0 transition-opacity duration-700 ease-out",ref:x})}),(0,t.jsxs)("div",{className:"relative flex min-h-[560px] flex-col items-center justify-center gap-6 px-6 py-16 text-center",children:[u,(0,t.jsx)(f,{className:(0,n.f)("max-w-3xl text-balance font-semibold text-5xl tracking-[-0.045em] sm:text-7xl",h),children:w.map((e,i)=>(0,t.jsxs)("span",{children:[(0,t.jsx)("span",{"data-shadow":"text",children:e}),i<w.length-1?" ":null]},`${e}-${i.toString()}`))}),void 0===c?(0,t.jsx)(l,{}):c]})]})}])}]);