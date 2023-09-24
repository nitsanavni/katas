#!/usr/bin/env python3

import requests
import json
import argparse
import os

API_URL = "https://api.openai.com/v1/chat/completions"
GPT_4_MODEL = "gpt-4"
GPT_3_5_TURBO_MODEL = "gpt-3.5-turbo"


def chat(user_message: str, model=GPT_4_MODEL) -> str:
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

    response = requests.post(API_URL, headers=headers,
                             data=json.dumps(payload))
    content = response.json().get('choices', [{}])[
        0].get('message', {}).get('content', '')

    return content


def get_args():
    parser = argparse.ArgumentParser(description='OpenAI API script.')
    parser.add_argument('-3', dest='use_gpt3',
                        action='store_true', help='Use GPT-3.5 Turbo model')
    parser.add_argument('message', nargs='+', help='User message')
    args = parser.parse_args()

    return args.use_gpt3, " ".join(args.message)


if __name__ == "__main__":
    use_gpt3, user_message = get_args()

    model = GPT_3_5_TURBO_MODEL if use_gpt3 else GPT_4_MODEL

    print(chat(user_message, model))
