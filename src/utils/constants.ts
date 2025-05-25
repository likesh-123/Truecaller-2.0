export class Constant {
  static readonly MAX_FREE_USER_CONTACTS: number = 10_000;
  static readonly MAX_FREE_USER_BLOCKED_CONTACTS: number = 100;

  static readonly MAX_GOLD_USER_CONTACTS: number = 100_000;
  static readonly MAX_GOLD_USER_BLOCKED_CONTACTS: number = 1_000;

  static readonly MAX_PLATINUM_USER_CONTACTS: number = Number.MAX_SAFE_INTEGER;
  static readonly MAX_PLATINUM_USER_BLOCKED_CONTACTS: number = 100_000;

  static readonly MAX_COUNT_TO_MARK_GLOBAL_BLOCKED: number = 1;
  static readonly MAX_GLOBAL_SPAM_COUNT: number = 100_000_000;
}