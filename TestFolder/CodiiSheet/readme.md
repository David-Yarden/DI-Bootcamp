# Application de gestion des revenus – Professeur Scratch

## Objectif
Créer une application permettant de gérer les revenus d’une activité professionnelle de professeur Scratch dans une entreprise.

L’application doit être entièrement configurable : aucun tarif, catégorie ou valeur ne doit être hardcodé.

## Fonctionnalités principales

### 1. Catégories de cours
- Ajouter, modifier, renommer et supprimer des catégories
- Chaque catégorie possède :
  - un nom
  - un taux horaire
  - un mode de calcul :
    - horaire (heures × taux)
    - forfaitaire (montant fixe)

Exemples de catégories :
- A4
- A8
- Cours d’essai
- Réunion
- Projet
- Bonus

### 2. Saisie des heures / montants
- Associer une entrée à :
  - une catégorie
  - un mois (ex : Janvier 2026)
  - un nombre d’heures OU un montant fixe
- Ajouter un commentaire optionnel

### 3. Calculs automatiques
- Calcul automatique des revenus par :
  - catégorie
  - mois
- Calcul du total :
  - heures totales
  - montant total en shekels
- Les calculs doivent s’adapter dynamiquement aux changements de tarifs ou d’heures

### 4. Organisation par mois
- Chaque mois possède ses propres entrées
- Possibilité de consulter l’historique
- Aucune donnée ne doit être perdue entre les sessions

### 5. Contraintes techniques
- Aucune valeur ne doit être hardcodée
- Toute la logique doit être centralisée et testable
- Structure de code claire et maintenable

## Stack technique souhaitée
- TypeScript
- React
- Vite
- Stockage local (LocalStorage ou IndexedDB)
- Architecture modulaire

## Résultat attendu
Une application simple, fiable et évolutive permettant de tenir une comptabilité mensuelle claire, adaptée à une activité d’enseignement avec différents types de cours et de rémunérations.
