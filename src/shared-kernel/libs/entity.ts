export declare const ENTITY_BRAND: unique symbol;

export type AggregateId = string;

export abstract class Entity {
  private readonly [ENTITY_BRAND]: Entity;

  protected constructor(id: AggregateId) {
    this._id = id;
  }

  protected readonly _id: AggregateId;

  public get id(): AggregateId {
    return this._id;
  }

  public equals(other: Entity): boolean {
    return this._id === other._id;
  }
}
