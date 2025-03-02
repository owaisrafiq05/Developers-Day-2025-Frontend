const fragmentShader = `
varying vec3 vColor;

void main()
{
    float distanceToCenter = length(gl_PointCoord - 0.5);
    if(distanceToCenter > 0.5)
        discard;
    
    // Force red color to check if shader is working
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    
    // Original color line (commented out for testing)
    // gl_FragColor = vec4(vColor, 1.0);
    
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
`
export default fragmentShader;