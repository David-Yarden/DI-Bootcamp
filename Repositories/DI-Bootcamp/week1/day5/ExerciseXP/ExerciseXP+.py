# -----------------
# Exercise 1
# -----------------
student_grades = {
    "Alice": [88, 92, 100],
    "Bob": [75, 78, 80],
    "Charlie": [92, 90, 85],
    "Dana": [83, 88, 92],
    "Eli": [78, 80, 72]
}

class_averages = []  # Keep all student averages

for name, grades in student_grades.items():
    average = sum(grades) / len(grades)
    class_averages.append(average)  # Store for class average later

    if average >= 90:
        grade = "A"
    elif 80 <= average <= 89:
        grade = "B"
    elif 70 <= average <= 79:
        grade = "C"
    elif 60 <= average <= 69:
        grade = "D"
    else:
        grade = "F"

    print(f"{name}'s average grade is {average:.2f}, which is a {grade} grade.")

# Compute overall class average
overall_class_average = sum(class_averages) / len(class_averages)
print(f"\nThe class average grade is {overall_class_average:.2f}")
# -----------------
# Exercise 2
# -----------------
sales_data = [
    {"customer_id": 1, "product": "Smartphone", "price": 600, "quantity": 1, "date": "2023-04-03"},
    {"customer_id": 2, "product": "Laptop", "price": 1200, "quantity": 1, "date": "2023-04-04"},
    {"customer_id": 1, "product": "Laptop", "price": 1000, "quantity": 1, "date": "2023-04-05"},
    {"customer_id": 2, "product": "Smartphone", "price": 500, "quantity": 2, "date": "2023-04-06"},
    {"customer_id": 3, "product": "Headphones", "price": 150, "quantity": 4, "date": "2023-04-07"},
    {"customer_id": 3, "product": "Smartphone", "price": 550, "quantity": 1, "date": "2023-04-08"},
    {"customer_id": 1, "product": "Headphones", "price": 100, "quantity": 2, "date": "2023-04-09"},
]