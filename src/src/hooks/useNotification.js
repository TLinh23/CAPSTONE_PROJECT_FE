import { notification } from "antd";

export const useNotification = () => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement, type, content) => {
        api[type]({
            message: "Register As Parent",
            description: `${content}`,
            placement,
        });
    };
    return{api, contextHolder, openNotification}
}