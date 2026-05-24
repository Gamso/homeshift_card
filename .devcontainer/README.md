# DevContainer Development Environment

Ce projet inclut une configuration DevContainer pour développer et tester une carte Home Assistant dans un environnement isolé.

## Prérequis

- Visual Studio Code
- Docker Desktop
- Extension VS Code: Dev Containers

## Démarrage rapide

1. Ouvrir le dossier dans VS Code
2. F1 → "Dev Containers: Reopen in Container"
3. Attendre l’initialisation de Home Assistant (1–2 min la première fois)
4. Construire la
   ```bash
   npm install
   npm run build
   ```
5. Accéder à Home Assistant: http://localhost:8123

## Ressource de la carte

La ressource est définie via YAML (`resource_mode: yaml` dans `configuration.yaml`) :

- URL: `/local/homeshift_card/homeshift-card.js`
- Type: Module

## Dashboard Lovelace

La configuration utilise un **dashboard YAML dédié** (`ui-lovelace.yaml`) tout en laissant le dashboard principal en mode `storage` :

| Dashboard              | Mode                      | Accès                        | Editeur graphique |
| ---------------------- | ------------------------- | ---------------------------- | ----------------- |
| **Overview** (sidebar) | YAML — `ui-lovelace.yaml` | icône dans la barre latérale | ❌                |
| **Accueil** (défaut)   | Storage                   | icône maison                 | ✅                |

- La carte `homeshift-card` est définie dans `ui-lovelace.yaml` et apparaît automatiquement dans l'onglet **Overview**.
- Le dashboard **Accueil** reste entièrement éditable via l'interface graphique de HA.

> Toute modification de `ui-lovelace.yaml` est prise en compte en rafraîchissant le navigateur (F5).

## Entités

En production, les entités proviennent de l'intégration **HomeShift** (https://github.com/Gamso/homeshift):

- `select.homeshift_day_mode`: options configurables par l'utilisateur (défaut: Maison, Travail, Télétravail, Absence)
- `select.homeshift_thermostat_mode`: options configurables par l'utilisateur (défaut: Eteint, Chauffage, Climatisation, Ventilation)
- `number.override_duration`: durée (en minutes) avant que HomeShift reprenne les mises à jour automatiques

> **Devcontainer** : en l'absence de l'intégration HomeShift, des entités `input_select` de substitution sont définies dans `configuration.yaml` :
>
> - `input_select.homeshift_day_mode` : Maison, Travail, Télétravail, Absence
> - `input_select.homeshift_thermostat_mode` : Eteint, Chauffage, Climatisation, Ventilation

Des entités `input_boolean` sont incluses pour tester le scheduler:

- `input_boolean.test_switch`: Interrupteur de test
- `input_boolean.test_light`: Lumière de test

## Scheduler Integration

L'environnement de test inclut automatiquement:

- **scheduler-component** (v3.3.8): Composant permettant de créer des planifications
- **scheduler-card** (v4.0.11): Interface UI pour gérer les planifications

Ces composants sont automatiquement téléchargés et installés lors de la première initialisation du conteneur.

### ⚠️ IMPORTANT: Configuration Requise

**L'intégration Scheduler doit être ajoutée manuellement via l'interface Home Assistant:**

1. Attendre que Home Assistant soit complètement démarré (1-2 minutes)
2. Compléter l'onboarding (créer un compte admin/admin si nécessaire)
3. Aller dans **Paramètres** → **Appareils et Services**
4. Cliquer sur **+ Ajouter une intégration**
5. Rechercher **"Scheduler"** et cliquer pour l'ajouter
6. L'intégration sera alors configurée et fonctionnelle

### Utilisation du Scheduler

Une fois l'intégration ajoutée:

1. Accéder à l'onglet "Scheduler" dans le dashboard
2. Utiliser la carte scheduler-card pour créer des planifications
3. Sélectionner les entités `input_boolean.test_switch` ou `input_boolean.test_light` pour tester

### Dépannage

Si l'intégration "Scheduler" n'apparaît pas dans la liste:

**⚠️ Pour les utilisateurs ayant une installation précédente:**
Si vous avez utilisé une version antérieure du DevContainer, les fichiers peuvent avoir été installés incorrectement. Solution:

1. Fermer VS Code et arrêter le DevContainer
2. Supprimer le volume Docker associé au conteneur
3. Rouvrir dans le DevContainer (reconstruction complète)
4. Les fichiers seront installés correctement dans `/config/custom_components/scheduler/`

**Autres vérifications:**

- Vérifier que Home Assistant est complètement démarré (voir les logs)
- Vérifier que les fichiers sont dans `/config/custom_components/scheduler/` avec:
  ```bash
  ls -la /config/custom_components/scheduler/
  # Doit afficher: manifest.json, __init__.py, etc.
  ```
- Redémarrer Home Assistant: **Paramètres** → **Système** → **Redémarrer**
- Rafraîchir le navigateur (Ctrl+F5)
- Vider le cache du navigateur et recharger

**Si les fichiers sont au mauvais endroit:**
Si vous voyez des fichiers Python directement dans `/config/custom_components/` (au lieu de `/config/custom_components/scheduler/`), c'est une installation incorrecte. Le script de setup les nettoiera automatiquement lors du prochain redémarrage du conteneur.

## Debug

- Logs HA: `/config/home-assistant.log`
- Console navigateur: F12

## Arrêt

- Fermer VS Code ou F1 → "Dev Containers: Reopen Folder Locally"
