import { fieldsReturn, validator } from '../contracts/validator'

export class fieldValidator implements validator {
  isFieldsNumbers(fields: any[]) {
    let result = {} as fieldsReturn

    for (const field of fields) {
      if (typeof field.value === 'number') {
        result.isValid = true
      } else {
        result.isValid = false
        result.failedField = field.key
        break
      }
    }

    return result
  }
  isFieldsStrings(fields: any[]) {
    let result = {} as fieldsReturn

    for (const field of fields) {
      if (typeof field.value === 'string') {
        result.isValid = true
      } else {
        result.isValid = false
        result.failedField = field.key
        break
      }
    }

    return result
  }
}
