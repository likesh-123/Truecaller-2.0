class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(contact: string): void {
    let node = this.root;
    console.log("contact inserting: ", contact);
    for (const char of contact) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
  }

  search(contact: string): boolean {
    let node = this.root;
    for (const char of contact) {
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char)!;
    }
    return node.isEndOfWord;
  }

  private findWords(
    node: TrieNode,
    prefix: string,
    results: string[],
    limit: number
  ): void {
    if (results.length >= limit) return;

    if (node.isEndOfWord) {
      results.push(prefix);
      if (results.length >= limit) return;
    }

    for (const [char, childNode] of node.children) {
      if (results.length >= limit) return;
      this.findWords(childNode, prefix + char, results, limit);
    }
  }

  autocomplete(prefix: string, limit: number = 10): string[] {
    let node = this.root;
    console.log("root in autocomplete: ", node);
    for (const char of prefix) {
      if (!node.children.has(char)) {
        return [];
      }
      node = node.children.get(char)!;
    }

    const results: string[] = [];
    this.findWords(node, prefix, results, limit);
    console.log("results in autocomplete: ", results);
    return results;
  }

  delete(contact: string): boolean {
    return this.deleteHelper(this.root, contact, 0);
  }

  private deleteHelper(
    node: TrieNode,
    contact: string,
    depth: number
  ): boolean {
    if (depth === contact.length) {
      if (!node.isEndOfWord) return false;
      node.isEndOfWord = false;
      return node.children.size === 0;
    }

    const char = contact[depth];
    if (!node.children.has(char)) return false;

    const shouldDelete = this.deleteHelper(
      node.children.get(char)!,
      contact,
      depth + 1
    );

    if (shouldDelete) {
      node.children.delete(char);
      return node.children.size === 0 && !node.isEndOfWord;
    }

    return false;
  }
}

export default Trie;