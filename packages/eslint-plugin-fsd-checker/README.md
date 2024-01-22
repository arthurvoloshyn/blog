# eslint-plugin-fsd-checker

plugin for fsd paths and slices

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-fsd-checker`:

```sh
npm install eslint-plugin-fsd-checker --save-dev
```

## Usage

Add `fsd-checker` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "fsd-checker"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "fsd-checker/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


