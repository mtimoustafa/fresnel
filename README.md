# 🔦 Fresnel

_A work-in-progress collaborative meal planning application, built as an exercise in learning React+Typescript._

## Description

This application is mainly an exercise in learning React+Typescript, which I'm building alongside the Pluralsight courses I'm completing.

Due to this goal, the codebase prioritizes learning to write clean, best-practice React+TS over building a comprehensive, robust app. Some patterns might be overkill or contrived for educational purposes, the UI is not completely polished, some edge cases are not covered, and input and API validation is not comprehensive. The architecture is also not a focus, and the server layer is mocked.

I'm also open to suggestions from anyone experienced in the tech stack! Feel free to open an issue or draft PR or message me directly.

## Features

* Add and manage meals to be used in weekly meal planning.
* Create and edit a weekly meal schedule based on meal type and difficulty.
* Account for leftovers, optionally.

## Requirements

Node v22.19.0+.

## Installation

1. Clone the repository and navigate to it.
2. Install the node packages via `npm install` or `yarn`.

## Usage

1. Run the client using `npm run dev` or `yarn dev`.
2. Run the server using `npm run server` or `yarn server`.
3. Navigate to `https://localhost:5173` or whatever URL Vite announces in the client log.

## To-do

- [ ] Introduce React server-side components for server layer.
- [ ] Use SSG with hydration.
- [ ] Convert the codebase from JS to TS.
- [ ] Add a linter to learn syntactic best practices.

### Strech goals

- [ ] Add a database.
- [ ] Allow real-time collaboration via accessing the same URL from different accounts.
- [ ] Polish the UI as an exercise in learning more advanced CSS.
