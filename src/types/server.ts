export type Server = {
    id?:string,
    name: string,
    plan: string,
    price: number,
    date_term: string
    responsible: string,
    ads?:ServerPaid
    // status: 0,
    // register_id: number,
    // modify_id: number,
    servicePaid_id: number
}
export type ServerPaid = {
    id?:string,
    server_id: number,
    price: number,
    date_term: string,
    ads:string
}