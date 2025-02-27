export interface CreateAudit{
    idUser: number,
    tableAfected: string,
    idProduct: number,
    action: string,
    date: Date
}