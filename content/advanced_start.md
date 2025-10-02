(advanced-start)=
# Advanced start &#127798; 

The Jupyter Book and MyST CLIs both include tools to help get started writing quickly.
If you are feeling confident and want to jump straight into creating a document without the template, this is a good option.

You might want to follow this approach if,

- You are already familiar with using Markdown dialects to build documents and websites
- You have previously used Jupyter Book 1
- You are comfortable working with command line tools and reading documentation

The [MyST Markdown guide](https://mystmd.org/guide) will be a valuable resource if you follow this route.

## Install Jupyter Book

There are [a number of options for installing Jupyter Book](https://next.jupyterbook.org/start/install/).
Two common methods are using `pip`

```console
pip install "jupyter-book>=2.0.0a0"
```

or `npm`

```console
npm install -g "jupyter-book@>=2.0.0-a0"
```

:::{hint}
Note the version specifications, which ensure the MyST-based Jupyter Book 2 is installed, not the Sphinx-based Jupyter Book 1.
:::

## Initialise a project

To initialise a Jupyter Book project, use the CLI

```console
jupyter-book init
```

This will create a basic book, including the `myst.yml` file.
You can serve your book locally

```console
jupyter-book start
```

Open [`http://localhost:3000`](http://localhost:3000) in your browser to see the output.

## Deploy to GitHub pages

The CLI can also prepare a GitHub workflow to deploy your book to GitHub Pages, similar to the template.

```console
jupyter-book init --gh-pages
```

The command will print instructions to finish setting up GitHub Pages.

## Next steps

Once you have a working book, you can start to explore the options of MyST and Jupyter Book.
You may want to follow [the lessons here](#lessons-start) or experiment yourself with the [MyST Markdown guide](https://mystmd.org/guide).
