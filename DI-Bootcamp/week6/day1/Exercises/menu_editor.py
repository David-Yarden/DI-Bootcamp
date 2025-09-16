# menu_editor.py
from menu_item import MenuItem
from menu_manager import MenuManager

def show_user_menu():
    while True:
        print("\n--- Restaurant Menu Manager ---")
        print("View an Item (V)")
        print("Add an Item (A)")
        print("Delete an Item (D)")
        print("Update an Item (U)")
        print("Show the Menu (S)")
        print("Exit (E)")

        choice = input("Choose an option: ").strip().upper()

        if choice == "V":
            name = input("Enter item name to view: ")
            item = MenuManager.get_by_name(name)
            if item:
                print(f"Item found: {item.name} - {item.price}₪")
            else:
                print("Item not found.")
        elif choice == "A":
            add_item_to_menu()
        elif choice == "D":
            remove_item_from_menu()
        elif choice == "U":
            update_item_from_menu()
        elif choice == "S":
            show_restaurant_menu()
        elif choice == "E":
            print("\nFinal Menu:")
            show_restaurant_menu()
            print("Goodbye!")
            break
        else:
            print("Invalid choice, try again.")

def add_item_to_menu():
    name = input("Enter item name: ")
    price = int(input("Enter item price: "))
    item = MenuItem(name, price)
    item.save()

def remove_item_from_menu():
    name = input("Enter item name to delete: ")
    item = MenuItem(name, 0)
    item.delete()

def update_item_from_menu():
    name = input("Enter current item name: ")
    price = int(input("Enter current item price: "))
    item = MenuItem(name, price)
    new_name = input("Enter new name: ")
    new_price = int(input("Enter new price: "))
    item.update(new_name, new_price)

def show_restaurant_menu():
    items = MenuManager.all_items()
    print("\n--- Restaurant Menu ---")
    for item in items:
        print(f"{item.name} - {item.price}₪")
