from flask import Flask, request, jsonify
import pdfplumber
import re
from transformers import pipeline

app = Flask(__name__)

# Initialize the Question-Answering model
qa_model = pipeline('question-answering', model='deepset/roberta-base-squad2')

# Step 1: Extract Text from PDF (Max 5 Pages)
def extract_text_from_pdf_with_plumber(pdf_file, max_pages=5):
    extracted_text = ""
    
    with pdfplumber.open(pdf_file) as pdf:
        for page_num in range(min(len(pdf.pages), max_pages)):
            page = pdf.pages[page_num]
            extracted_text += page.extract_text() + "\n"
    return extracted_text

# Step 2: Clean the Extracted Text
def clean_extracted_text(text):
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\x00-\x7F]+', '', text)
    text = re.sub(r'\n+', ' ', text)
    return text.strip()

# Step 3: Function to run question answering
def ask_question(context, question):
    result = qa_model(question=question, context=context)
    return result['answer']

@app.route('/extract', methods=['POST'])
def extract_and_answer():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request.'}), 400
    
    pdf_file = request.files['file']
    if pdf_file.filename == '':
        return jsonify({'error': 'No selected file.'}), 400

    # Validate the file type
    if not pdf_file.filename.endswith('.pdf'):
        return jsonify({'error': 'Invalid file type. Please upload a PDF file.'}), 400

    if pdf_file.content_type != 'application/pdf':
        return jsonify({'error': 'Invalid file type. Please upload a PDF file.'}), 400

    # Save the uploaded file
    pdf_path = f'temp/{pdf_file.filename}'
    
    try:
        pdf_file.save(pdf_path)
        print("File saved at:", pdf_path)
    except Exception as e:
        return jsonify({'error': f'Error saving file: {str(e)}'}), 500

    # Extract and clean text from the PDF
    extracted_text = extract_text_from_pdf_with_plumber(pdf_path)
    if not extracted_text.strip():
        return jsonify({'error': 'No text extracted from the PDF.'}), 400

    cleaned_text = clean_extracted_text(extracted_text)

    # Ask questions based on the extracted text
    name = ask_question(cleaned_text, "What is my name?")
    dob = ask_question(cleaned_text, "What is my Date of Birth?")
    
    return jsonify({
        'cleaned_text': cleaned_text,
        'name': name,
        'dob': dob,
    })

if __name__ == '__main__':
    app.run(debug=True,port=5001)
