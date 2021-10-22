import requests
import csv

# api-endpoint
URL = "http://localhost:8080/api/contacts"
# r = requests.post(url = URL, params = PARAMS)

file = open('MOCK_DATA.csv', 'r')

first_line = True

reader = csv.reader(file)

for line in reader:
    if first_line:
        first_line = False
        continue

    else:
        if line and line[0] and line[1] and line[2] and line[3]:
            contact = {
                'name': line[0],
                'email': line[1],
                'gender': line[2],
                'phone': line[3]
            }

            print(contact)

            URL = "http://localhost:8080/api/contacts"
            r = requests.post(url=URL, json=contact)
            print(r)
