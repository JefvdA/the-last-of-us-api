export const GET_CHARACTERS_QUERY = {
  query: `
    query {
      characters {
        uuid
        firstName
        lastName
      }
    }
  `,
};

export const GET_CHARACTERS_FILTER_FIRSTNAME_AND_LASTNAME_QUERY = (
  firstName: string,
  lastName: string,
) => {
  return {
    query: `
      query FilterCharactersOnFirstName($filters: FilterCharactersInput!) {
        characters(filters: $filters) {
          uuid
          firstName
          lastName
        }
      }
    `,
    variables: {
      filters: {
        firstName: firstName,
        lastName: lastName,
      },
    },
  };
};

export const GET_CHARACTER_BY_UUID = (uuid: string) => {
  return {
    query: `
      query GetCharacterByUuid($uuid: String!) {
        character(uuid: $uuid) {
          uuid
          firstName
          lastName
        }
      }
    `,
    variables: {
      uuid: uuid,
    },
  };
};

export const CREATE_CHARACTER_MUTATION = (
  firstName: string,
  lastName: string,
) => {
  return {
    query: `
      mutation CreateCharacter($createCharacterInput: CreateCharacterInput!) {
        createCharacter(createCharacterInput: $createCharacterInput) {
          uuid
          firstName
          lastName
        }
      }
    `,
    variables: {
      createCharacterInput: {
        firstName: firstName,
        lastName: lastName,
      },
    },
  };
};

export const UPDATE_CHARACTER_MUTATION = (
  uuid: string,
  firstName: string,
  lastName: string,
) => {
  return {
    query: `
      mutation UpdateCharacter($updateCharacterInput: UpdateCharacterInput!) {
        updateCharacter(updateCharacterInput: $updateCharacterInput) {
          uuid
        }
      }
    `,
    variables: {
      updateCharacterInput: {
        uuid: uuid,
        firstName: firstName,
        lastName: lastName,
      },
    },
  };
};
