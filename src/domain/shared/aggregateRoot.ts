import { Entity } from "./entity";
import { UniqueEntityId } from "./uniqueEntityId";

export abstract class AggregateRoot<T, U extends UniqueEntityId> extends Entity<T, U> {}
