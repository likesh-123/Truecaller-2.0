import Trie from "./contact-trie";
import BloomFilterManager from "../../config/bloom-filter/bloom-filter-mapper";
import Contact from "../../modules/contact/models/contact-models";

class ContactManager {
  private static instance: ContactManager;
  private userTries: Map<string, Trie>;

  private constructor() {
    this.userTries = new Map();
  }

  public static getInstance(): ContactManager {
    if (!ContactManager.instance) {
      ContactManager.instance = new ContactManager();
    }
    return ContactManager.instance;
  }

  private async getUserTrie(userId: string): Promise<Trie> {
    if (this.userTries.has(userId)) return this.userTries.get(userId)!;

    const trie = new Trie();
    const bloomFilter = BloomFilterManager.getOrCreateBloomFilter("TRIE");

    if (!(await bloomFilter.contains(userId))) this.userTries.set(userId, trie);
    else {
      const contacts = await Contact.findAll({
        where: { userId: userId },
      });

      if (contacts.length > 0) {
        await bloomFilter.add(userId);

        for (const contact of contacts) {
          const phoneNumber = contact.dataValues.phoneNumber;
          if (phoneNumber) {
            trie.insert(phoneNumber);
          }
        }
      }

      this.userTries.set(userId, trie);
    }

    return trie;
  }

  public async addContact(userId: string, contact: string): Promise<void> {
    const trie = await this.getUserTrie(userId);
    trie.insert(contact);
  }

  public async searchContact(
    userId: string,
    contact: string
  ): Promise<boolean> {
    const trie = await this.getUserTrie(userId);
    return trie.search(contact);
  }

  public async getAutocomplete(
    userId: string,
    prefix: string
  ): Promise<string[]> {
    const trie = await this.getUserTrie(userId);
    return trie.autocomplete(prefix);
  }

  public async deleteContact(
    userId: string,
    contact: string
  ): Promise<boolean> {
    const trie = await this.getUserTrie(userId);
    return trie.delete(contact);
  }
}

export default ContactManager;
