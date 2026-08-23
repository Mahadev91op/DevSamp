import { NextResponse } from "next/server";

/**
 * Standard API Success Response
 * @param {any} data - Response payload
 * @param {object} meta - Optional pagination, telemetry, or query metadata
 * @param {number} status - HTTP status code (default 200)
 */
export function successResponse(data = {}, meta = {}, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
      meta,
    },
    { status }
  );
}

/**
 * Standard API Error Response
 * @param {string} code - Machine-readable error code (e.g. 'VALIDATION_ERROR', 'UNAUTHORIZED')
 * @param {string} message - User-friendly error message
 * @param {number} status - HTTP status code
 * @param {object} details - Additional error details or validation errors
 */
export function errorResponse(
  code = "INTERNAL_ERROR",
  message = "An unexpected error occurred.",
  status = 500,
  details = {}
) {
  const requestId = `req_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        details,
        requestId,
      },
    },
    { status }
  );
}

/**
 * ApiResponse class wrapper
 */
export class ApiResponse {
  static success(data = {}, message = "Success", meta = {}, status = 200) {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
        meta,
      },
      { status }
    );
  }

  static internalError(message = "An unexpected error occurred.", details = {}) {
    return errorResponse("INTERNAL_ERROR", message, 500, details);
  }

  static notFound(message = "Resource not found.") {
    return errorResponse("NOT_FOUND", message, 404);
  }

  static badRequest(message = "Bad request.", details = {}) {
    return errorResponse("BAD_REQUEST", message, 400, details);
  }
}
