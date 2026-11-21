/* Porcelain glaze — a small WebGL fragment shader.
   Soft glazed surface, a travelling specular sheen and a fine dust of light.
   `progress` (0..1) is driven by scroll; time keeps it breathing. */
(function(){
  'use strict';
  var VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var FRAG = [
    '#ifdef GL_FRAGMENT_PRECISION_HIGH','precision highp float;','#else','precision mediump float;','#endif',
    'uniform vec2 r;uniform float t;uniform float pr;',
    'uniform vec3 c0;uniform vec3 c1;uniform vec3 c2;uniform float dark;',
    'float h(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}',
    'float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);',
    ' return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}',
    'float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}',
    'void main(){',
    ' vec2 uv=gl_FragCoord.xy/r;vec2 q=uv;q.x*=r.x/r.y;',
    ' float tt=t*.035;',
    ' vec2 w=vec2(fbm(q*1.6+vec2(tt,pr*.8)),fbm(q*1.6+vec2(5.2-tt,1.3+pr)));',
    ' float g=fbm(q*1.2+w*1.4+pr*.35);',
    ' vec3 col=mix(c0,c1,smoothstep(.25,.85,g));',
    ' col=mix(col,c2,smoothstep(.62,.95,g)*.55);',
    ' float band=(uv.x*.85+uv.y*.55)-(pr*1.9-.45)-(w.x-.5)*.35;',
    ' float sheen=exp(-band*band*38.);',
    ' col+=sheen*(dark>.5?.16:.22);',
    ' vec2 cell=floor(gl_FragCoord.xy/3.);float s=h(cell);',
    ' float tw=step(.9972,s)*pow(.5+.5*sin(t*1.6+s*90.),10.);',
    ' col+=tw*(dark>.5?.55:.35)*(.4+sheen);',
    ' float v=smoothstep(1.25,.25,length(uv-.5));',
    ' col*=mix(dark>.5?.72:.93,1.,v);',
    ' gl_FragColor=vec4(col,1.);',
    '}'
  ].join('\n');

  function hex(c){c=c.replace('#','');return [parseInt(c.substr(0,2),16)/255,parseInt(c.substr(2,2),16)/255,parseInt(c.substr(4,2),16)/255];}

  function PorcelainGL(canvas, opts){
    this.canvas = canvas;
    this.opts = opts || {};
    this.progress = 0;
    this.running = false;
    this.visible = true;
    var gl = null;
    try { gl = canvas.getContext('webgl', {antialias:false, alpha:false, powerPreference:'low-power'}); } catch(e){}
    if(!gl){ this.ok = false; canvas.classList.add('no-gl'); return; }
    this.gl = gl;
    var prog = gl.createProgram();
    [[gl.VERTEX_SHADER,VERT],[gl.FRAGMENT_SHADER,FRAG]].forEach(function(s){
      var sh = gl.createShader(s[0]); gl.shaderSource(sh, s[1]); gl.compileShader(sh); gl.attachShader(prog, sh);
    });
    gl.linkProgram(prog);
    if(!gl.getProgramParameter(prog, gl.LINK_STATUS)){ this.ok = false; return; }
    gl.useProgram(prog);
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog,'p');
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    this.u = {};
    var self = this;
    ['r','t','pr','c0','c1','c2','dark'].forEach(function(k){ self.u[k] = gl.getUniformLocation(prog,k); });
    var pal = this.opts.palette || ['#F7F1EC','#EBD8D1','#D9B9AE'];
    gl.uniform3fv(this.u.c0, hex(pal[0])); gl.uniform3fv(this.u.c1, hex(pal[1])); gl.uniform3fv(this.u.c2, hex(pal[2]));
    gl.uniform1f(this.u.dark, this.opts.dark ? 1 : 0);
    this.ok = true;
    this.t0 = performance.now();
    this.resize = this.resize.bind(this);
    this.loop = this.loop.bind(this);
    this.ro = new ResizeObserver(this.resize); this.ro.observe(canvas);
    this.io = new IntersectionObserver(function(es){ self.visible = es[0].isIntersecting; if(self.visible) self.start(); }, {rootMargin:'100px'});
    this.io.observe(this.opts.observe || canvas);
    this.resize();
  }
  PorcelainGL.prototype.resize = function(){
    if(!this.ok) return;
    var dpr = Math.min(window.devicePixelRatio || 1, this.opts.maxDpr || 1.25);
    var w = Math.max(1, Math.round(this.canvas.clientWidth * dpr)), h = Math.max(1, Math.round(this.canvas.clientHeight * dpr));
    if(this.canvas.width !== w || this.canvas.height !== h){ this.canvas.width = w; this.canvas.height = h; }
    this.gl.viewport(0,0,w,h);
    this.gl.uniform2f(this.u.r, w, h);
    this.draw();
  };
  PorcelainGL.prototype.draw = function(){
    if(!this.ok) return;
    var gl = this.gl;
    var t = this.opts.still ? 8 : (performance.now() - this.t0) / 1000;
    gl.uniform1f(this.u.t, t);
    gl.uniform1f(this.u.pr, this.progress);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  PorcelainGL.prototype.loop = function(){
    if(!this.running) return;
    if(!this.visible || document.hidden){ this.running = false; return; }
    this.draw();
    requestAnimationFrame(this.loop);
  };
  PorcelainGL.prototype.start = function(){
    if(!this.ok || this.running) return;
    if(this.opts.still){ this.draw(); return; }
    this.running = true; requestAnimationFrame(this.loop);
  };
  PorcelainGL.prototype.set = function(p){ this.progress = p; if(this.opts.still) this.draw(); };
  document.addEventListener('visibilitychange', function(){ if(!document.hidden) (window.__glz||[]).forEach(function(g){ g.start(); }); });
  window.PorcelainGL = PorcelainGL;
})();
