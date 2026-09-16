import csv
import spacy
import en_core_web_sm
import it_core_news_sm


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
        doc = nlp(word)
        lemmatized_words[word] = doc[0].lemma_
    # Correcting known lemmatization errors

    return lemmatized_words

def main():
    wordlist = lemmatize(get_words_from_csv('data_processing/rawdata/english-most-common-words.csv'), 'en_core_web_sm')
    print(wordlist)

if __name__ == "__main__":
    main()