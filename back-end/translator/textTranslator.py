import googletrans
from googletrans import Translator
from test import info1, info2

translator = Translator()

# language = input("what language? (en/fr): ")
# text = input("What do you need translated: ")

#english to french
# if language == "en":
#     words = translator.translate(text, src="en", dest="fr")
#     print(type(words))

# print("French to english: ", translator.translate(info1[0], src= info1[1], dest= info1[2]).text)
# print("English to french: ", translator.translate(info2[0], src= info2[1], dest= info2[2]).text)
    

# function to translate
def myTranslator(text, sourceLanguage, targetLanguage):
    translatedText = translator.translate(text, src = sourceLanguage, dest = targetLanguage).text
    print(translatedText)

myTranslator("Hello, I am Claire Dubois, Software Engineer at ABC Tech. I hope we can work together effectively.", "en", "fr")



