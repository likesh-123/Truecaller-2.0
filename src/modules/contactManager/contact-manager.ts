class ContactManager {
  private userTries: Map<string, Trie>;

  constructor() {
    this.userTries = new Map();
  }

  private getUserTrie(userId: string): Trie {
    if (!this.userTries.has(userId)) {
      this.userTries.set(userId, new Trie());
    }
    return this.userTries.get(userId)!;
  }

  addContact(userId: string, contact: string): void {
    this.getUserTrie(userId).insert(contact);
  }

  searchContact(userId: string, contact: string): boolean {
    return this.getUserTrie(userId).search(contact);
  }

  getAutocomplete(userId: string, prefix: string): string[] {
    return this.getUserTrie(userId).autocomplete(prefix);
  }

  deleteContact(userId: string, contact: string): boolean {
    return this.getUserTrie(userId).delete(contact);
  }
}

const contactManager = new ContactManager();
