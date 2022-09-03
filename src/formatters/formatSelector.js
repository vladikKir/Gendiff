import stylish from "./stylish.js"

export default (file, format) => {
    switch (format) {
      case 'stylish':
        return stylish(file)
    }
  }
