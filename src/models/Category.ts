import path from 'path';
import { createKey, listDirectories } from 'utils/hierarchy';
import { Algorithm } from 'models';

export class Category {
  key: string;
  algorithms!: Algorithm[];

  constructor(private path: string, public name: string) {
    this.key = createKey(name);
    this.refresh();
  }

  refresh() {
    this.algorithms = listDirectories(this.path)
      .filter(algorithmName => ['Bellman-Ford\'s Shortest Path', 'Floyd-Warshall\'s Shortest Path', 'Dijkstra\'s Shortest Path'].includes(algorithmName))
      .map(algorithmName => new Algorithm(path.resolve(this.path, algorithmName), algorithmName));
  }

  toJSON() {
    const {key, name, algorithms} = this;
    return {key, name, algorithms};
  }
}

export default Category;
