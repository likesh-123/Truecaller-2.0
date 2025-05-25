export class ContactsExceededException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactsExceededException";
  }
}
