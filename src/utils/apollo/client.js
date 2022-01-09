import { ApolloClient, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { API_URL } from "@env";
// Link configuration.

// Upload link (related to file).
const uploadLink = createUploadLink({
  uri: API_URL,
});

// Error link.
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.error("[graphQLErrors]", graphQLErrors);
  }

  if (networkError) {
    console.error("[networkError]", networkError);
  }
});

// Authorization link.
const authLink = setContext((_, context) => {
  return {
    headers: {
      ...context?.headers,
    },
  };
});

const link = authLink.concat(errorLink).concat(uploadLink);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

export default client;
