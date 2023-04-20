# Scene Graph Visualization

Scene Graph Visualization is a tool designed to aid in the understanding and manipulation of scene graphs, which are data structures commonly employed in modern computer video games, vector-based graphics editing applications, and other computer graphics-related domains. Scene graphs represent the elements of a scene as a collection of nodes in a graph or tree structure. When an operation is performed on a parent node, it affects all its child nodes accordingly.

This project uses the Three.js library to provide an interactive visual representation of these relationships on a robot model, offering a way to explore a simple scene graph structure.

## Setup and Usage

To set up and use the Scene Graph Visualization tool, follow these steps:

1. Clone the repository or download the source code to your local machine.
2. Open a terminal and navigate to the repository directory.
3. Execute the following command to host a local server at port 8000 using Python's `http.server` module:

```sh
python -m http.server 8000
```

4. Open your web browser and navigate to `http://localhost:8000` to access the Scene Graph Visualization tool.

![Demo](https://github.com/Steven554/SceneGraphViz/blob/15a70a35a67e3eec1ca2bfcbebe21bd04b4f6bac/SceneGraphGif.gif)