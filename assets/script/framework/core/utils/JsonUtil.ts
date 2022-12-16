import { error, JsonAsset } from "cc";
import { oops } from "../frame";

/** 资源路径 */
let path: string = "config/game/";

/** 数据缓存 */
let data: Map<string, any> = new Map();

/** JSON数据表工具 */
export class JsonUtil {
    /**
     * 通知资源名从缓存中获取一个Json数据表
     * @param name  资源名
     */
    public static get(name: string): any {
        if (data.has(name))
            return data.get(name);
    }

    /**
     * 通知资源名加载Json数据表
     * @param name      资源名
     * @param callback  资源加载完成回调
     */
    public static load(name: string, callback: Function): void {
        if (data.has(name))
            callback(data.get(name));
        else {
            let url = path + name;
            oops.res.load(url, JsonAsset, (err: Error | null, content: JsonAsset) => {
                if (err) {
                    error(err.message);
                }
                data.set(name, content.json);
                callback(content.json)
            });
        }
    }

    /**
     * 异步加载Json数据表
     * @param name 资源名
     */
    public static loadAsync(name: string):Promise<any> {
        return new Promise((resolve, reject) => {
            if (data.has(name)) {
                resolve(data.get(name))
            }
            else {
                let url = path + name;
                oops.res.load(url, JsonAsset, (err: Error | null, content: JsonAsset) => {
                    if (err) {
                        error(err.message);
                    }
                    data.set(name, content.json);
                    resolve(content.json)
                });
            }
        });
    }

    /**
     * 通过指定资源名释放资源
     * @param name 资源名
     */
    public static release(name: string):void {
        let url = path + name;
        data.delete(name);
        oops.res.release(url);
    }
}