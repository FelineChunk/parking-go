import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type transactionsModel = runtime.Types.Result.DefaultSelection<Prisma.$transactionsPayload>;
export type AggregateTransactions = {
    _count: TransactionsCountAggregateOutputType | null;
    _avg: TransactionsAvgAggregateOutputType | null;
    _sum: TransactionsSumAggregateOutputType | null;
    _min: TransactionsMinAggregateOutputType | null;
    _max: TransactionsMaxAggregateOutputType | null;
};
export type TransactionsAvgAggregateOutputType = {
    id_transaction: number | null;
    fee: number | null;
};
export type TransactionsSumAggregateOutputType = {
    id_transaction: number | null;
    fee: number | null;
};
export type TransactionsMinAggregateOutputType = {
    id_transaction: number | null;
    time_in: Date | null;
    time_out: Date | null;
    card_id: string | null;
    fee: number | null;
    status: $Enums.transaction_status | null;
};
export type TransactionsMaxAggregateOutputType = {
    id_transaction: number | null;
    time_in: Date | null;
    time_out: Date | null;
    card_id: string | null;
    fee: number | null;
    status: $Enums.transaction_status | null;
};
export type TransactionsCountAggregateOutputType = {
    id_transaction: number;
    time_in: number;
    time_out: number;
    card_id: number;
    fee: number;
    status: number;
    _all: number;
};
export type TransactionsAvgAggregateInputType = {
    id_transaction?: true;
    fee?: true;
};
export type TransactionsSumAggregateInputType = {
    id_transaction?: true;
    fee?: true;
};
export type TransactionsMinAggregateInputType = {
    id_transaction?: true;
    time_in?: true;
    time_out?: true;
    card_id?: true;
    fee?: true;
    status?: true;
};
export type TransactionsMaxAggregateInputType = {
    id_transaction?: true;
    time_in?: true;
    time_out?: true;
    card_id?: true;
    fee?: true;
    status?: true;
};
export type TransactionsCountAggregateInputType = {
    id_transaction?: true;
    time_in?: true;
    time_out?: true;
    card_id?: true;
    fee?: true;
    status?: true;
    _all?: true;
};
export type TransactionsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.transactionsWhereInput;
    orderBy?: Prisma.transactionsOrderByWithRelationInput | Prisma.transactionsOrderByWithRelationInput[];
    cursor?: Prisma.transactionsWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TransactionsCountAggregateInputType;
    _avg?: TransactionsAvgAggregateInputType;
    _sum?: TransactionsSumAggregateInputType;
    _min?: TransactionsMinAggregateInputType;
    _max?: TransactionsMaxAggregateInputType;
};
export type GetTransactionsAggregateType<T extends TransactionsAggregateArgs> = {
    [P in keyof T & keyof AggregateTransactions]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTransactions[P]> : Prisma.GetScalarType<T[P], AggregateTransactions[P]>;
};
export type transactionsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.transactionsWhereInput;
    orderBy?: Prisma.transactionsOrderByWithAggregationInput | Prisma.transactionsOrderByWithAggregationInput[];
    by: Prisma.TransactionsScalarFieldEnum[] | Prisma.TransactionsScalarFieldEnum;
    having?: Prisma.transactionsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TransactionsCountAggregateInputType | true;
    _avg?: TransactionsAvgAggregateInputType;
    _sum?: TransactionsSumAggregateInputType;
    _min?: TransactionsMinAggregateInputType;
    _max?: TransactionsMaxAggregateInputType;
};
export type TransactionsGroupByOutputType = {
    id_transaction: number;
    time_in: Date;
    time_out: Date | null;
    card_id: string | null;
    fee: number | null;
    status: $Enums.transaction_status;
    _count: TransactionsCountAggregateOutputType | null;
    _avg: TransactionsAvgAggregateOutputType | null;
    _sum: TransactionsSumAggregateOutputType | null;
    _min: TransactionsMinAggregateOutputType | null;
    _max: TransactionsMaxAggregateOutputType | null;
};
type GetTransactionsGroupByPayload<T extends transactionsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TransactionsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TransactionsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TransactionsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TransactionsGroupByOutputType[P]>;
}>>;
export type transactionsWhereInput = {
    AND?: Prisma.transactionsWhereInput | Prisma.transactionsWhereInput[];
    OR?: Prisma.transactionsWhereInput[];
    NOT?: Prisma.transactionsWhereInput | Prisma.transactionsWhereInput[];
    id_transaction?: Prisma.IntFilter<"transactions"> | number;
    time_in?: Prisma.DateTimeFilter<"transactions"> | Date | string;
    time_out?: Prisma.DateTimeNullableFilter<"transactions"> | Date | string | null;
    card_id?: Prisma.StringNullableFilter<"transactions"> | string | null;
    fee?: Prisma.IntNullableFilter<"transactions"> | number | null;
    status?: Prisma.Enumtransaction_statusFilter<"transactions"> | $Enums.transaction_status;
};
export type transactionsOrderByWithRelationInput = {
    id_transaction?: Prisma.SortOrder;
    time_in?: Prisma.SortOrder;
    time_out?: Prisma.SortOrderInput | Prisma.SortOrder;
    card_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    fee?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
};
export type transactionsWhereUniqueInput = Prisma.AtLeast<{
    id_transaction?: number;
    AND?: Prisma.transactionsWhereInput | Prisma.transactionsWhereInput[];
    OR?: Prisma.transactionsWhereInput[];
    NOT?: Prisma.transactionsWhereInput | Prisma.transactionsWhereInput[];
    time_in?: Prisma.DateTimeFilter<"transactions"> | Date | string;
    time_out?: Prisma.DateTimeNullableFilter<"transactions"> | Date | string | null;
    card_id?: Prisma.StringNullableFilter<"transactions"> | string | null;
    fee?: Prisma.IntNullableFilter<"transactions"> | number | null;
    status?: Prisma.Enumtransaction_statusFilter<"transactions"> | $Enums.transaction_status;
}, "id_transaction">;
export type transactionsOrderByWithAggregationInput = {
    id_transaction?: Prisma.SortOrder;
    time_in?: Prisma.SortOrder;
    time_out?: Prisma.SortOrderInput | Prisma.SortOrder;
    card_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    fee?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    _count?: Prisma.transactionsCountOrderByAggregateInput;
    _avg?: Prisma.transactionsAvgOrderByAggregateInput;
    _max?: Prisma.transactionsMaxOrderByAggregateInput;
    _min?: Prisma.transactionsMinOrderByAggregateInput;
    _sum?: Prisma.transactionsSumOrderByAggregateInput;
};
export type transactionsScalarWhereWithAggregatesInput = {
    AND?: Prisma.transactionsScalarWhereWithAggregatesInput | Prisma.transactionsScalarWhereWithAggregatesInput[];
    OR?: Prisma.transactionsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.transactionsScalarWhereWithAggregatesInput | Prisma.transactionsScalarWhereWithAggregatesInput[];
    id_transaction?: Prisma.IntWithAggregatesFilter<"transactions"> | number;
    time_in?: Prisma.DateTimeWithAggregatesFilter<"transactions"> | Date | string;
    time_out?: Prisma.DateTimeNullableWithAggregatesFilter<"transactions"> | Date | string | null;
    card_id?: Prisma.StringNullableWithAggregatesFilter<"transactions"> | string | null;
    fee?: Prisma.IntNullableWithAggregatesFilter<"transactions"> | number | null;
    status?: Prisma.Enumtransaction_statusWithAggregatesFilter<"transactions"> | $Enums.transaction_status;
};
export type transactionsCreateInput = {
    time_in?: Date | string;
    time_out?: Date | string | null;
    card_id?: string | null;
    fee?: number | null;
    status?: $Enums.transaction_status;
};
export type transactionsUncheckedCreateInput = {
    id_transaction?: number;
    time_in?: Date | string;
    time_out?: Date | string | null;
    card_id?: string | null;
    fee?: number | null;
    status?: $Enums.transaction_status;
};
export type transactionsUpdateInput = {
    time_in?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    time_out?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    card_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fee?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.Enumtransaction_statusFieldUpdateOperationsInput | $Enums.transaction_status;
};
export type transactionsUncheckedUpdateInput = {
    id_transaction?: Prisma.IntFieldUpdateOperationsInput | number;
    time_in?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    time_out?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    card_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fee?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.Enumtransaction_statusFieldUpdateOperationsInput | $Enums.transaction_status;
};
export type transactionsCreateManyInput = {
    id_transaction?: number;
    time_in?: Date | string;
    time_out?: Date | string | null;
    card_id?: string | null;
    fee?: number | null;
    status?: $Enums.transaction_status;
};
export type transactionsUpdateManyMutationInput = {
    time_in?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    time_out?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    card_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fee?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.Enumtransaction_statusFieldUpdateOperationsInput | $Enums.transaction_status;
};
export type transactionsUncheckedUpdateManyInput = {
    id_transaction?: Prisma.IntFieldUpdateOperationsInput | number;
    time_in?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    time_out?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    card_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fee?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    status?: Prisma.Enumtransaction_statusFieldUpdateOperationsInput | $Enums.transaction_status;
};
export type transactionsCountOrderByAggregateInput = {
    id_transaction?: Prisma.SortOrder;
    time_in?: Prisma.SortOrder;
    time_out?: Prisma.SortOrder;
    card_id?: Prisma.SortOrder;
    fee?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
};
export type transactionsAvgOrderByAggregateInput = {
    id_transaction?: Prisma.SortOrder;
    fee?: Prisma.SortOrder;
};
export type transactionsMaxOrderByAggregateInput = {
    id_transaction?: Prisma.SortOrder;
    time_in?: Prisma.SortOrder;
    time_out?: Prisma.SortOrder;
    card_id?: Prisma.SortOrder;
    fee?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
};
export type transactionsMinOrderByAggregateInput = {
    id_transaction?: Prisma.SortOrder;
    time_in?: Prisma.SortOrder;
    time_out?: Prisma.SortOrder;
    card_id?: Prisma.SortOrder;
    fee?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
};
export type transactionsSumOrderByAggregateInput = {
    id_transaction?: Prisma.SortOrder;
    fee?: Prisma.SortOrder;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type Enumtransaction_statusFieldUpdateOperationsInput = {
    set?: $Enums.transaction_status;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type transactionsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_transaction?: boolean;
    time_in?: boolean;
    time_out?: boolean;
    card_id?: boolean;
    fee?: boolean;
    status?: boolean;
}, ExtArgs["result"]["transactions"]>;
export type transactionsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_transaction?: boolean;
    time_in?: boolean;
    time_out?: boolean;
    card_id?: boolean;
    fee?: boolean;
    status?: boolean;
}, ExtArgs["result"]["transactions"]>;
export type transactionsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id_transaction?: boolean;
    time_in?: boolean;
    time_out?: boolean;
    card_id?: boolean;
    fee?: boolean;
    status?: boolean;
}, ExtArgs["result"]["transactions"]>;
export type transactionsSelectScalar = {
    id_transaction?: boolean;
    time_in?: boolean;
    time_out?: boolean;
    card_id?: boolean;
    fee?: boolean;
    status?: boolean;
};
export type transactionsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id_transaction" | "time_in" | "time_out" | "card_id" | "fee" | "status", ExtArgs["result"]["transactions"]>;
export type $transactionsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "transactions";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id_transaction: number;
        time_in: Date;
        time_out: Date | null;
        card_id: string | null;
        fee: number | null;
        status: $Enums.transaction_status;
    }, ExtArgs["result"]["transactions"]>;
    composites: {};
};
export type transactionsGetPayload<S extends boolean | null | undefined | transactionsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$transactionsPayload, S>;
export type transactionsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<transactionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TransactionsCountAggregateInputType | true;
};
export interface transactionsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['transactions'];
        meta: {
            name: 'transactions';
        };
    };
    findUnique<T extends transactionsFindUniqueArgs>(args: Prisma.SelectSubset<T, transactionsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__transactionsClient<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends transactionsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, transactionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__transactionsClient<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends transactionsFindFirstArgs>(args?: Prisma.SelectSubset<T, transactionsFindFirstArgs<ExtArgs>>): Prisma.Prisma__transactionsClient<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends transactionsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, transactionsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__transactionsClient<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends transactionsFindManyArgs>(args?: Prisma.SelectSubset<T, transactionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends transactionsCreateArgs>(args: Prisma.SelectSubset<T, transactionsCreateArgs<ExtArgs>>): Prisma.Prisma__transactionsClient<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends transactionsCreateManyArgs>(args?: Prisma.SelectSubset<T, transactionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends transactionsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, transactionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends transactionsDeleteArgs>(args: Prisma.SelectSubset<T, transactionsDeleteArgs<ExtArgs>>): Prisma.Prisma__transactionsClient<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends transactionsUpdateArgs>(args: Prisma.SelectSubset<T, transactionsUpdateArgs<ExtArgs>>): Prisma.Prisma__transactionsClient<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends transactionsDeleteManyArgs>(args?: Prisma.SelectSubset<T, transactionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends transactionsUpdateManyArgs>(args: Prisma.SelectSubset<T, transactionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends transactionsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, transactionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends transactionsUpsertArgs>(args: Prisma.SelectSubset<T, transactionsUpsertArgs<ExtArgs>>): Prisma.Prisma__transactionsClient<runtime.Types.Result.GetResult<Prisma.$transactionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends transactionsCountArgs>(args?: Prisma.Subset<T, transactionsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TransactionsCountAggregateOutputType> : number>;
    aggregate<T extends TransactionsAggregateArgs>(args: Prisma.Subset<T, TransactionsAggregateArgs>): Prisma.PrismaPromise<GetTransactionsAggregateType<T>>;
    groupBy<T extends transactionsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: transactionsGroupByArgs['orderBy'];
    } : {
        orderBy?: transactionsGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, transactionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: transactionsFieldRefs;
}
export interface Prisma__transactionsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface transactionsFieldRefs {
    readonly id_transaction: Prisma.FieldRef<"transactions", 'Int'>;
    readonly time_in: Prisma.FieldRef<"transactions", 'DateTime'>;
    readonly time_out: Prisma.FieldRef<"transactions", 'DateTime'>;
    readonly card_id: Prisma.FieldRef<"transactions", 'String'>;
    readonly fee: Prisma.FieldRef<"transactions", 'Int'>;
    readonly status: Prisma.FieldRef<"transactions", 'transaction_status'>;
}
export type transactionsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelect<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    where: Prisma.transactionsWhereUniqueInput;
};
export type transactionsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelect<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    where: Prisma.transactionsWhereUniqueInput;
};
export type transactionsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelect<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    where?: Prisma.transactionsWhereInput;
    orderBy?: Prisma.transactionsOrderByWithRelationInput | Prisma.transactionsOrderByWithRelationInput[];
    cursor?: Prisma.transactionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TransactionsScalarFieldEnum | Prisma.TransactionsScalarFieldEnum[];
};
export type transactionsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelect<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    where?: Prisma.transactionsWhereInput;
    orderBy?: Prisma.transactionsOrderByWithRelationInput | Prisma.transactionsOrderByWithRelationInput[];
    cursor?: Prisma.transactionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TransactionsScalarFieldEnum | Prisma.TransactionsScalarFieldEnum[];
};
export type transactionsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelect<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    where?: Prisma.transactionsWhereInput;
    orderBy?: Prisma.transactionsOrderByWithRelationInput | Prisma.transactionsOrderByWithRelationInput[];
    cursor?: Prisma.transactionsWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TransactionsScalarFieldEnum | Prisma.TransactionsScalarFieldEnum[];
};
export type transactionsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelect<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    data?: Prisma.XOR<Prisma.transactionsCreateInput, Prisma.transactionsUncheckedCreateInput>;
};
export type transactionsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.transactionsCreateManyInput | Prisma.transactionsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type transactionsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    data: Prisma.transactionsCreateManyInput | Prisma.transactionsCreateManyInput[];
    skipDuplicates?: boolean;
};
export type transactionsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelect<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.transactionsUpdateInput, Prisma.transactionsUncheckedUpdateInput>;
    where: Prisma.transactionsWhereUniqueInput;
};
export type transactionsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.transactionsUpdateManyMutationInput, Prisma.transactionsUncheckedUpdateManyInput>;
    where?: Prisma.transactionsWhereInput;
    limit?: number;
};
export type transactionsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.transactionsUpdateManyMutationInput, Prisma.transactionsUncheckedUpdateManyInput>;
    where?: Prisma.transactionsWhereInput;
    limit?: number;
};
export type transactionsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelect<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    where: Prisma.transactionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.transactionsCreateInput, Prisma.transactionsUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.transactionsUpdateInput, Prisma.transactionsUncheckedUpdateInput>;
};
export type transactionsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelect<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
    where: Prisma.transactionsWhereUniqueInput;
};
export type transactionsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.transactionsWhereInput;
    limit?: number;
};
export type transactionsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.transactionsSelect<ExtArgs> | null;
    omit?: Prisma.transactionsOmit<ExtArgs> | null;
};
export {};
