import {Request, Response} from 'express'
import {ParamsDictionary, Query} from 'express-serve-static-core'
import searchService from '~/services/search.service'

interface SearchQuery extends Query {
  category?: string
  limit?: string
  search_key?: string
}

export const searchController = async (req: Request<ParamsDictionary, any, any, SearchQuery>, res: Response) => {
  const limit = Number(req.query.limit)
  const {category, search_key} = req.query
  const result = await searchService.search({limit, search_key, category})
  return res.json({
    message: 'Search successfully',
    data: result
  })
}
