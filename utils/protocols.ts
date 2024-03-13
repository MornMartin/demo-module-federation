import Channel from "./Channel";

/**
 * 消息传递协议定义
 */
export const enum EMessagegProtocols {
    test = 0,
    // ...
}
/**
 * 消息传递信道定义
 */
export type TMessageChannel = Channel<EMessagegProtocols, any>;
