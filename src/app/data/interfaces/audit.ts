export interface Audit{
    idAudit: number,
    idUser: number,
    tableAfected: string,
    idProduct: number,
    action: string,
    date: Date
}