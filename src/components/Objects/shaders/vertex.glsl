//uniform float uTime;
//uniform float uSize;


varying vec3 vColor;

void main()  {
    //Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    //changes here since we want to update model

  


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    //Size
    gl_PointSize = 4.0;


    vColor = color;
}