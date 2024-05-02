# Proyecto normativa

## IMPORTANTE: Flujo de trabajo

**1. Desarrollar nuevas características en ramas separadas:** 

Cada vez que comiences a trabajar en una nueva característica o corrección de errores, crea una nueva rama a partir de la rama dev:

```sh
git checkout -b nombre-de-la-caracteristica dev
```

**2. Integrar cambios en la rama dev:** 

Una vez que una característica esté completa y probada, integra los cambios en la rama dev:

```sh
git checkout dev
```

```sh
git merge --no-ff nombre-de-la-caracteristica
```

**3. Fusionar en la rama principal (main):** 

Una vez que todas las características están completas y probadas, fusionar la rama dev en la rama principal (main):

```sh
git checkout main
```

```sh
git merge --no-ff dev
```

## Comando útiles

`npm i` - Para instalar el entorno

`npm run dev` - Para correr el proyecto. Lo tendremos disponible desde [localhost:3000](http://localhost:3000)

## Links documentación

### Nuxt

-  [Nuxt Docs](https://nuxt.com/docs/getting-started/introduction)

-  [Nuxt Modules](https://nuxt.com/modules)

-  [Nuxt UI](https://ui.nuxt.com/)

-  [Nuxt Directus](https://next.nuxt-directus.site/)

### Tailwind

-  [Tailwind](https://tailwindcss.com/docs)

### Node.js

-  [Node.js](https://nodejs.org/en)

### Directus

- [Docs](https://docs.directus.io/)
