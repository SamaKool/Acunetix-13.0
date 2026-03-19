import{r as a,j as i}from"./index-DtnOIqbI.js";import{o as J,e as K,O as Q,C as B,h as Z,V as N,M as ee,r as te}from"./three.module-DAZc3tCW.js";const ne=`
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,oe=`
precision highp float;

uniform float uTime, uAttenuation, uLineThickness;
uniform float uBaseRadius, uRadiusStep, uScaleRate;
uniform float uOpacity, uNoiseAmount, uRotation, uRingGap;
uniform float uFadeIn, uFadeOut;
uniform float uMouseInfluence, uHoverAmount, uHoverScale, uParallax, uBurst;
uniform vec2 uResolution, uMouse;
uniform vec3 uColor, uColorTwo;
uniform int uRingCount;

const float HP = 1.5707963;
const float CYCLE = 3.45;

float fade(float t) {
  return t < uFadeIn ? smoothstep(0.0, uFadeIn, t) : 1.0 - smoothstep(uFadeOut, CYCLE - 0.2, t);
}

float ring(vec2 p, float ri, float cut, float t0, float px) {
  float t = mod(uTime + t0, CYCLE);
  float r = ri + t / CYCLE * uScaleRate;
  float d = abs(length(p) - r);
  float a = atan(abs(p.y), abs(p.x)) / HP;
  float th = max(1.0 - a, 0.5) * px * uLineThickness;
  float h = (1.0 - smoothstep(th, th * 1.5, d)) + 1.0;
  d += pow(cut * a, 3.0) * r;
  return h * exp(-uAttenuation * d) * fade(t);
}

void main() {
  float px = 1.0 / min(uResolution.x, uResolution.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) * px;
  float cr = cos(uRotation), sr = sin(uRotation);
  p = mat2(cr, -sr, sr, cr) * p;
  p -= uMouse * uMouseInfluence;
  float sc = mix(1.0, uHoverScale, uHoverAmount) + uBurst * 0.3;
  p /= sc;
  vec3 c = vec3(0.0);
  float rcf = max(float(uRingCount) - 1.0, 1.0);
  for (int i = 0; i < 10; i++) {
    if (i >= uRingCount) break;
    float fi = float(i);
    vec2 pr = p - fi * uParallax * uMouse;
    vec3 rc = mix(uColor, uColorTwo, fi / rcf);
    c = mix(c, rc, vec3(ring(pr, uBaseRadius + fi * uRadiusStep, pow(uRingGap, fi), i == 0 ? 0.0 : 2.95 * fi, px)));
  }
  c *= 1.0 + uBurst * 2.0;
  float n = fract(sin(dot(gl_FragCoord.xy + uTime * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  c += (n - 0.5) * uNoiseAmount;
  gl_FragColor = vec4(c, max(c.r, max(c.g, c.b)) * uOpacity);
}
`;function ae({color:g="#fc42ff",colorTwo:p="#42fcff",speed:o=1,ringCount:h=6,attenuation:m=10,lineThickness:f=2,baseRadius:O=.35,radiusStep:P=.1,scaleRate:j=.1,opacity:z=1,blur:b=0,noiseAmount:H=.1,rotation:G=0,ringGap:W=1.5,fadeIn:Y=.7,fadeOut:q=.5,followMouse:_=!1,mouseInfluence:V=.2,hoverScale:D=1.2,parallax:U=.05,clickBurst:X=!1}){const C=a.useRef(null),M=a.useRef(null),s=a.useRef([0,0]),l=a.useRef([0,0]),x=a.useRef(0),R=a.useRef(!1),c=a.useRef(0);return M.current={color:g,colorTwo:p,speed:o,ringCount:h,attenuation:m,lineThickness:f,baseRadius:O,radiusStep:P,scaleRate:j,opacity:z,noiseAmount:H,rotation:G,ringGap:W,fadeIn:Y,fadeOut:q,followMouse:_,mouseInfluence:V,hoverScale:D,parallax:U,clickBurst:X},a.useEffect(()=>{const n=C.current;if(!n)return;let u;try{u=new J({alpha:!0})}catch{return}if(!u.capabilities.isWebGL2){u.dispose();return}u.setClearColor(0,0),n.appendChild(u.domElement);const E=new K,S=new Q(-.5,.5,.5,-.5,.1,10);S.position.z=1;const t={uTime:{value:0},uAttenuation:{value:0},uResolution:{value:new N},uColor:{value:new B},uColorTwo:{value:new B},uLineThickness:{value:0},uBaseRadius:{value:0},uRadiusStep:{value:0},uScaleRate:{value:0},uRingCount:{value:0},uOpacity:{value:1},uNoiseAmount:{value:0},uRotation:{value:0},uRingGap:{value:1.6},uFadeIn:{value:.5},uFadeOut:{value:.75},uMouse:{value:new N},uMouseInfluence:{value:0},uHoverAmount:{value:0},uHoverScale:{value:1},uParallax:{value:0},uBurst:{value:0}},y=new Z({vertexShader:ne,fragmentShader:oe,uniforms:t,transparent:!0}),$=new ee(new te(1,1),y);E.add($);const v=()=>{const r=n.clientWidth,e=n.clientHeight,d=Math.min(window.devicePixelRatio,2);u.setSize(r,e),u.setPixelRatio(d),t.uResolution.value.set(r*d,e*d)};v(),window.addEventListener("resize",v);const A=new ResizeObserver(v);A.observe(n);const L=r=>{const e=n.getBoundingClientRect();s.current[0]=(r.clientX-e.left)/e.width-.5,s.current[1]=-((r.clientY-e.top)/e.height-.5)},k=()=>{R.current=!0},T=()=>{R.current=!1,s.current[0]=0,s.current[1]=0},F=()=>{c.current=1};n.addEventListener("mousemove",L),n.addEventListener("mouseenter",k),n.addEventListener("mouseleave",T),n.addEventListener("click",F);let w;const I=r=>{w=requestAnimationFrame(I);const e=M.current,d=e.clickBurst?1-c.current*.8:1;l.current[0]+=(s.current[0]-l.current[0])*.08,l.current[1]+=(s.current[1]-l.current[1])*.08,x.current+=((R.current?1:0)-x.current)*.08,c.current*=.85,c.current<.001&&(c.current=0),t.uTime.value=r*.001*e.speed,t.uAttenuation.value=e.attenuation/d,t.uColor.value.set(e.color),t.uColorTwo.value.set(e.colorTwo),t.uLineThickness.value=e.lineThickness,t.uBaseRadius.value=e.baseRadius,t.uRadiusStep.value=e.radiusStep,t.uScaleRate.value=e.scaleRate,t.uRingCount.value=e.ringCount,t.uOpacity.value=e.opacity*d,t.uNoiseAmount.value=e.noiseAmount,t.uRotation.value=e.rotation*Math.PI/180,t.uRingGap.value=e.ringGap,t.uFadeIn.value=e.fadeIn,t.uFadeOut.value=e.fadeOut,t.uMouse.value.set(l.current[0],l.current[1]),t.uMouseInfluence.value=e.followMouse?e.mouseInfluence:0,t.uHoverAmount.value=x.current,t.uHoverScale.value=e.hoverScale,t.uParallax.value=e.parallax,t.uBurst.value=e.clickBurst?c.current:0,u.render(E,S)};return w=requestAnimationFrame(I),()=>{cancelAnimationFrame(w),window.removeEventListener("resize",v),A.disconnect(),n.removeEventListener("mousemove",L),n.removeEventListener("mouseenter",k),n.removeEventListener("mouseleave",T),n.removeEventListener("click",F),n.removeChild(u.domElement),u.dispose(),y.dispose()}},[]),i.jsx("div",{ref:C,className:"w-full h-full",style:b>0?{filter:`blur(${b}px)`}:void 0})}const ue=a.forwardRef((g,p)=>{const[o,h]=a.useState({width:typeof window<"u"?window.innerWidth:1200,isMobile:typeof window<"u"?window.innerWidth<768:!1});a.useEffect(()=>{const f=()=>{h({width:window.innerWidth,isMobile:window.innerWidth<768})};return f(),window.addEventListener("resize",f),()=>window.removeEventListener("resize",f)},[]);const m=Math.min(Math.max(o.width/1200,.4),1);return i.jsxs("section",{ref:p,id:"about",className:"about-section min-h-[70vh] md:min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center bg-black px-6 py-16 md:py-0",children:[i.jsx("div",{className:"absolute inset-0 z-0 pointer-events-auto",children:i.jsx(ae,{color:"#ffffff",ringCount:o.isMobile?14:10,speed:.5,attenuation:o.isMobile?4:5,lineThickness:2,baseRadius:o.isMobile?.4:.3*(1/m),radiusStep:o.isMobile?.1:.15*m,scaleRate:.1,opacity:.35,noiseAmount:.1,rotation:0,ringGap:1.5,fadeIn:.7,fadeOut:.5,clickBurst:!0,followMouse:!o.isMobile,mouseInfluence:o.isMobile?0:.4,hoverScale:o.isMobile?1:1.3,parallax:o.isMobile?0:.1})}),i.jsxs("div",{className:"relative z-10 w-full flex flex-col items-center pointer-events-none",children:[i.jsx("div",{className:"about-header text-center mb-8 md:mb-20",children:i.jsx("h2",{className:"about-title text-5xl md:text-9xl font-black uppercase tracking-wider text-white mb-2",children:"About Us"})}),i.jsx("p",{className:"about-paragraph text-center text-base md:text-3xl text-gray-200 leading-relaxed max-w-4xl mx-auto px-4",children:"Acunetix 13.0 is a flagship event organised by ACES and CSI, offering a range of Tech & Non-Tech events. Participants take part in diverse competitions, showcasing their skills and earning recognition. With exciting prizes and a mix of solo and team events, it's a unique opportunity for students to shine and be part of an unforgettable experience."})]})]})});ue.displayName="About";export{ue as default};
