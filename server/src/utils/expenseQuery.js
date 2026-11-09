function badRequest(message) {
  return Object.assign(new Error(message), {
    statusCode: 400,
    status: "fail",
  });
}

export function monthRange(month) {
  const validMonth =
    typeof month === "string" && /^[1-9]\d{3}-(0[1-9]|1[0-2])$/.test(month);
  if (!validMonth) {
    const error = new Error(
      "Month must be a valid YYYY-MM value (years 1000-9999)",
    );
    error.statusCode = 400;
    throw error;
  }
  const [year, number] = month.split("-").map(Number);

  return {
    $gte: new Date(Date.UTC(year, number - 1, 1)),
    $lt: new Date(Date.UTC(year, number, 1)),
  };
}

export function paginationParams(query) {
  function integer(value, fallback, maximum) {
    if (value === undefined) return fallback;

    if (
      typeof value !== "string" ||
      !/^[1-9]\d*$/.test(value) ||
      !Number.isSafeInteger(Number(value)) ||
      Number(value) > maximum
    ) {
      throw badRequest(
        "Page and limit must be positive integers. Limit cannot exceed 100",
      );
    }
    return Number(value);
  }
  const page = integer(query.page, 1, Number.MAX_SAFE_INTEGER);
  const limit = integer(query.limit, 100, 100);

  if (!Number.isSafeInteger((page - 1) * limit)) {
    throw badRequest("Page is too large!");
  }
  return { page, limit };
}
