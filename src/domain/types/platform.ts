import { unprocessableEntityException } from "../../exception/error";
import { ValueObject } from "../shared/valueObject";

export interface IPlatform {
  platform: number;
}

export const PlatformType = {
  Note: 1,
  Youtube: 2,
  Twitter: 3,
  Tiktok: 4,
  Qiita: 5,
  Zenn: 6,
  Other: 7,
} as const;

export type PlatformType = (typeof PlatformType)[keyof typeof PlatformType];

export class Platform extends ValueObject<IPlatform> {
  public get platform(): number {
    return this.platform;
  }

  private constructor(props: IPlatform) {
    super(props);
  }

  public static create(props: IPlatform): Platform {
    const platformList = Object.values(PlatformType);
    if (!platformList.find((platform: PlatformType) => platform === props.platform)) {
      throw unprocessableEntityException("プラットフォームの値が誤っています。");
    }
    return new Platform(props);
  }
}
