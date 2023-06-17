export const COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 3, query: "collection_type:smart") {
      nodes {
        products(first: 100) {
          edges {
          node {
          id
          handle
          title
          media(first: 10) {
            nodes {
              ... on MediaImage {
                mediaContentType
                image {
                  id
                  url
                  altText
                  width
                  height
                }
              }
              ... on Model3d {
                id
                mediaContentType
                sources {
                  mimeType
                  url
                }
              }
            }
          }
          }
          }
          }
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;