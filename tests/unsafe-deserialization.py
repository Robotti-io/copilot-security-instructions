# Dangerous: loading raw JSON into Python objects
import json

def load_user(data):
    return json.loads(data)  # unvalidated input

# Worse: pickled input from untrusted source
import pickle

def restore_object(payload):
    return pickle.loads(payload)  # arbitrary code exec risk
