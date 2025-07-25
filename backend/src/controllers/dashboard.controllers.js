import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { classifyEmailWithAI } from "../service/ai.service.js";

const scanEmailsController = asyncHandler(async (req, res) => {
  const { payload } = req.body;

  if (!payload) {
    throw new ApiError(400, "Missing payload");
  }

  const response = await classifyEmailWithAI(payload);

  res
    .status(200)
    .json(new ApiResponse(200, response, "Scanned emails successfully."));
});

export { scanEmailsController };
