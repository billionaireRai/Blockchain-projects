type ModalType = "success" | "error" | "warning" | "info";

export interface ModalDataType {
    type:ModalType ;
    status:number ;
    title:string ;
    message:string ;
    description:string ;
}