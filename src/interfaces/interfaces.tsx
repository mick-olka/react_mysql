export interface ITodo {
    title: string
    id: number
    completed: boolean
}

export interface TableInfoI {
    TABLE_NAME: string,
    TABLE_ROWS: number
}

export interface TableI {
    name: string,
    result: DBTable
}

export type DBTable = Array<DovTovI | DovFirmI | PreyskurantI | RealTovI>;
export type DBRowEl = DovTovI | DovFirmI | PreyskurantI | RealTovI;

export interface DovTovI {
    k_tt: number,
    n_tt: string
}

export interface DovFirmI {
    k_firm: number,
    n_firm: string
}

export interface RealTovI {
    k_pp: number,
    kil: number,
    d_real: string,
    d_spl: string,
    index: number
}

export interface PreyskurantI {
    k_pp: number,
    k_firm: number,
    k_tt: number,
    c_yo: number
}

export interface InsertionResI {
    "fieldCount": number,
    "affectedRows": number,
    "insertId": number,
    "serverStatus": number,
    "warningCount": number,
    "message": string,
    "protocol41": boolean,
    "changedRows": number
}