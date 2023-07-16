import { unprocessableEntityException } from "../../exception/error";
import { ValueObject } from "../shared/valueObject";

export const PriorityType = {
  Low: 1,
  Middle: 2,
  High: 3,
} as const;

export type PriorityType = (typeof PriorityType)[keyof typeof PriorityType];

export interface IPriority {
  priority: PriorityType;
}

export class Priority extends ValueObject<IPriority> {
  public get priority(): PriorityType {
    return this.priority;
  }

  private constructor(props: IPriority) {
    super(props);
  }

  public static create(props: IPriority): Priority {
    const priorityList = Object.values(PriorityType);
    if (!priorityList.find((priority: PriorityType) => priority === props.priority)) {
      throw unprocessableEntityException("優先度の値が誤っています。");
    }
    return new Priority(props);
  }
}
