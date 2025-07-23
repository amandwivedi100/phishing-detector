import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { classifyEmailWithAI } from "../service/ai.service.js";
import { fetchEmailsFromGmail } from "../service/gmail.service.js";
import axios from "axios";

const scanEmailsController = asyncHandler(async (req, res) => {
  const { accessToken, topN } = req.body;

  if (!accessToken || topN) {
    throw new ApiError(400, "accessToken and topN are required.");
  }

  const emails = await fetchEmailsFromGmail(accessToken, topN);

  const results = await Promise.all(
    emails.map((email) => classifyEmailWithAI(email))
  );

  return res
    .status(200)
    .json(new ApiResponse(200, results, "Email scan complete."));
});

const sendEmailTest = asyncHandler(async (req, res) => {
  const { email, emails } = req.body;

  let payload;
  if (email) {
    payload = email;
  } else if (Array.isArray(emails)) {
    payload = emails;
  } else {
    throw new ApiError(
      400,
      "Missing 'email', or 'emails', field in request body"
    );
  }

  const response = await classifyEmailWithAI(payload);

  res
    .status(200)
    .json(new ApiResponse(200, response, "it worked on my mac!!!!!!!"));
});

export { sendEmailTest };
