let apiRoot = ''
if (process.env.BUILD_MODE === 'dev')
  apiRoot = 'http://localhost:8017'
else
  apiRoot = 'https://trello-api-yiqu.onrender.com'
export const API_ROOT = apiRoot

export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 12