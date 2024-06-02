export interface IProduct {
    id: number,
    attributes: {
        category: {
            data: {
                attributes: {
                    title: string
                }
            }
        }
        title: string,
        description: string,
        price: number,
        stock: number
        thumbnail: {
            data: {
                attributes: {
                    formats?: {
                        thumbnail: {
                            url: string
                        }
                    }
                }
            }
        } | {
            data: {
                attributes: any
            }
        },
    }
    quantity: number
}

export interface IError {
    error: {
        message: string
    }
}

export interface IProductInputs {
    title: string,
    description: string,
    price: string,
    thumbnail: string | File,
    category: string,
}

export interface IAddProductForm {
    title: string,
    description: string,
    price: string,
    stock: string,
    category: string 
}