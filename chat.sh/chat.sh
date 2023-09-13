#!/bin/bash

MODEL="gpt-4"
API_URL="https://api.openai.com/v1/chat/completions"

USER_MESSAGE="$*"

JSON_SAFE_MESSAGE=$(echo -n "$USER_MESSAGE" | sed ':a;N;$!ba;s/\n/\\n/g' | sed 's/"/\\"/g')

read -r -d '' PAYLOAD <<- EOM
{
   "model": "$MODEL",
   "messages": [
      {"role": "user", "content": "$JSON_SAFE_MESSAGE"}
   ]
}
EOM

RESPONSE=$(curl -s "$API_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  --data "$PAYLOAD")

echo "$RESPONSE" | jq -r '.choices[0].message.content'
