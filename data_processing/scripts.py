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

def get_definitions(lemmas, dict_path):
    """
    Get definitions for a list of lemmatized words from a dictionary file.
    :param lemmas: A list of lemmatized words
    :param dict_path: Path to the dictionary file (simple-extract.jsonl)
    :return: A dictionary of words and their definitions
    """
    lemmas_wanted = set(lemmas.values())
    valid_data = {}
    target = []
    useful_pos = ["noun", "verb", "adj", "adv"]

    with open(dict_path, encoding="utf-8") as f:
        for line in f:
            entry = json.loads(line)
            try:
                if entry["lang_code"] != "en":
                    continue
                if len(entry["word"]) < 3 or "'" in entry["word"] or "-" in entry["word"]:
                    continue

                if entry["pos"] not in useful_pos:
                    continue

                definitions = entry.get("senses", [{}])[0].get("glosses")

                # target check
                if entry["word"].lower() in lemmas_wanted:
                    target.append(entry["word"])
                # add to valid words
                entry_data = valid_data.setdefault(entry["word"].lower(), {"pos": {}})
                entry_data["pos"].setdefault(entry["pos"], definitions)

            except KeyError:
                continue

    return valid_data, target

def json_builder(valid, target, valid_json_path, target_json_path):
    valid_json= valid
    target_json= target
    json_data = json.dumps(valid_json)
    with open(valid_json_path, "w", encoding="utf-8") as outfile:
        outfile.write(json_data)
    json_data = json.dumps(target_json)
    with open(target_json_path, "w", encoding="utf-8") as outfile:
        outfile.write(json_data)


def main():
    language = input("Enter the language (en/it): ")
    if language != "en":
        print("Language not supported yet.")
        return
    most_common_path = 'data_processing/rawdata/english-most-common-words.csv'
    package_name = 'en_core_web_sm'
    target_json_path = "language_learndle/src/store/english_target.json"
    valid_json_path = "language_learndle/src/store/english_valid.json"
    dict_path = "data_processing/dictionaries/simple-extract.jsonl"

    most_common_words = get_words_from_csv(most_common_path)
    print("--- Number of accepted target words: ",len(most_common_words)," ---")
    lemmas = lemmatize(most_common_words, package_name)
    print("--- lemmatization complete. len: ", len(lemmas)," ---")
    json_builder(*get_definitions(lemmas, dict_path), valid_json_path, target_json_path)
    print("--- json files created ---")

if __name__ == "__main__":
    main()
