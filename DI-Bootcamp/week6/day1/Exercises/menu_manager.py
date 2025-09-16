# menu_manager.py
import psycopg2
from menu_item import MenuItem

class MenuManager:
    @classmethod
    def get_by_name(cls, name):
        try:
            conn = psycopg2.connect(
                dbname="restaurant",
                user="postgres",
                password="admin",
                host="localhost",
                port="5432"
            )
            cur = conn.cursor()
            cur.execute("SELECT item_name, item_price FROM Menu_Items WHERE item_name = %s", (name,))
            row = cur.fetchone()
            if row:
                return MenuItem(row[0], row[1])
            return None
        except Exception as e:
            print("Error fetching item:", e)
            return None
        finally:
            cur.close()
            conn.close()

    @classmethod
    def all_items(cls):
        try:
            conn = psycopg2.connect(
                dbname="restaurant",
                user="postgres",
                password="admin",
                host="localhost",
                port="5432"
            )
            cur = conn.cursor()
            cur.execute("SELECT item_name, item_price FROM Menu_Items")
            rows = cur.fetchall()
            return [MenuItem(row[0], row[1]) for row in rows]
        except Exception as e:
            print("Error fetching items:", e)
            return []
        finally:
            cur.close()
            conn.close()
