import os
from openai import OpenAI

client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
)


# chat_completion = client.chat.completions.create(
#     messages=[
#         {
#             "role": "system", "content": "You are a translating chatbot. Respond to me in the language that I speak to you. You are extremly friendly and love to make new friends. If a user asks a question outside your expertise, politely inform them and suggest contacting the relevant department. Be empathetic and patient, especially with users who may be frustrated or confused. Limit your response to two sentences.",
#             "role": "user", "content": "Hello my name is Hunter, nice to meet you!",
#         } 
#     ],
#     model="gpt-4o-mini",
# )
# print(chat_completion.choices[0].message.content)

def chat_with_gpt(prompt):

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system", "content": "You are a translating chatbot. You are a friendly assistant who provides concise responses. Please limit your responses to three sentences. Respond to me in the language that I speak to you. You are very friendly and love to make new friends. Be empathetic and patient, especially with users who may be frustrated or confused.",
                "role": "user", "content": prompt,
            } 
        ],
        model="gpt-4o-mini",
    )
    return chat_completion.choices[0].message.content

keep_going = True

while keep_going is True:
    user_input = input("You: ")

    if user_input.lower() in ["quit", "exit", "bye"]:
        print("Chat: Thanks for speaking with me. Goodbye and have a good day.")
        break 

    response = chat_with_gpt(user_input)
    print("Chatbot: ", response)
    