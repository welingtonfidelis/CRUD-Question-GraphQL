async function fetchGraphQL(text, variables) {
    // Fetch data from GitHub's GraphQL API:
    const response = await fetch('http://localhost:3001', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: text,
        variables,
      }),
    });
  
    return await response.json();
  }
  
  export default fetchGraphQL;