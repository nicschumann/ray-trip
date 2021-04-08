precision mediump float;
precision mediump sampler2D;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;

uniform sampler2D uDivergence;
uniform sampler2D uPressure;
uniform float dt;
uniform float dissipation;

void main ()
{
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;

  float divergence = texture2D(uDivergence, vUv).x;
  float pressure = (L + R + B + T - divergence) * 0.25;
  pressure = pressure / (1.0 + dissipation * dt);

  gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}
