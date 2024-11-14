export class MediaFactory {
  constructor(media) {
    // Selon s'il s'agit d'une image ou d'une video, on retourne le bon media
    if (media.image === undefined) {
      return new MediaVideo(media.video);
    } else {
      return new MediaImg(media.image);
    }
  }
}

class MediaImg {
  constructor(image) {
    this._path = image; // titre avec extention
    this._html = "img"; // élément HTML que l'on va utiliser
  }

  get path() {
    return this._path;
  }

  get html() {
    return this._html;
  }
}

class MediaVideo {
  constructor(video) {
    this._path = video; // titre avec extention
    this._html = "video"; // élément HTML que l'on va utiliser
  }

  get path() {
    return this._path;
  }

  get html() {
    return this._html;
  }
}
