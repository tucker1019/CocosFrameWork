import { Camera, Vec3, view } from "cc";

/** 摄像机工具 */
export class CameraUtil {
    /**
     * 当前世界坐标是否在摄像机显示范围内
     * @param camera    摄像机
     * @param worldPos  坐标
     */
    public static isInView(camera: Camera, worldPos: Vec3) {
        let cameraPos = camera.node.getWorldPosition();
        let viewPos = camera.worldToScreen(worldPos);
        let dir = Vec3.normalize(new Vec3(), worldPos.subtract(cameraPos));
        let forward = camera.node.forward;
        let dot = Vec3.dot(forward, dir);

        const viewportRect = view.getViewportRect();

        // 判断物体是否在相机前面
        if (dot > 0
            // 判断物体是否在视窗内
            && (viewPos.x <= viewportRect.width) && (viewPos.x >= 0)
            && (viewPos.y <= viewportRect.height) && (viewPos.y >= 0))
            return true;
        else
            return false;
    }
}