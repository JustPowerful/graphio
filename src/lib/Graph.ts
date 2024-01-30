import { Network, DataSet } from "vis-network/standalone";

class Graph {
  length: number; // length of the graph
  matrix: number[][]; // 2 dimensional array

  // initialize the graph
  constructor(length: number) {
    this.length = length;
    this.matrix = [];

    for (let i = 0; i < length; i++) {
      this.matrix.push(new Array<number>(length).fill(0));
    }
  }

  addEdge(fromNode: number, toNode: number, weight?: number) {
    this.matrix[fromNode][toNode] = weight || 1;
    this.matrix[toNode][fromNode] = weight || 1;
  }

  removeEdge(fromNode: number, toNode: number) {
    this.matrix[fromNode][toNode] = 0;
    this.matrix[toNode][fromNode] = 0;
  }

  visualizeGraph(container: HTMLDivElement) {
    // Create nodes and edges for visualization
    const nodes = new DataSet(
      Array.from({ length: this.length }, (_, index) => ({
        id: index,
        label: `Node ${index}`,
      }))
    );

    const edgesData = [];

    for (let fromNode = 0; fromNode < this.length; fromNode++) {
      for (let toNode = fromNode + 1; toNode < this.length; toNode++) {
        const weight = this.matrix[fromNode][toNode];
        if (weight !== 0) {
          edgesData.push({ from: fromNode, to: toNode, label: `${weight}` });
        }
      }
    }

    const edges: any = new DataSet(edgesData as any);

    // Provide your own options if needed, e.g., layout, physics, etc.
    const options = {
      nodes: {
        shape: "circle",
      },
      edges: {
        arrows: "",
      },
    };

    const network = new Network(container, { nodes, edges }, options);
    return network;
  }
}

export default Graph;
