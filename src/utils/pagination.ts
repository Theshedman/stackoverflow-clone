import { QueryBuilder } from 'objection';
import { Pagination } from '../models';

export async function executePaginatedQuery(query: QueryBuilder<any>, label: string, pagination?: Pagination) {
  // Set default page and size should they are not provided.
  const DEFAULT_SIZE = 10;
  const DEFAULT_PAGE = 1;

  const size = pagination!.size || DEFAULT_SIZE;
  const page = pagination!.page || DEFAULT_PAGE;
  // @ts-ignore
  const rowcount = await query.resultSize();
  const page_count = Math.ceil(Number(rowcount) / size);
  const total = Number(rowcount);
  const result = await query
    .orderBy('updated_at', 'desc')
    .limit(size)
    .offset((page - 1) * size);

  if (!result.length) {
    return {
      [label]: result,
      pagination: {
        previous_page: page < 2 ? page : page - 1,
        current_page: page,
        next_page: size * page < total ? page + 1 : page,
        size: size,
        page_count: 0,
        total: 0
      }
    };
  }

  return {
    [label]: result,
    pagination: {
      previous_page: page < 2 ? page : page - 1,
      current_page: page,
      next_page: size * page < total ? page + 1 : page,
      size: size,
      page_count,
      total
    }
  };
}
