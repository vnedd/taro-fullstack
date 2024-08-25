import { Request } from 'express';
import { PaginateOptions } from 'mongoose';

interface QueryParams {
  _page?: string;
  _limit?: string;
  _order?: 'asc' | 'desc';
  _sort?: string;
  _pagination?: string;
  [key: string]: any;
}

const getPaginationOptions = (req: Request): PaginateOptions => {
  const {
    _page = '1',
    _limit = '5',
    _order = 'asc',
    _sort = 'createdAt',
    _pagination = 'true'
  } = req.query as QueryParams;

  const options: PaginateOptions = {
    page: parseInt(_page, 10),
    limit: parseInt(_limit, 10),
    sort: {
      [_sort]: _order === 'desc' ? 1 : -1
    },
    pagination: _pagination !== 'false',
    customLabels: {
      pagingCounter: false,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: false,
      nextPage: false
    }
  };

  return options;
};

const getFilterOptions = (req: Request, filterFields: string[] = []): Record<string, any> => {
  const filter: Record<string, any> = {};

  filterFields.forEach((field) => {
    if (req.query[field]) {
      if (field === 'name') {
        filter[field] = { $regex: `.*${req.query[field]}.*`, $options: 'i' };
      } else if (req.query[field] === 'null') {
        filter[field] = null;
      } else {
        filter[field] = req.query[field];
      }
    }
  });

  return filter;
};

export { getPaginationOptions, getFilterOptions };
