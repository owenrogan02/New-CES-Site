/** Animated mesh-gradient shader for hero bands. Falls back silently to the static CSS gradient. */
const VERT = `#version 300 es
in vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 u_res; uniform float u_time; uniform vec3 c1; uniform vec3 c2; uniform vec3 c3; uniform vec3 c4;
out vec4 o;
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}
vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}
float snoise(vec2 v){
  const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
  vec2 i=floor(v+dot(v,C.yy)); vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1; i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.); m=m*m; m=m*m;
  vec3 x=2.*fract(p*C.www)-1.; vec3 h=abs(x)-.5; vec3 ox=floor(x+.5); vec3 a0=x-ox;
  m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
  vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.*dot(m,g);
}
float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res; vec2 p=uv; p.x*=u_res.x/u_res.y;
  float t=u_time*.07;
  float n1=snoise(p*1.25+vec2(t,-t*.7));
  float n2=snoise(p*1.8+vec2(-t*.8,t)+10.);
  float n3=snoise(p*.9+vec2(t*.5,t*.9)+20.);
  vec3 col=mix(c1,c2,smoothstep(-.7,.7,n1));
  col=mix(col,c3,smoothstep(-.35,.8,n2)*.9);
  col=mix(col,c4,smoothstep(.05,.95,n3)*.85);
  col=mix(col,vec3(1.),.22);
  col+= (hash(gl_FragCoord.xy+u_time)-.5)*.035;
  o=vec4(col,1.);
}`;

function parse(el: HTMLElement, name: string): [number, number, number] {
  const probe = document.createElement('span');
  probe.style.color = `var(${name})`;
  el.appendChild(probe);
  const m = getComputedStyle(probe).color.match(/[\d.]+/g) ?? ['255', '255', '255'];
  probe.remove();
  return [Number(m[0]) / 255, Number(m[1]) / 255, Number(m[2]) / 255];
}

export function initGradient({ animate }: { animate: boolean }) {
  document.querySelectorAll<HTMLElement>('[data-gradient]').forEach((host) => {
    const canvas = host.querySelector<HTMLCanvasElement>('canvas');
    if (!canvas) return;
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return;

    const mk = (type: number, src: string) => {
      const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = mk(gl.VERTEX_SHADER, VERT); const fs = mk(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!; gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    ['c1', 'c2', 'c3', 'c4'].forEach((n, i) => gl.uniform3fv(u(n), parse(host, `--grad-${i + 1}`)));

    let dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 800 ? 1 : 1.5);
    const resize = () => {
      const r = host.getBoundingClientRect();
      canvas.width = Math.max(2, Math.round(r.width * dpr * 0.75));
      canvas.height = Math.max(2, Math.round(r.height * dpr * 0.75));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u('u_res'), canvas.width, canvas.height);
    };
    resize();
    new ResizeObserver(resize).observe(host);

    let visible = true; let raf = 0; let last = 0; let slow = 0;
    const start = performance.now();
    const draw = (now: number) => {
      gl.uniform1f(u('u_time'), (now - start) / 1000 + 4);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    draw(performance.now());
    host.classList.add('gl-ready');
    if (!animate) return;

    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = now - last; last = now;
      if (dt > 24) slow++; else slow = Math.max(0, slow - 1);
      if (slow > 40 && dpr > 1) { dpr = 1; resize(); slow = 0; }
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const kick = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop); };
    new IntersectionObserver((e) => { visible = e[0].isIntersecting; kick(); }).observe(host);
    document.addEventListener('visibilitychange', kick);
    kick();
  });
}
