# @blog/eslint-plugin-fsd-checker

plugin for fsd paths and slices

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `@blog/eslint-plugin-fsd-checker`:

```sh
npm install @blog/eslint-plugin-fsd-checker --save-dev
```

## Usage

Add `@blog/fsd-checker` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "@blog/fsd-checker"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "@blog/fsd-checker/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                   | Description                           | 🔧 |
| :----------------------------------------------------- | :------------------------------------ | :- |
| [layer-imports](docs/rules/layer-imports.md)           | prevent imports from upper layers     |    |
| [paths-checker](docs/rules/paths-checker.md)           | checking absolute paths in fsd slices | 🔧 |
| [public-api-imports](docs/rules/public-api-imports.md) | Prohibits imports not from public api | 🔧 |

<!-- end auto-generated rules list -->


