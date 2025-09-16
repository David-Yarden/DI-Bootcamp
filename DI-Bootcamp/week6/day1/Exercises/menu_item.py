# menu_item.py
import psycopg2

class MenuItem:
    def __init__(self, name, price):
        self.name = name
        self.price = price
    
    def save(self):
        try:
            conn = psycopg2.connect(
                dbname="restaurant",
                user="postgres",
                password="admin",
                host="localhost",
                port="5432"
            )
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO Menu_Items (item_name, item_price) VALUES (%s, %s)",
                (self.name, self.price)
            )
            conn.commit()
            print(f"Item '{self.name}' saved successfully.")
        except Exception as e:
            print("Error saving item:", e)
        finally:
            cur.close()
            conn.close()

    def delete(self):
        try:
            conn = psycopg2.connect(
                dbname="restaurant",
                user="postgres",
                password="admin",
                host="localhost",
                port="5432"
            )
            cur = conn.cursor()
            cur.execute("DELETE FROM Menu_Items WHERE item_name = %s", (self.name,))
            conn.commit()
            if cur.rowcount > 0:
                print(f"Item '{self.name}' deleted successfully.")
            else:
                print(f"Item '{self.name}' not found.")
        except Exception as e:
            print("Error deleting item:", e)
        finally:
            cur.close()
            conn.close()

    def update(self, new_name, new_price):
        try:
            conn = psycopg2.connect(
                dbname="restaurant",
                user="postgres",
                password="admin",
                host="localhost",
                port="5432"
            )
            cur = conn.cursor()
            cur.execute(
                "UPDATE Menu_Items SET item_name = %s, item_price = %s WHERE item_name = %s",
                (new_name, new_price, self.name)
            )
            conn.commit()
            if cur.rowcount > 0:
                print(f"Item '{self.name}' updated to '{new_name}' successfully.")
                self.name, self.price = new_name, new_price
            else:
                print(f"Item '{self.name}' not found.")
        except Exception as e:
            print("Error updating item:", e)
        finally:
            cur.close()
            conn.close()
