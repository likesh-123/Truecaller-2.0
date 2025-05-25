export class BlockLimitExceededException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BlockLimitExceededException";
  }
}
