export interface Schema {
    loading?: boolean;
    fields?: SchemaDefaultField[];
    groups?: SchemaGroup[];
}

export interface SchemaGroup {
    fields: SchemaDefaultField[];
    styleClasses?: string | string[];
    legend?: string;
}

export interface SchemaDefaultField {
    type?: string;
    class?: string;
    text?: string;
    label?: string;
    placeholder?: string;
}

export interface SchemaErrorList extends SchemaDefaultField {
    count: number;
}

export interface SchemaOptions {
    validateAfterLoad?: boolean;
    validateAfterChanged?: boolean;
}
