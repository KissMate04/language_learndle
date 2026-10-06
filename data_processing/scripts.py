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

def json_builder(valid, target, valid_json_path, target_json_path, dict_path):
    # Working with the sets is faster. Maybe
    valid_wanted = set(valid.values())
    target_wanted = set(target.values())
    valid_data = {}
    target_data = {}
    useful_pos = ["noun", "verb", "adj", "adv"]

    with open(dict_path, encoding="utf-8") as f:
        for line in f:
            entry = json.loads(line)
            if entry["pos"] not in useful_pos:
                continue

            definitions = entry.get("senses", [{}])[0].get("glosses")

            # Valid check
            if entry["word"] in valid_wanted:
                entry_data = valid_data.setdefault(entry["word"], {"lemma": entry["word"], "pos": {}})
                entry_data["pos"].setdefault(entry["pos"], definitions)

            # Target check
            if entry["word"] in target_wanted:
                entry_data = target_data.setdefault(entry["word"], {"lemma": entry["word"], "pos": {}})
                entry_data["pos"].setdefault(entry["pos"], definitions)

    valid_json= {"words": valid, "entries": valid_data}
    target_json= {"words": target, "entries": target_data}
    json_data = json.dumps(valid_json)
    with open(valid_json_path, "w", encoding="utf-8") as outfile:
        outfile.write(json_data)
    json_data = json.dumps(target_json)
    with open(target_json_path, "w", encoding="utf-8") as outfile:
        outfile.write(json_data)


def main():
    language = input("Enter the language (en/it): ")
    if language == "en":
        most_common_path = 'data_processing/rawdata/english-most-common-words.csv'
        package_name = 'en_core_web_sm'
        target_json_path = "language_learndle/src/store/english_target.json"
        valid_json_path = "language_learndle/src/store/english_valid.json"
        dict_path = "data_processing/dictionaries/kaikki.org-dictionary-English-words.jsonl"
    elif language == "it":
        most_common_path = 'data_processing/rawdata/italian-most-common-words.csv'
        package_name = 'it_core_news_sm'
        target_json_path = "language_learndle/src/store/italian_target.json"
        valid_json_path = "language_learndle/src/store/italian_valid.json"
        dict_path = "coming soon"
    else:
        most_common_path = "Wrong language, I must crash"
        package_name = "You already crashed"
        target_json_path = "Why are you reading these?"
        valid_json_path = "Just go back and pick another language"
        dict_path = "No dictionary for you"

    valid_most_common = get_words_from_csv(most_common_path)
    print("Found ", len(valid_most_common), " valid words in the most common words list.")
    print("sample of valid words: ", valid_most_common[0:5])
    # valid list is ordered by most common.
    target_most_common = valid_most_common[0:1000]
    valid_lemma = lemmatize(valid_most_common, package_name)
    target_lemma = lemmatize(target_most_common, package_name)
    print("--- lemmatization complete ---")
    json_builder(valid_lemma, target_lemma, valid_json_path, target_json_path, dict_path)

if __name__ == "__main__":
    main()
