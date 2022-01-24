// @ts-check
import config from 'config'

const { HOST, PORT } = config.get('SERVER')
const { VERSION } = config.get('API')
const ENDPOINT = `${HOST}:${PORT}/api/v${VERSION}/users`

/**
 * Heatoas Single - User
 * @param {import('./types').User} resource
 * @returns {object}
 */
function single(resource) {
  return {
    id: resource._id,
    nikname: resource.nikname,
    email: resource.email,
    avatar: `${HOST}:${PORT}${resource.avatar}`,
    profile: 1,
    links: [{ rel: 'self', href: `${ENDPOINT}/${resource._id}` }]
  }
}

/**
 * Heatoas Multiple - Users
 * @param {object} results
 * @returns
 */
function multiple(results) {
  const {
    docs,
    totalDocs,
    limit,
    totalPages,
    page,
    // pagingCounter,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage
  } = results

  return {
    info: {
      totalDocs,
      totalPages,
      page,
      limit
      // pagingCounter
    },
    links: {
      prev: hasPrevPage ? `${ENDPOINT}?limit=${limit}&page=${prevPage}` : null,
      current: `${ENDPOINT}?limit=${limit}&page=${page}`,
      next: hasNextPage ? `${ENDPOINT}?limit=${limit}&page=${nextPage}` : null
    },
    users: docs.map((resource) => single(resource))
  }
}

export { single, multiple }
