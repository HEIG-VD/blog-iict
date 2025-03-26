# Template de blog pour les instituts de l'HEIG-VD

Cet template est conçu pour être utilisé par les instituts de l'HEIG-VD pour la création de blogs.
Il est optimisé pour la maintenabilité et la collaboration sur GitHub.
L'objectif est de donner vie aux instituts en permettant la publication de contenus qui n'ont pas forcément vocation à être publiés sur le site de l'HEIG-VD.
C'est pourquoi le template est très simple et redirige autant que possible vers le site de l'HEIG-VD.

## 🚀 Technologies

- **[Next.js](https://nextjs.org)** - Framework React moderne avec génération statique
- **[TypeScript](https://www.typescriptlang.org)** - JavaScript typé pour une meilleure maintenabilité
- **[TailwindCSS](https://tailwindcss.com)** - Utilitaires CSS pour un design rapide et cohérent
- **[MDX](https://mdxjs.com)** - Markdown enrichi avec des composants React
- **[PNPM](https://pnpm.io)** - Gestionnaire de paquets rapide et efficient

## ✨ Caractéristiques

- 📝 Rédaction en Markdown avec support MDX
- 🎨 Design responsive avec TailwindCSS
- 🔍 SEO optimisé
- 📱 Performance mobile optimale
- 🚄 Génération statique pour des performances maximales
- ☁️ Déploiement automatisé sur Cloudflare Pages

## 🛠️ Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/heig-vd/blog-template.git
   cd blog-template
   ```

2. Installez les dépendances :
   ```bash
   pnpm install
   ```

3. Configurez le site en modifiant le fichier `src/config/site.ts`

## 💻 Développement

Lancez le serveur de développement :
```bash
pnpm dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🏗️ Production

1. Construisez le site :
   ```bash
   pnpm build
   ```

2. Testez la version de production :
   ```bash
   pnpm start
   ```

## 📝 Contenu

### Ajouter un Article

1. Créez un dossier pour votre article dans le dossier `src/content/blog/`
2. Créez un fichier `index.mdx` dans le dossier de votre article.
3. Ajoutez l'en-tête frontmatter :
   ```mdx
   ---
   {
   "title": "Le titre de mon article",
   "description": "La description de mon article",
   "date": "2025-01-01",
   "author": "HEIG-VD",
   "tags": ["tag1", "tag2"],
   "image": "image.jpeg"
   }
   ---
   ```
3. Rédigez votre contenu en [MDX](https://mdxjs.com/).

### Gestion des Images

- Stockez les images dans le dossier de votre article
- Utilisez le composant Next.js Image pour afficher l'image :
  ```mdx
  <Image
    src="image.jpeg"
    alt="Description"
    width={800}
    height={400}
  />
  ```

## 🚀 Déploiement

Le déploiement est automatisé via Cloudflare Pages :

1. Les changements sont poussés sur GitHub
2. Les tests et la construction sont exécutés
3. Le site est déployé sur le réseau Cloudflare

### Workflow de Contribution

1. Créez une branche
2. Committez vos changements
3. Soumettez une Pull Request
4. Après review et merge, le déploiement est automatique

