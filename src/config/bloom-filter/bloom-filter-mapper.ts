import BloomFilterService from "./bloom-filter-service";

class BloomFilterManager {
  private static bloomFilters: Map<string, BloomFilterService> = new Map();

  static getOrCreateBloomFilter(bloomFilter: string): BloomFilterService {
    if (!this.bloomFilters.has(bloomFilter)) {
      this.bloomFilters.set(
        bloomFilter,
        new BloomFilterService(
          Number(process.env.BLOOM_FILTER_SIZE) || 1000,
          Number(process.env.BLOOM_FILTER_HASH_FUNCTIONS) || 3
        )
      );
    }
    return this.bloomFilters.get(bloomFilter)!;
  }
}

export default BloomFilterManager;
