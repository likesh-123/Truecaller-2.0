import { webcrypto } from "crypto";
import * as fs from "fs/promises";

export default class BloomFilterService {
  private size: number;
  private bitArray: Uint8Array;
  private hashFunctions: number;

  constructor(size: number, hashFunctions: number, bitArray?: Uint8Array) {
    this.size = size;
    this.hashFunctions = hashFunctions;
    this.bitArray = bitArray ?? new Uint8Array(size);
  }

  private async hash(value: string, seed: number): Promise<number> {
    const encoder = new TextEncoder();
    const data = encoder.encode(value + seed);
    const hashBuffer = await webcrypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashHex = hashArray
      .slice(0, 4)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return parseInt(hashHex, 16) % this.size;
  }

  private async getHashes(value: string): Promise<number[]> {
    return Promise.all(
      Array.from({ length: this.hashFunctions }, (_, i) => this.hash(value, i))
    );
  }

  async add(value: string): Promise<void> {
    const hashes = await this.getHashes(value);
    hashes.forEach((hash) => {
      this.bitArray[hash] = 1;
    });
  }

  async contains(value: string): Promise<boolean> {
    const hashes = await this.getHashes(value);
    return hashes.every((hash) => this.bitArray[hash] === 1);
  }

  toJSON(): string {
    return JSON.stringify({
      size: this.size,
      hashFunctions: this.hashFunctions,
      bitArray: Array.from(this.bitArray),
    });
  }

  static async loadFromFile(filePath: string): Promise<BloomFilterService> {
    try {
      const data = await fs.readFile(filePath, "utf-8");
      const { size, hashFunctions, bitArray } = JSON.parse(data);
      return new BloomFilterService(
        size,
        hashFunctions,
        Uint8Array.from(bitArray)
      );
    } catch (error) {
      console.warn(
        "Bloom filter file not found or corrupt. Creating new filter."
      );
      return new BloomFilterService(10000, 4);
    }
  }

  async saveToFile(filePath: string): Promise<void> {
    const json = this.toJSON();
    await fs.writeFile(filePath, json, "utf-8");
  }
}
