import numpy as np

from sentence_transformers import SentenceTransformer, util

DESIGN = {
    0: ('check_fraud', 'check payment for fraud'),
    1: ('check_fraud', 'check this invoice'),
    2: ('credit_score', 'what is my credit score'),
    3: ('help', 'help'),
    4: ('end_process', 'exit the current process')
}

class JaxChat:
    def __init__(self):
        self.model = self._load_model()
        self.embeddings = self._generate_embeddings()

    def _load_model(self):
        return SentenceTransformer('all-mpnet-base-v2')

    def _generate_embeddings(self):
        # Load all descriptions of applicational functions
        functions = [func[0] for _, func in DESIGN.items()]

        # Embed these functions
        embeddings = self.model.encode(functions)

        # Normalize the embeddings
        normalized = embeddings / np.linalg.norm(embeddings, axis=1, keepdims=True)

        return normalized
     
    
    def _search_embeddings(self, query):
        # Generate embedding
        query_embedding = self.model.encode([query])

        # Normalize the embedding
        normalized_query = query_embedding / np.linalg.norm(query_embedding, axis=1, keepdims=True)

        # Cosine similarity scores
        cosine_scores = util.pytorch_cos_sim(normalized_query, self.embeddings)

        # Top 3 results
        return np.argmax(cosine_scores).item()


    def query(self, query):
        index = self._search_embeddings(query)
        result = DESIGN[index][0]
        print(result)
        return result
