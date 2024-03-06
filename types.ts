export type ApplyFilter = {
    filter: Filter;
    responses: any;
}
export enum Condition {
    Does_Not_Equal = "does_not_equal",
    Equals = "equals",
    Greater_Than = "greater_than",
    Less_Than = "less_than"
}

export type Filter = {
    id: string;
    condition: Condition;
    value: number | string;
}

export type FilterResponse = {
    data: any;
    filters: any;
}

export type FormSubmissions = {
    formId: string;
}

export type Question = {
    id: string;
    name: string;
    type: string;
    value: string;
}
