export declare const transaction_status: {
    readonly IN: "IN";
    readonly OUT: "OUT";
    readonly DONE: "DONE";
};
export type transaction_status = (typeof transaction_status)[keyof typeof transaction_status];
