export class ContactDoesNotExistsException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactDoesNotExistsException";
  }
}
