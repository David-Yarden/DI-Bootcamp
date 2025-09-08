import json

sampleJson = '''
{
  "company": {
    "employee": {
      "name": "John",
      "payable": {
        "salary": 7000,
        "bonus": 800
      }
    }
  }
}
'''

data = json.loads(sampleJson)

salary = data["company"]["employee"]["payable"]["salary"]
print("Salary:", salary)

data["company"]["employee"]["birth_date"] = "1990-05-15"  # Example date

with open("modified_company.json", "w") as f:
    json.dump(data, f, indent=4)
