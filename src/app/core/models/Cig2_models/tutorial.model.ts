export class Tutorial {
  id: string;
  titre: string;
  description: string;
  imagePath: string;

  constructor(id: string, titre: string, description: string, imagePath: string) {
    this.id = id;
    this.titre = titre;
    this.description = description;
    this.imagePath = imagePath;
  }
}
