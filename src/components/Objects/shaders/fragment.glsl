varying vec3 vColor;

void main()  {
    //use gl_PointCoord. is the uv value for the plane of the particle

    //Disc pattern
    // float strength = distance(gl_PointCoord, vec2(0.5));    //distance from center of particle to edge we want.
    // strength = step(0.5, strength);
    // strength = 1.0 - strength;

    //Diffuse point pattern. gradient
    // float strength = distance(gl_PointCoord, vec2(0.5));    //distance from center of particle to edge we want.
    // strength *= 2.0;
    // strength = 1.0 - strength;

    //Light point pattern. bright light in middle, fade very fast all around
    float strength = distance(gl_PointCoord, vec2(0.5));    //distance from center of particle to edge we want.
    strength = 1.0 - strength;
    strength = pow(strength, 10.0);

    //Final
    vec3 color = mix(vec3(0.0), vColor, strength);

    gl_FragColor = vec4(color, 1.0);
}