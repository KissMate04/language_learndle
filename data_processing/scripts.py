import csv
import json

import spacy
import en_core_web_sm
import it_core_news_sm

#kaikki.org-dictionary-English-words.jsonl
def get_words_from_csv(file_path):
    """
    Get all words that are at least 3 charaters long and don't contain apostrophes.
    :param file_path: rawdata/[language]-most-common-words.csv
    :return: A list of valid words in frequency order
    """
    words = []
    with open(file_path, 'r') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)
        for row in reader:
            if len(row[1]) >= 3 and "'" not in row[1] and "-" not in row[1]:
                    words.append(row[1])
    print("Total number of words: ",len(words))
    return words

def lemmatize(wordlist, package):
    """
    Lemmatize a list of words using spacy.
    :param wordlist: A list of words to lemmatize
    :param package: The spacy package to use for lemmatization (e.g. en_core_web_sm, it_core_news_sm)
    :return: A list of lemmatized words
    """
    nlp = spacy.load(package)
    lemmatized_words = {}
    for word in wordlist:
        # Proper nouns don't need lemma
        if not word[0].isupper():
            doc = nlp(word)
            lemmatized_words[word] = doc[0].lemma_
    return lemmatized_words

def dict_test(wordlist):
    wanted = set(wordlist.values())
    data = {}
    print("Total number of words to look for: ", len(wanted))
    """
    print("\nWORD:", entry["word"])
                print("POS:", entry.get("pos"))

                for sense in entry.get("senses", []):
                    print("DEFINITION:", sense.get("glosses", []))
    """

    with open("data_processing/dictionaries/kaikki.org-dictionary-English-words.jsonl", encoding="utf-8") as f:
        for line in f:
            entry = json.loads(line)
            if entry["word"] in wanted:
                keys = [key for key, val in wordlist.items() if val == entry["word"]]
                definitions = entry.get("senses", [{}])[0].get("glosses")
                for key in keys:
                    entry_data = data.setdefault(key, {"lemma": entry["word"], "pos": {}})
                    entry_data["pos"].setdefault(entry["pos"], definitions)
                print(data[key])
    json_data = json.dumps(data)
    with open("data_processing/wordlists/english.json", "w", encoding="utf-8") as outfile:
        outfile.write(json_data)

def main():
    valid_words = get_words_from_csv('data_processing/rawdata/english-most-common-words.csv')
    target_words = valid_words[0:1000]
    print("target words: ", target_words[0:10])
    valid_lemma = lemmatize(valid_words, "en_core_web_sm")
    target_lemma = lemmatize(target_words, "en_core_web_sm")
    print("--------------------------------------------------")
    print("--------------------------------------------------")
    print("--------------------------------------------------")
    dict_test(target_lemma)

if __name__ == "__main__":
    main()