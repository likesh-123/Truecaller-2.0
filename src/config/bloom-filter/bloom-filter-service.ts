import { webcrypto } from "crypto";

export default class BloomFilterService {
  private size: number;
  private bitArray: Uint8Array;
  private hashFunctions: number;

  constructor(size: number, hashFunctions: number) {
    this.size = size;
    this.hashFunctions = hashFunctions;
    this.bitArray = new Uint8Array(size);
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
}
