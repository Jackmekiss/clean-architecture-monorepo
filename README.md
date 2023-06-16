# monorepo-clean-architecture-tdd

This project aims to showcase the power and effectiveness of the Clean Architecture pattern, implemented in a monorepo using [Nx Dev](https://nx.dev/).

It is a fake chat application, built with React and Typescript, applying `Test Driven Development` (TDD) principles. The monorepo architecture allows for modular and decoupled code, promoting code reuse and making it easier to manage dependencies.

The monorepo is structured as follows:
-   `lib/core` - Contains everything related to the domain.
	-  `lib/core/src/initReduxStore` - Initializes the Redux store for orchestration.
	-   `lib/core/src/{module}/adapters/{primary | secondary}` - Houses the stubs or integrations for dependency inversion.
	-   `lib/core/src/{module}/apis` - Contains the API files for Redux RTK.
	- `lib/core/src/{module}/domain` - Contains the domain model data along with builders.
	-   `lib/core/src/{module}/gateways` - Provides interfaces for the secondary adapters.
	-   `lib/core/src/{module}/use-cases` - Represents explicit use cases.
-    `apps/web` - Houses all the React code for the web application.

**Usage**
To run the project, clone the repository and follow the installation steps:

```bash
# Clone the repository 
git clone https://github.com/Jackmekiss/monorepo-clean-architecture-tdd.git 
# Navigate into the directory  
cd monorepo-clean-architecture-tdd 
# Install dependencies 
yarn install 
# Start the application 
yarn start
```

Visit `http://localhost:4200` in your browser to view the application.

**Contributing**
Your contributions are always welcome! Please have a look at the contribution guidelines first. 🎉

**License**
This project is licensed under the MIT License - see the [LICENSE](https://github.com/Jackmekiss/monorepo-clean-architecture-tdd/blob/master/LICENCE) file for details.

**Acknowledgments**
This project structure is inspired by the principles of Clean Architecture and the power of monorepo structure by [Nx Dev](https://nx.dev/). It serves as a showcase for building sophisticated applications using these techniques, with the added benefits of Typescript and React.

For more information, questions, or feedback, please feel free to open an issue. ☀️