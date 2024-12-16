import base64
import importlib
import os
import pandas as pd
import pickle
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score
from flask import jsonify, Flask, request
import numpy as np
import matplotlib
matplotlib.use('Agg')

import matplotlib.pyplot as plt
import seaborn as sns
import google.generativeai as genai

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = './uploads'
app.config['DATA_FOLDER'] = './data'
app.config['MODEL_FOLDER'] = './models'

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['DATA_FOLDER'], exist_ok=True)
os.makedirs(app.config['MODEL_FOLDER'], exist_ok=True)

@app.route('/')
def home():
    return "Hello, DataForce it is!"

@app.route('/train-model', methods=['POST'])
def model_upload():
    data = request.get_json()
    fname = data.get('fname')
    fdata = data.get('fdata')
    dname = data.get('dname')
    ddata = data.get('ddata')

    if not fname or not fdata:
        return jsonify({'error': 'model file name or data is missing,try re-uploading the model'}), 400

    if not dname or not ddata:
        return jsonify({'error': 'dataset file name or data is missing,try re-uploading the dataset'}), 400

    fbin = base64.b64decode(fdata)
    fpath = os.path.join(app.config['UPLOAD_FOLDER'], fname)
    with open(fpath, 'wb') as f:
        f.write(fbin)

    dbin = base64.b64decode(ddata)
    dpath = os.path.join(app.config['DATA_FOLDER'], dname)
    with open(dpath, 'wb') as f:
        f.write(dbin)

    return train_model(fpath, dpath)


def train_model(mpath, dpath):
    # mname = request.json.get('model_file')
    # dname = request.json.get('dataset_name')

    if not mpath or not dpath:
        return jsonify({'error': 'Error fetching model or dataset'}), 400

    # mpath = os.path.join(app.config['UPLOAD_FOLDER'], mname)
    # dpath = os.path.join(app.config['DATA_FOLDER'], dname)

    if not os.path.exists(mpath):
        return jsonify({'error': f'Model named {mpath} not found'}), 404

    if not os.path.exists(dpath):
        return jsonify({'error': f'Dataset named {dpath} not found'}), 404

    dataset = pd.read_csv(dpath)

    model = load_model_from_py(mpath)

    trained_model, predictions, actual_labels = model.train_model(dataset)

    trained_model_path = os.path.join(app.config['MODEL_FOLDER'], 'trained_model.pkl')
    with open(trained_model_path, 'wb') as f:
        pickle.dump(trained_model, f)

    with open(trained_model_path, 'rb') as f:
        modelbin = f.read()

    accuracy = accuracy_score(actual_labels, predictions)
    precision = precision_score(actual_labels, predictions, average='macro')
    recall = recall_score(actual_labels, predictions, average='macro')

    cm = confusion_matrix(actual_labels, predictions)

    metrics = {
        'accuracy': accuracy,
        'precision': precision,
        'recall': recall
    }


    plot_confusion_matrix(cm)
    plot_metrics(metrics)

    with open('confusion_matrix.png', 'rb') as f:
        cmbin = f.read()

    with open('metrics.png', 'rb') as f:
        mbin = f.read()

    modelb64 = base64.b64encode(modelbin).decode('utf-8')
    cmb64 = base64.b64encode(cmbin).decode('utf-8')
    mb64 = base64.b64encode(mbin).decode('utf-8')


    os.remove(trained_model_path)
    os.remove(dpath)
    os.remove(mpath)
    # os.remove('confusion_matrix.png')
    # os.remove('metrics.png')
    return jsonify({'message': 'Model has been trained successfully', 'model': modelb64 ,'cm':cmb64,'mg':mb64}), 200

@app.route('/model-imp', methods=['POST'])
def model_imp():
    data = request.get_json()
    dname = data.get('dname')
    ddata = data.get('ddata')

    dbin = base64.b64decode(ddata)
    dpath = os.path.join(app.config['DATA_FOLDER'], dname)
    with open(dpath, 'wb') as f:
        f.write(dbin)

    dataset = pd.read_csv(dpath)

    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(f"recommend ml model structure usage in maximum 50 words for this type of data {dataset.head()}")
    print(response.text)
    return response.text
def plot_confusion_matrix(cm):
    plt.figure(figsize=(10, 7))

    sns.heatmap(cm, annot=True, fmt='d', cmap='coolwarm', cbar=True,
                linewidths=1, linecolor='black', annot_kws={"size": 14, "weight": 'bold'},
                square=True)

    plt.title('Confusion Matrix', fontsize=18, fontweight='bold')
    plt.xlabel('Predicted Labels', fontsize=14, labelpad=10)
    plt.ylabel('Actual Labels', fontsize=14, labelpad=10)

    plt.xticks(fontsize=12)
    plt.yticks(fontsize=12)

    plt.savefig('confusion_matrix.png', dpi=300, bbox_inches='tight')
    plt.close()


def plot_metrics(metrics):
    labels = list(metrics.keys())
    values = list(metrics.values())

    plt.figure(figsize=(10, 6))

    colors = sns.color_palette("coolwarm", len(metrics))
    bars = plt.bar(labels, values, color=colors, edgecolor='black', linewidth=1.5)

    for bar in bars:
        yval = bar.get_height()
        plt.text(bar.get_x() + bar.get_width() / 2, yval + 0.02, round(yval, 2),
                 ha='center', va='bottom', fontsize=12, fontweight='bold')

    plt.title('Model Performance Metrics', fontsize=16, fontweight='bold')
    plt.xlabel('Metrics', fontsize=14)
    plt.ylabel('Score', fontsize=14)
    plt.ylim(0, 1.1)

    sns.despine()
    plt.grid(axis='y', linestyle='--', alpha=0.7)

    plt.savefig('metrics.png')
    plt.close()



def load_model_from_py(filepath):
    spec = importlib.util.spec_from_file_location('custom_model', filepath)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

if __name__ == '__main__':
    app.run(port=5001, debug=True)

