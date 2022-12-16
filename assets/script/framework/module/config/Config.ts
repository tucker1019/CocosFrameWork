
import { BuildTimeConstants } from "./BuildTimeConstants";
import { GameConfig } from "./GameConfig";
import { GameQueryConfig } from "./GameQueryConfig";

/** 游戏配置静态访问类 */
export class Config {
    /** 环境常量 */
    public btc!: BuildTimeConstants;

    /** 游戏配置数据，版本号、支持语种等数据 */
    public game!: GameConfig;

    /** 浏览器查询参数 */
    public query!: GameQueryConfig;
}