import requests
import random
import psycopg2

def get_random_countries(n=10):
    # Fetch all countries from REST Countries API
    url = "https://restcountries.com/v3.1/all"
    response = requests.get(url)
    response.raise_for_status()
    countries = response.json()

    # Pick n random countries
    selected = random.sample(countries, n)

    # Extract only needed attributes
    country_data = []
    for c in selected:
        name = c.get("name", {}).get("common", "Unknown")
        capital = c.get("capital", ["Unknown"])[0] if "capital" in c else "Unknown"
        flag = c.get("flags", {}).get("png", "")
        subregion = c.get("subregion", "Unknown")
        population = c.get("population", 0)

        country_data.append((name, capital, flag, subregion, population))

    return country_data


def insert_countries_to_db(countries):
    try:
        conn = psycopg2.connect(
            dbname="world",
            user="postgres",
            password="your_password",
            host="localhost",
            port="5432"
        )
        cur = conn.cursor()

        query = """
        INSERT INTO countries (name, capital, flag, subregion, population)
        VALUES (%s, %s, %s, %s, %s)
        """
        cur.executemany(query, countries)
        conn.commit()
        print(f"{len(countries)} countries inserted successfully.")

    except Exception as e:
        print("Database error:", e)
    finally:
        cur.close()
        conn.close()


if __name__ == "__main__":
    countries = get_random_countries(10)
    insert_countries_to_db(countries)
