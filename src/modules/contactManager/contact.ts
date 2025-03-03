class Contact {
  private firstName: string;
  private lastName: string;
  private phoneNumber: string;
  private email: string;
  private userId: string;

  constructor(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    userId: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.userId = userId;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  getEmail(): string {
    return this.email;
  }

  getUserId(): string {
    return this.userId;
  }
}
