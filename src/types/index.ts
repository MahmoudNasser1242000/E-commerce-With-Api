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
                    formats: {
                        thumbnail: {
                            url: string
                        }
                    }
                }
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