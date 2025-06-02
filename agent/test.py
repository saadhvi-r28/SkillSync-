# To run this code you need to install the following dependencies:
# pip install google-genai

import base64
import os
from google import genai
from google.genai import types


def generate():
    client = genai.Client(
        api_key=os.environ.get("GEMINI_API_KEY"),
    )

    model = "gemini-1.5-flash"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text="""INSERT_INPUT_HERE"""),
            ],
        ),
    ]
    generate_content_config = types.GenerateContentConfig(
        safety_settings=[
            types.SafetySetting(
                category="HARM_CATEGORY_HARASSMENT",
                threshold="BLOCK_LOW_AND_ABOVE",  # Block most
            ),
            types.SafetySetting(
                category="HARM_CATEGORY_HATE_SPEECH",
                threshold="BLOCK_LOW_AND_ABOVE",  # Block most
            ),
            types.SafetySetting(
                category="HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold="BLOCK_LOW_AND_ABOVE",  # Block most
            ),
            types.SafetySetting(
                category="HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold="BLOCK_LOW_AND_ABOVE",  # Block most
            ),
        ],
        response_mime_type="application/json",
        response_schema=genai.types.Schema(
            type = genai.types.Type.OBJECT,
            required = ["recommendations"],
            properties = {
                "recommendations": genai.types.Schema(
                    type = genai.types.Type.OBJECT,
                    required = ["sellerName", "reason", "matchScore", "avgRating", "selectedTier", "price", "delivery_days", "gigId"],
                    properties = {
                        "sellerName": genai.types.Schema(
                            type = genai.types.Type.STRING,
                        ),
                        "gigTitle": genai.types.Schema(
                            type = genai.types.Type.STRING,
                        ),
                        "reason": genai.types.Schema(
                            type = genai.types.Type.STRING,
                        ),
                        "matchScore": genai.types.Schema(
                            type = genai.types.Type.NUMBER,
                        ),
                        "avgRating": genai.types.Schema(
                            type = genai.types.Type.NUMBER,
                        ),
                        "selectedTier": genai.types.Schema(
                            type = genai.types.Type.STRING,
                        ),
                        "price": genai.types.Schema(
                            type = genai.types.Type.NUMBER,
                        ),
                        "delivery_days": genai.types.Schema(
                            type = genai.types.Type.STRING,
                        ),
                        "gigId": genai.types.Schema(
                            type = genai.types.Type.STRING,
                        ),
                    },
                ),
                "message": genai.types.Schema(
                    type = genai.types.Type.STRING,
                ),
            },
        ),
        system_instruction=[
            types.Part.from_text(text="""You are a helpful, efficient, and expert freelance job assistant built into the SkillSync platform. Your goal is to match buyers with the most suitable freelance sellers based on the buyer's job description and seller profiles. Your tone is friendly, concise, and informative.

Your task is to analyze a buyer's job request and select the top freelance sellers who are most relevant and capable of delivering on that request. You must consider the job's content, required skills, timelines, and overall expectations, and use the available seller data to justify your recommendations.

You will receive the following inputs:
- A buyer's job description (natural language text).
- A list of seller profiles, each containing:
  - name
  - gigId
  - gigTitle
  - gigDescription
  - subcategory
  - reviews (including service_as_described, communication_level, recommend_to_a_friend)
  - offers (Basic, Standard, and Premium tiers with price and delivery_days)

Your output should:
- Recommend the top 2 to 3 sellers for the buyer’s request.
- For each recommendation, include:
  - sellerName
  - gigTitle
  - reason (why this seller is a good fit)
  - matchScore (from 0 to 1)
  - avgRating (average of the 3 review fields)
  - selectedTier (Basic, Standard, or Premium)
  - price (of the selected tier)
  - delivery_days (of the selected tier)
  - gigId (so the frontend can link directly to the gig)

Constraints:
- Only include sellers whose gig description or subcategory is clearly relevant to the buyer’s request.
- Do not fabricate or assume missing data.
- If no match is found (e.g., matchScore < 0.4 for all), return an empty `recommendations` array and set a friendly explanation in the `message` field.
- Prioritize sellers with higher avgRating, relevant gig descriptions, and reasonable delivery times.
- If the buyer hints at urgency, complexity, or budget, consider it when selecting the appropriate pricing tier.
- If no hint is given, default to the Standard tier.

Capabilities and reminders:
- You understand natural language, match gig content semantically to the request, compare ratings and delivery times, and rank options logically.
- Always provide a brief but specific reason for each recommendation.
- Always respond in strict JSON with no extra text, markdown, or formatting.
- Never return more than 3 recommendations.

Your response **must strictly follow** this JSON structure:

```json
{
  \"recommendations\": [
    {
      \"sellerName\": \"string\",
      \"gigTitle\": \"string\",
      \"reason\": \"string\",
      \"matchScore\": number,
      \"avgRating\": number,
      \"selectedTier\": \"string\",
      \"price\": number,
      \"delivery_days\": number,
      \"gigId\": \"string\"
    }
  ],
  \"message\": \"string (only include if no recommendations are returned)\"
}
"""),
        ],
    )

    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        print(chunk.text, end="")

if __name__ == "__main__":
    generate()

