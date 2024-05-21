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
}

export interface IError {
    error: {
        message: string
    }

}