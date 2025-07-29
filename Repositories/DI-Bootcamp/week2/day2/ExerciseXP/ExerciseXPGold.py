def get_age(year, month, day):
    CURRENT_YEAR, CURRENT_MONTH = 2025, 7
    age = CURRENT_YEAR - year - (month > CURRENT_MONTH)
    return age

def can_retire(gender, dob):
    year, month, _ = map(int, dob.split('/'))
    age = get_age(year, month, 1)

    retire_age = 67
    if gender == 'f' and (year > 1947 or (year == 1947 and month > 4)):
        retire_age = 62

    return age >= retire_age

gender = input("Enter your gender (m/f): ").lower()
dob = input("Enter your date of birth (yyyy/mm/dd): ")

print("You can retire." if can_retire(gender, dob) else "You cannot retire yet.")
