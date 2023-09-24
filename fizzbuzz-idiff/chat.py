#!/usr/bin/env python3

import requests
import json
import argparse
import os

# Constants
API_URL = "https://api.openai.com/v1/chat/completions"
GPT_4_MODEL = "gpt-4"
GPT_3_5_TURBO_MODEL = "gpt-3.5-turbo"

def get_response(model, user_message):
    payload = {
        "model": model,
        "messages": [
            {"role": "user", "content": user_message}
        ]
    }

    api_key = os.environ.get('OPENAI_API_KEY')
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable is not set.")

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    response = requests.post(API_URL, headers=headers, data=json.dumps(payload))
    return response.json()

def get_args():
    parser = argparse.ArgumentParser(description='OpenAI API script.')
    parser.add_argument('-3', dest='use_gpt3', action='store_true', help='Use GPT-3.5 Turbo model')
    parser.add_argument('message', nargs='+', help='User message')
    args = parser.parse_args()    


    return args.use_gpt3, " ".join(args.message)
    
if __name__ == "__main__":
    use_gpt3, user_message = get_args()

    model = GPT_3_5_TURBO_MODEL if use_gpt3 else GPT_4_MODEL

    response = get_response(model, user_message)

    print(response.get('choices', [{}])[0].get('message', {}).get('content', ''))
