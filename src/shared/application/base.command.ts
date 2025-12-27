export declare const COMMAND_BRAND: unique symbol;

export abstract class Command<TProps = void, TContext = void> {
  readonly [COMMAND_BRAND]: Command<TProps, TContext>;

  constructor(
    public readonly props: TProps,
    public readonly context: TContext,
  ) {}
}
