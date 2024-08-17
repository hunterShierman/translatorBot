import os
from openai import OpenAI
import re


client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
)


#translator
def myTranslator(text, sourceLanguage, targetLanguage):

    system_message = f"You are a translation chatbot who speaks {sourceLanguage} and {targetLanguage}. Translate the sentence I give you into {targetLanguage}."

    chat_completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": system_message},
        {"role": "user", "content": text},
    ]
    )
    
    response = chat_completion.choices[0].message.content.strip()

    return response


# chat freely mode -----------------------------------------------------------------------------------------------------------------------------------

#english to french
def practice_french():

    keep_going = True
    print("Chatbot: Bienvenue sur TranslateHac - type quit, exit, or bye to leave")
    print("Chatbot: Quel est ton nom?")

    while keep_going is True:

        prompt = input("You: ")
        system_message = f"You are a translation chatbot who speaks french and english. only speak to me in french. You are a friendly assistant who provides concise responses. Please limit your responses to three sentences.",
        
        chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system", "content": system_message,
                "role": "user", "content": prompt,
            } 
        ],
        model="gpt-4o-mini",
        )

        if prompt.lower() in ["quit", "exit", "bye"]:
            print("Chat: Thanks for speaking with me. au revoir et bonne journée.")
            break 

        response = chat_completion.choices[0].message.content.strip()

        sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', response)

        # Check if there are more than three sentences
        if len(sentences) > 3:
            response = ' '.join(sentences[:3])


        return response
    

#french to english
def practice_english():

    keep_going = True
    print("Chatbot: Bienvenue sur TranslateHac - type quit, exit, or bye to leave")
    print("Chatbot: What is your name?")

    while keep_going is True:

        prompt = input("You: ")
        system_message = f"You are a translation chatbot who speaks french and english. only speak to me in english. You are a friendly assistant who provides concise responses. Please limit your responses to three sentences.",
        
        chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system", "content": system_message,
                "role": "user", "content": prompt,
            } 
        ],
        model="gpt-4o-mini",
        )

        if prompt.lower() in ["quit", "exit", "bye"]:
            print("Chat: merci d'avoir parlé avec moi, goodbye and have a good day.")
            break 

        response = chat_completion.choices[0].message.content.strip()

        sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s', response)

        # Check if there are more than three sentences
        if len(sentences) > 3:
            response = ' '.join(sentences[:3])

        return response
    

# testing
# myTranslator("I am 19 years old and I go to the university of waterloo", "english", "french")
# myTranslator("Je suis très heureux de vous rencontrer.", "french", "english")
# # practice_french()
# # practice_english()

    