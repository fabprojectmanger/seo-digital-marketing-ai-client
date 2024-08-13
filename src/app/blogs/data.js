export const All_BLOGS_QUERY = `
query BlogsCollection {
    blogsCollection {
        items {
            _id
            title
            date
            slug
            shortDescription
            image {
                url
            }
                sys {
                id
            }
        }
    }
}
`