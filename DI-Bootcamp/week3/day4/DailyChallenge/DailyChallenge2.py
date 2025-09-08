from googletrans import Translator

translator = Translator()
french_words= ["Bonjour", "Au revoir", "Bienvenue", "A bientôt"] 
result = translator.translate(french_words, dest='en')
translated_dict = {t.origin: t.text for t in result}
print(translated_dict)  
