import { fieldsReturn, validator } from '../validators/contracts/validator'
import { fieldValidator } from '../validators/implementations/fieldValidator'

describe('validator', () => {
  const validator = new fieldValidator()

  it('should be able to validate string', () => {
    const stringMock = 'some-string'

    const stringMockObject = {
      key: 'some-string',
      value: stringMock,
    }

    const validated = validator.isFieldsStrings([
      stringMockObject,
      stringMockObject,
      stringMockObject,
    ])

    expect(validated).toHaveProperty('isValid')
    expect(validated.isValid).toBe(true)
  })

  it('should be able to validate number', () => {
    const numberMock = 1

    const numberMockObject = {
      key: 'some-number',
      value: numberMock,
    }

    const validated = validator.isFieldsNumbers([
      numberMockObject,
      numberMockObject,
      numberMockObject,
    ])

    expect(validated).toHaveProperty('isValid')
    expect(validated.isValid).toBe(true)
  })

  it('should return isValid false and the failedField when validator.isString receive any other value diferent than string', () => {
    const numberMock = 1

    const numberMockObject = {
      key: 'some-number',
      value: numberMock,
    }

    const error = validator.isFieldsStrings([numberMockObject])

    expect(error).toMatchObject({
      failedField: 'some-number',
      isValid: false,
    })
  })

  it('should return isValid false and the failedField when validator.isNumber receive any other value diferent than number', () => {
    const stringMock = 'string'

    const stringMockObject = {
      key: 'some-string',
      value: stringMock,
    }

    const error = validator.isFieldsNumbers([stringMockObject])

    expect(error).toMatchObject({
      failedField: 'some-string',
      isValid: false,
    })
  })
})
