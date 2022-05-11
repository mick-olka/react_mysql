
export interface TableInfoI {
    TABLE_NAME: string,
    TABLE_ROWS: number
}

export interface FieldInfoI {
    catalog: string,
    db: string,
    table: string,
    orgTable: string,
    name: string,
    orgName: string,
    charsetNr: number,
    length: number,
    type: number,
    flags: number,
    decimals: number,
    zeroFill: boolean,
    protocol41: boolean
}

export interface QueryDBResponseI {
    table: TableI,
    err: SQLError | null
}

export interface UserI {
    name: string,
    email: string,
    status: 0 | 1 | 2 | 3
}

export interface QueryUserResponseI {
    code: 0 | 1,
    msg: string,
    user: UserI,
    err: SQLError | null
}

export interface TableI {
    fields: FieldInfoI[],
    body: TableRowI[]
}

export type DBRowEl = TableRowI;

export interface TableRowI {
    [index: string]: string | number,
}

export interface InsertionResI {
    result: {
        "fieldCount": number,
        "affectedRows": number,
        "insertId": number,
        "serverStatus": number,
        "warningCount": number,
        "message": string,
        "protocol41": boolean,
        "changedRows": number
    } | null,
    err: SQLError | null,
}

export interface SQLError {
    code: string,
    errno: number,
    sqlMessage: string,
    sqlState: string,
    index: number,
    sql: string
}

export interface UserReqDataI {
    id: number,
    name: string,
    password: string,
    email: string,
    status: 0 | 1 | 2 | 3 //  admin \ r-- \ rw- \ rwd
}

export interface LoginFormValuesI {
    name: string
    password: string,
}

export interface RegisterFormValuesI extends LoginFormValuesI {
    email: string,
}