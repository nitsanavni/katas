#!/bin/bash

# Configuration
API_URL="https://api.openai.com/v1/chat/completions"

# Collect user message from arguments
USER_MESSAGE="$*"
echo "USER_MESSAGE"
echo "$USER_MESSAGE"

# Convert actual newlines into JSON-safe format
JSON_SAFE_MESSAGE=$(echo -n "$USER_MESSAGE" | sed ':a;N;$!ba;s/\n/\\n/g')

echo "JSON_SAFE_MESSAGE"
echo "$JSON_SAFE_MESSAGE"

# Craft the JSON payload
read -r -d '' PAYLOAD <<- EOM
{
   "model": "gpt-4",
   "messages": [
      {"role": "user", "content": "$JSON_SAFE_MESSAGE"}
   ]
}
EOM

echo "PAYLOAD"
echo "$PAYLOAD"

# Make API request
RESPONSE=$(curl -s "$API_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  --data "$PAYLOAD")

# Extract the assistant's response
ASSISTANT_MESSAGE=$(echo "$RESPONSE" | jq -r '.choices[0].message.content')

# Print the assistant

echo $ASSISTANT_MESSAGE
