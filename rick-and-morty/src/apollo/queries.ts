import { gql } from '@apollo/client/core'

export const GET_ALL_CHARACTERS = gql`
  query GetAllCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        status
        gender
      }
    }
  }
`

export const GET_CHARACTERS_BY_NAME = gql`
  query GetCharactersByName($page: Int!, $name: String!) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        status
        species
        gender
        origin {
          id
          name
        }
        location {
          id
          name
        }
        episode {
          id
          name
          air_date
        }
      }
    }
  }
`

export const GET_CHARACTER_BY_ID = gql`
  query GetCharacterById($id: Int!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
        type
        dimension
        residents {
          id
          name
          status
          species
          type
          gender
          image
        }
      }
      location {
        id
        name
        type
        dimension
        residents {
          id
          name
          status
          species
          type
          gender
          image
        }
      }
      image
      episode {
        id
        name
        air_date
        episode
      }
    }
  }
`
