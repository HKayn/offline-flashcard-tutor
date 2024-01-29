# <img src="public/offline_flashcard_tutor.min.svg" height="20" width="20" alt="icon of Offline Flashcard Tutor"/> Offline Flashcard Tutor

A simple web app for studying with digital flashcards, built in [`petite-vue`](https://github.com/vuejs/petite-vue).

Flashcards are presented one by one and can be marked as "Pass" or "Fail". Once all flashcards have been shown, passed cards are discarded, while failed cards are shuffled and then presented one by one again. This repeats until all cards have been passed.

The current progress is automatically saved in localStorage and can be restored when opening the web app at a later time.

## Usage

Offline Flashcard Tutor is built to be run in the browser as a local HTML file. Flashcards are passed as CSV files containing the columns `front` and `back`, which contain each prompt and respective solution. Most common Markdown features are supported. See the file [`flashcards.example.csv`](./flashcards.example.csv) for an example.

## Development

Offline Flashcard Tutor is bundled using [Vite](https://github.com/vitejs/vite) with [`vite-singlefile-plugin`](https://github.com/richardtallent/vite-plugin-singlefile).

To start a development server:

```bash
npm run dev
```

To build as a local HTML file in `/dist`:

```bash
npm run build
```
