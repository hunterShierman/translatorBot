from translate import Translator

languages = ["fr", "es", "it", "ru"]

text = input("Please enter words to be translated >> ")

for language in languages:
    translator = Translator(provider='mymemory', from_lang='eng', to_lang=language)
    translation = translator.translate(text)
    print(f'{language}: {translation}')