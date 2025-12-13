/**
 * Generic Pagination Utility for Sequelize
 * @param {Object} model - Sequelize model (e.g., User)
 * @param {Object} options - Query options like where, limit, offset, etc.
 * @param {Number} page - Current page number (default 1)
 * @param {Number} limit - Number of items per page (default 10)
 * @returns {Object} Paginated data { count, totalPages, currentPage, results }
 */
export const paginate = async (model, options = {}, page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;

    const { count, rows } = await model.findAndCountAll({
      ...options,
      limit,
      offset,
    });

    return {
      count: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      results: rows,
    };
  } catch (error) {
    console.error("❌ Pagination error:", error.message);
    throw new Error("Failed to fetch paginated data");
  }
};
