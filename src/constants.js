export const GRAPHQL_API ='http://localhost:4000/'; 

export const GET_ALL_SLIDE =
`query allSLide{
    sliders{
    id 
    title
    url
    para
  }
}`;