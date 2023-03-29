export interface validator {
  isFieldsNumbers: (fields: keyValueField[]) => fieldsReturn
  isFieldsStrings: (fields: keyValueField[]) => fieldsReturn
}

export interface fieldsReturn {
  failedField?: any
  isValid: boolean
}

interface keyValueField {
  key: string
  value: any
}
