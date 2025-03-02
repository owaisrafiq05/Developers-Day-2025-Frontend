export default `
varying vec3 vColor;
uniform float uProgress;

void main()
{
    vec2 uv = gl_PointCoord;
    float distanceToCenter = length(uv - (1.0 - uProgress));
    float alpha =  (0.05 / distanceToCenter - 0.1);
    
    gl_FragColor = vec4(vColor, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
`