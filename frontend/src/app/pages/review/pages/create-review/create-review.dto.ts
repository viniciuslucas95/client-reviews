import {TableButtonsColumn} from "../../../../components/table/table.component.type";

export type ClientReviewCreationTableContentItem = {
    id: string
    name: string
    contactName: string
    lastReviewDate?: string
    cnpj?: string
    buttons?: TableButtonsColumn[]
}
