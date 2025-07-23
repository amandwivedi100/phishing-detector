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
            from: input.from,
            body: input.body,
          }
    );

    const responseData = response.data;

    if (isArray) {
      return input.map((email, index) => ({
        subject: email.subject,
        from: email.from,
        ...responseData[index],
      }));
    } else {
      const { status, confidence, reason } = responseData;
      return {
        subject: input.subject,
        from: input.from,
        status,
        confidence,
        reason,
      };
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
