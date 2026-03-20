/**
 * Standard API response helpers
 */

exports.successResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({ success: true, data });
};

exports.errorResponse = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({ success: false, message });
};

exports.paginatedResponse = (res, data, total, page, limit, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  });
};
