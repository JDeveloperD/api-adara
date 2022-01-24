// @ts-check
import config from 'config'

const { HOST, PORT } = config.get('SERVER')
const { VERSION } = config.get('API')
const ENDPOINT = `${HOST}:${PORT}/api/v${VERSION}/users`

/**
 * Heatoas Single - User
 * @param {import('./types').User} resource
 * @param {string} profileUser
 * @returns {object}
 */
function single(resource, profileUser) {
  return {
    id: resource._id,
    nikname: resource.nikname,
    email: resource.email,
    avatar: `${HOST}:${PORT}${resource.avatar}`,
    profile:
      profileUser === 'super-admin' || profileUser === 'admin'
        ? resource.profile
        : undefined,
    isDeleted: profileUser === 'super-admin' ? resource.isDeleted : undefined,
    createdAt: profileUser === 'super-admin' ? resource.createdAt : undefined,
    links: [{ rel: 'self', href: `${ENDPOINT}/${resource._id}` }]
  }
}

/**
 * Heatoas Multiple - Users
 * @param {object} results
 * @param {string} profileUser
 * @returns
 */
function multiple(results, profileUser) {
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
    users: docs.map(resource => single(resource, profileUser))
  }
}

export { single, multiple }
