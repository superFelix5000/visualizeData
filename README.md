# Financial Data visualization frontend
Angular frontend for personal financial data visualization which I have moved [here](https://github.com/superFelix5000/visualizeData_nx).

## features
- import csv data from my bank
- visualize that data using chart.js
- categorize the data by pre-defined categories
- different charts for showing yearly/monthly spend, by category
- tables for showing and editing the entries
- data is saved through a [deno](https://github.com/superFelix5000/bankDataServer) backend
- ...

### TODO:
- DONE: move deno project also to nx and share code between the two apps?
- DONE: can I use rome as a linter in nx?
- add percentages in the cake diagram
- redo header as floating and without hackedyhack css
- make all entries taggable with extra words? (notes field)
- move to standalone components? --> would that enable to use vite?
- add visualization for amount of money in bank
- put the components and other stuff into libraries so the apps can share those
    --> how to integrate docker into that?
- Knopf einbauen zum Auwählen von allen Daten gleichzeitig, nicht nur ein Jahr zur Zeit.
    Damit könnte man dann die Kategorien sich einzeln auch angucken fuer alle Daten und auf allen Daten suchen usw.
- service also handles saving to browser (for categories)
- make categories dynamic on other tab?
- show categories in cake diagram per year/month/overall
- on click() on months show the month-specific data?

## usage
- basic angular usage
- `npm install`
- `npm run start`
- `npm run lint`
- `npm run format`
