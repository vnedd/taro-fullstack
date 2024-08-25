class Transformer {
  static snakeToCamel(s: string): string {
    return s.replace(/(_\w)/g, (matches) => matches[1].toUpperCase());
  }

  static transformObjectTypeSnakeToCamel(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => Transformer.transformObjectTypeSnakeToCamel(item));
    } else if (obj !== null && obj.constructor === Object) {
      const newObj: { [key: string]: any } = {};
      Object.keys(obj).forEach((key) => {
        let newKey = Transformer.snakeToCamel(key);
        // Special case for _id to id
        if (key === '_id') {
          newKey = 'id';
        }
        newObj[newKey] = Transformer.transformObjectTypeSnakeToCamel(obj[key]);
      });
      return Transformer.removeDeletedField(newObj);
    }

    return obj;
  }

  static removeDeletedField(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => Transformer.removeDeletedField(item));
    } else if (obj !== null && obj.constructor === Object) {
      const { deleted, ...rest } = obj;
      Object.keys(rest).forEach((key) => {
        rest[key] = Transformer.removeDeletedField(rest[key]);
      });
      return rest;
    }
    return obj;
  }
}

export { Transformer };
