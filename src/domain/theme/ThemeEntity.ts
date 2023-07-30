import { IPriority, Priority, PriorityType } from "./priority";
import { unprocessableEntityException } from "../../exception/error";
import { IPlatform, Platform, PlatformType } from "./platform";
import { ThemeId } from "./ThemeId";
import { AggregateRoot } from "../shared/aggregateRoot";
import { UserId } from "../user/UserId";
import { CategoryId } from "../category/CategoryId";

export interface ITheme {
  theme: string;
  categoryId: CategoryId;
  priority: PriorityType;
  platform: PlatformType;
  createdAt: Date;
  userId: UserId;
}

export class Theme extends AggregateRoot<ITheme, ThemeId> {
  public readonly theme: ITheme["theme"];
  public readonly categoryId: ITheme["categoryId"];
  public readonly priority: ITheme["priority"];
  public readonly platform: ITheme["platform"];
  public readonly createdAt: ITheme["createdAt"];
  public readonly userId: ITheme["userId"];

  constructor(props: ITheme, id: ThemeId) {
    super(props, id);
    checkTheme(props.theme, props.categoryId);
    const priorityInputVal: IPriority = { priority: props.priority };
    const _priority = Priority.create(priorityInputVal).priority;
    const platformInputVal: IPlatform = { platform: props.platform };
    const _platform = Platform.create(platformInputVal).platform;

    this.theme = props.theme;
    this.categoryId = props.categoryId;
    this.priority = _priority;
    this.platform = _platform;
    this.createdAt = props.createdAt;
    this.userId = props.userId;
  }

  public static construct(props: ITheme): Theme {
    return new Theme(props, ThemeId.construct());
  }

  public static reConstruct(props: ITheme, id: string): Theme {
    return new Theme(props, ThemeId.reConstruct(id));
  }
}

const checkTheme = (theme: string, categoryId: CategoryId): void => {
  if (!theme) {
    throw unprocessableEntityException("テーマは必須です。");
  }

  if (theme.length > 255) {
    throw unprocessableEntityException("テーマは255文字未満で入力してください");
  }
};
