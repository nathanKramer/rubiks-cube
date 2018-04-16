varying highp vec4 position;
varying highp vec3 normal;

uniform bool lighting;
uniform highp vec3 eyePosition;
uniform highp vec4 ambient;
uniform highp vec4 diffuse;
uniform highp vec4 specular;
uniform highp float shininess;

const highp vec4 lightPosition = vec4(-1.,1.,-1., 1);
const highp vec4 lightColor = vec4(.2,.2,.2,1);

void main(void) {
    if (lighting) {
        highp vec3 position = position.xyz / position.w;
        highp vec3 eyeDirection = normalize(eyePosition - position);
        highp vec3 lightPosition = lightPosition.xyz / lightPosition.w;
        highp vec3 lightDirection = normalize(lightPosition - position);
        highp vec3 halfAngle = normalize(lightDirection + eyeDirection);
        highp vec4 diffuseTerm = diffuse * lightColor * max(dot(normal, lightDirection), 0.0);
        highp vec4 specularTerm = specular * lightColor * pow(max(dot(normal, halfAngle), 0.0), shininess);
        gl_FragColor = diffuseTerm + specularTerm + ambient;
    } else {
        gl_FragColor = ambient;
    }
}
