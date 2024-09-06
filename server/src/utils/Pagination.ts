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

const getOrderFilterOptions = (req: Request): Record<string, any> => {
  const filter: Record<string, any> = {};

  if (req.query.paymentState) {
    filter.paymentState = req.query.paymentState;
  }

  if (req.query.orderState) {
    filter.orderState = req.query.orderState;
  }

  if (req.query.start_date && req.query.end_date) {
    filter.createdAt = {
      $gte: new Date(req.query.start_date as string),
      $lte: new Date(req.query.end_date as string)
    };
  }

  for (const key in req.query) {
    if (req.query[key] === 'null') {
      filter[key] = null;
    }
  }

  console.log(filter);

  return filter;
};

export { getPaginationOptions, getFilterOptions, getOrderFilterOptions };
