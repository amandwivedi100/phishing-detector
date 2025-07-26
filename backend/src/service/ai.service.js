import axios from "axios";
import { ApiError } from "../utils/apiError.js";

async function classifyEmailWithAI(input) {
  try {
    const isArray = Array.isArray(input);

    const response = await axios.post(
      "http://localhost:5001/classify",
      isArray
        ? input
        : {
            subject: input.subject,
            // from: input.from,
            body: input.snippet,
          }
    );

    const responseData = response.data;

    if (isArray) {
      if (!Array.isArray(responseData)) {
        throw new ApiError(
          500,
          "Expected an array from AI but got something else"
        );
      }

      return input.map((email, index) => {
        const aiResult = responseData[index] || {};
        return {
          subject: email.subject,
          body: email.snippet,
          // from: email.from,
          status: aiResult.status || "unknown",
          confidence: aiResult.confidence ?? null,
          reason: aiResult.reason || ["No reason provided"],
        };
      });
    }
  } catch (error) {
    console.error("Ai classification error.", error);
    console.error("Message:", error.message);
    console.error("Response status:", error.response?.status);
    console.error("Response data:", error.response?.data);
    throw new ApiError(400, "Ai model classification failed");
  }
}

export { classifyEmailWithAI };
