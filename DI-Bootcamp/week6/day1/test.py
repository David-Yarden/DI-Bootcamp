import psycopg2

try:
    conn = psycopg2.connect(
        database="countries",
        user="postgres",
        password="admin",   # ⚠️ mets bien ton vrai mot de passe
        host="localhost",
        port="5432"
    )
    print("Connexion réussie ✅")
except Exception as e:
    print("Erreur ❌:", e)
finally:
    if 'conn' in locals():
        conn.close()
