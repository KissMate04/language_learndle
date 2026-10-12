The game has two lists. 
The first list is all valid words that the user can input and their definitions.
The second list is all the words that can be chosen as the target (word to be guessed). 
The targets are from the most common words of a language. 
For this I'm used LangX's most common words lists as my starting point. 
The most common English words list are included in the repo as a reference to the format (english-most-common-words.csv)

From this list I excluded all words that are less than 3 letters long and words that have apostrophes or dashes in them. 

The remaining words are lemmatized using SpaCy. 

To create the valid words list I used kaikki.org's English dictionary. 

A word can belong in multiple grammatical categories and have multiple definitions. Displaying all would be inconvenient to fit on the screen, therefore I'm limiting my selection to the first definition of the following grammar categories: Noun, Verb, Adjective, Adverb.


To recreate my data, you can download the lists from https://langx.io/tools/most-common-words.
and the dictionaries from https://kaikki.org/dictionary/rawdata.html
