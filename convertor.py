import csv
import json

# Description: Python script to convert Goodreads CSV export to JSON containing only "to-read" books
# License: MIT License

# Function to convert CSV to JSON
def csv_to_json(csv_file_path, json_file_path):
    books = []
    with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            if row['Bookshelves'] == 'to-read':
                title = row['Title']
                pages = row['Number of Pages'] if 'Number of Pages' in row else 'N/A'
                books.append({'title': title, 'pages': pages})

    with open(json_file_path, 'w', encoding='utf-8') as jsonfile:
        json.dump(books, jsonfile, ensure_ascii=False, indent=4)

# Replace with the path to your exported CSV file and desired JSON file path
csv_file_path = './goodreads_library_export.csv'
json_file_path = 'books.json'
# Convert CSV to JSON
csv_to_json(csv_file_path, json_file_path)
