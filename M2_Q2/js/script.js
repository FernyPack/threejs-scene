// Basic setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Geometries and Materials
const geometries = [
    { geometry: new THREE.BoxGeometry(), color: 0xff0000, position: [-2, 0, 0] },
    { geometry: new THREE.ConeGeometry(0.5, 1, 32), color: 0x00ff00, position: [0, 0, 0] },
    { geometry: new THREE.CylinderGeometry(0.5, 0.5, 1, 32), color: 0x0000ff, position: [2, 0, 0] },
    { geometry: new THREE.SphereGeometry(0.5, 32, 32), color: 0xffff00, position: [-1, 2, 0] },
    { geometry: new THREE.TorusGeometry(0.5, 0.2, 16, 100), color: 0xff00ff, position: [1, 2, 0] }
];

// Create meshes, set their positions, and add them to the scene
const meshes = geometries.map(({ geometry, color, position }) => {
    const material = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    scene.add(mesh);
    return mesh;
});

// Camera positioning
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate each geometry
    meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.01 * (index + 1);
        mesh.rotation.y += 0.01 * (index + 1);
    });

    renderer.render(scene, camera);
}
animate();

// Responsive canvas
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
