/*
 * @Author: dgflash
 * @Date: 2021-07-03 16:13:17
 * @LastEditors: dgflash
 * @LastEditTime: 2022-10-27 18:23:06
 */
import { dynamicAtlasManager, macro, profiler, Root, _decorator } from 'cc';
import { DEBUG, JSB } from 'cc/env';
import { ecs } from '../libs/ecs/ECS';
import { frame } from './frame';


const { ccclass, property } = _decorator;

macro.CLEANUP_IMAGE_CACHE = false;
dynamicAtlasManager.enabled = true;
dynamicAtlasManager.maxFrameSize = 512;

@ccclass('Main')
export class Main extends Root {
    start() {
        if (DEBUG) profiler.showStats();
        // RandomManager.instance.setSeed(1);
        // for (let index = 0; index < 10; index++) {
        //     console.log(RandomManager.instance.getRandomInt(1, 1000));
        // }
    }

    protected run() {
        smc.initialize = ecs.getEntity<Initialize>(Initialize);
        if (JSB) {
            oops.gui.toast("热更新后新程序的提示");
        }
    }

    protected initGui() {
        frame.gui.init(UIConfigData);
    }

    protected async initEcsSystem() {
        frame.ecs.add(new EcsPositionSystem())
        frame.ecs.add(new EcsAccountSystem());
        frame.ecs.add(new EcsRoleSystem());
        frame.ecs.add(new EcsInitializeSystem());
    }
}
