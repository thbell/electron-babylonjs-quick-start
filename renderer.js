// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const babylonjs = require('babylonjs')

window.addEventListener('DOMContentLoaded', function() {
    // get the canvas DOM element
    var canvas = document.getElementById('renderCanvas');

    // load the 3D engine
    var engine = new babylonjs.Engine(canvas, true);

    // createScene function that creates and return the scene
    var createScene = function() {
        // create a basic BJS Scene object
        var scene = new babylonjs.Scene(engine);

        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        var camera = new babylonjs.FreeCamera('camera1', new babylonjs.Vector3(0, 5, -10), scene);

        // target the camera to scene origin
        camera.setTarget(babylonjs.Vector3.Zero());

        // attach the camera to the canvas
        camera.attachControl(canvas, false);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        var light = new babylonjs.HemisphericLight('light1', new babylonjs.Vector3(0, 1, 0), scene);

        // create a built-in "sphere" shape; its constructor takes 5 params: name, width, depth, subdivisions, scene
        var sphere = babylonjs.Mesh.CreateSphere('sphere1', 16, 2, scene);

        // move the sphere upward 1/2 of its height
        sphere.position.y = 1;

        // create a built-in "ground" shape; its constructor takes the same 5 params as the sphere's one
        var ground = babylonjs.Mesh.CreateGround('ground1', 6, 6, 2, scene);

        // return the created scene
        return scene;
    }

    // call the createScene function
    var scene = createScene();

    // run the render loop
    engine.runRenderLoop(function() {
        scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', function() {
        engine.resize();
    });
});
