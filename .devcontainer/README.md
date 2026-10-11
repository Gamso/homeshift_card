# DevContainer Home Assistant

Home Assistant avec les entités HomeShift simulées, Scheduler, des thermostats simulés et des planifications d'exemple pour voir la carte en situation, panneau des plannings compris.

## Prérequis

- Visual Studio Code + extension Dev Containers
- Docker Desktop

## Démarrage

1. Ouvrir le dossier dans VS Code → F1 → **Dev Containers: Reopen in Container** (ou **Rebuild Container** après une modification du `Dockerfile` ou de `devcontainer.json`)
2. `setup.sh` (une fois) : `npm install` + build, scheduler-component v3.3.8, scheduler-card v4.0.19, planifications d'exemple, intégration Scheduler, ressources Lovelace, dashboard **HomeShift**.
3. Home Assistant est le processus principal du conteneur (`start.sh`) : il démarre dès la fin de `setup.sh`, puis à chaque démarrage du conteneur → http://localhost:8123 (1-2 min au premier lancement)
4. Au premier lancement, `onboard.py` termine l'onboarding tout seul : se connecter avec le compte de test **`admin` / `admin`**
5. Ouvrir le dashboard **HomeShift** dans la barre latérale

L'intégration Scheduler est préconfigurée : inutile de l'ajouter depuis l'UI.

## Itérer sur la carte

`dist/` est monté sur `/config/www/homeshift_card` :

```bash
npm run watch
```

puis Ctrl+F5 dans le navigateur.

## Données d'exemple

| Entité                                                     | Rôle                                                                   |
| ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| `select.homeshift_day_mode` / `homeshift_thermostat_mode`  | Modes du jour et du thermostat (template select sur `input_select`)    |
| `number.homeshift_*`, `sensor.homeshift_*`, `button.*`     | Les autres entités de l'intégration HomeShift, simulées                |
| `input_boolean.homeshift_window_*_backing`                 | Fenêtres ouvertes : font apparaître l'alerte « Non fermés »            |
| `climate.bureau` / `chambre` / `salon`                     | `generic_thermostat` sur radiateurs `input_boolean`                    |
| `input_number.temperature_*_backing`                       | Températures mesurées, réglables                                       |
| `switch.salon_enable_auto_start_stop`                      | Template switch piloté par les planifications                          |
| `input_boolean.force_presence`                             | Entité propre au mode Travail                                          |

`scheduler.storage` contient 13 planifications taguées `Maison`, `Télétravail`, `Travail` et `Absence`, les options du mode du jour : le panneau des plannings de la carte les affiche. Il n'est copié que s'il n'existe pas encore dans `config/.storage/`. Pour revenir aux exemples : supprimer `config/.storage/scheduler.storage` puis reconstruire le conteneur.

Le dashboard **HomeShift** est éditable dans l'UI. Il est créé au premier setup à partir de `dashboard.yaml` : la carte, une section de simulation et une scheduler-card pour modifier les planifications. Les modifications faites dans l'UI sont conservées ; pour revenir au modèle, supprimer `config/.storage/lovelace.dashboard_homeshift` puis reconstruire le conteneur.

## Repartir de zéro

Tout l'état de Home Assistant (base, `.storage`, comptes, logs) vit dans `config/`, ignoré par git sauf `configuration.yaml`. Pour une instance neuve (compte `admin` / `admin` recréé) : supprimer tout `config/` sauf `configuration.yaml`, puis **Rebuild Container**.

## Fichiers

- `config/configuration.yaml`, `dashboard.yaml`, `scheduler.storage` : versionnés
- le reste de `config/` : état local ignoré par git

## Debug

- Logs HA : `tail -f /config/home-assistant.log`
- Redémarrer HA : depuis l'UI (Paramètres → Système → Redémarrer) ou `pkill -f "^python3 -m homeassistant"` ; `start.sh` le relance automatiquement
